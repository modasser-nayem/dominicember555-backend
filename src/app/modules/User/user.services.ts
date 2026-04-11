import { IUserFilterRequest, TUpdateUser } from "./user.interface";
import {
  IPaginationOptions,
  PaginationHelper,
} from "../../../helpers/pagination";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import prisma from "../../../db/prisma";
import { recentActivityLog } from "../../../helpers/recentActivity";
import { uploadFileToCloud } from "../../../upload/fileUpload";
import { deleteFromCloudinary } from "../../../upload/uploadToCloudinary";

export const UserService = {
  // get user profile
  getMyProfile: async (userId: string) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        role: true,
        location: true,
        isEmailVerified: true,
        isSubscribed: true,
        subscriptionExpiryDate: true,
        subscriptionStatus: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { tasks: true },
        },
      },
    });

    if (!userInfo) throw new AppError(httpStatus.NOT_FOUND, "User not Found!");

    const { _count, ...userData } = userInfo;

    return {
      ...userData,
      totalTask: _count?.tasks || 0,
    };
  },

  // Update own profile
  updateProfile: async (payload: { userId: string; data: TUpdateUser }) => {
    const { userId, data } = payload;
    data.email = data.email?.toLocaleLowerCase();

    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userInfo) {
      throw new AppError(404, "User not found");
    }

    // check already other use this email
    if (data.email) {
      const existEmail = await prisma.user.findUnique({
        where: { email: data.email, NOT: { id: userInfo.id } },
      });

      if (existEmail) {
        throw new AppError(httpStatus.BAD_REQUEST, "Try another email address");
      }
    }

    // Update the user profile with the new information
    const result = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: payload.data,
    });

    const { password, ...actualResult } = result;

    return actualResult;
  },

  // Update profile picture
  updateProfilePicture: async (payload: {
    userId: string;
    file: Express.Multer.File;
  }) => {
    const { userId, file } = payload;

    if (!file) throw new AppError(httpStatus.BAD_REQUEST, "No image provided");

    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userInfo) {
      throw new AppError(404, "User not found");
    }

    const oldPictureUrl = userInfo.avatar;

    let imageUrl = (await uploadFileToCloud(file, "file")).secure_url;

    const result = await prisma.user.update({
      where: { id: userInfo.id },
      data: {
        avatar: imageUrl,
      },
    });

    if (oldPictureUrl) {
      await deleteFromCloudinary(oldPictureUrl);
    }

    const { password, ...resultData } = result;

    return resultData;
  },

  // Get All Users
  getAllUsers: async (payload: {
    filters: IUserFilterRequest;
    options: IPaginationOptions;
  }) => {
    const { page, limit, skip, sortBy, sortOrder } =
      PaginationHelper.calculatePagination(payload.options);
    const { searchTerm, role, status: userStatus } = payload.filters;

    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
      andConditions.push({
        OR: ["name", "email"].map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      });
    }

    if (
      typeof role === "string" &&
      Object.values(UserRole).includes(role as UserRole)
    ) {
      andConditions.push({ role: role as UserRole });
    }

    if (
      typeof userStatus === "string" &&
      Object.values(UserStatus).includes(userStatus as UserStatus)
    ) {
      andConditions.push({ status: role as UserStatus });
    }

    const whereConditions: Prisma.UserWhereInput = { AND: andConditions };

    const result = await prisma.user.findMany({
      where: whereConditions,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: "desc",
            },
    });
    const total = await prisma.user.count({
      where: whereConditions,
    });

    return {
      meta: {
        page,
        limit,
        total,
        totalPages: 5,
      },
      data: result,
    };
  },

  // Get Single User
  getSingleUser: async (id: string) => {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        location: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!result) {
      throw new AppError(404, "User not found");
    }
    return result;
  },

  // Update user Status
  updateUserStatus: async (id: string) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userInfo) throw new AppError(httpStatus.NOT_FOUND, "User not found!");

    const result = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: { status: userInfo.status === "BLOCKED" ? "UNBLOCK" : "BLOCKED" },
    });

    if (!result)
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update user profile",
      );

    const { password, ...resultData } = result;

    return resultData;
  },

  // Delete User
  deleteAccount: async (id: string) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userInfo) throw new AppError(httpStatus.NOT_FOUND, "User not found!");

    const result = await prisma.user.delete({
      where: {
        id: userInfo.id,
      },
    });

    await recentActivityLog({
      actionType: "ACCOUNT_DELETED",
      message: `${result.name}, Deleted Own Account`,
    });

    const { password, ...resultData } = result;

    return resultData;
  },
};
