import dotenv from "dotenv";
import path from "path";
import { envRequireNumber, envRequireString } from "../helpers/envValidate";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.join(process.cwd(), envFile) });

export default {
  // General
  NODE_ENV: envRequireString("NODE_ENV"),
  PORT: envRequireNumber("PORT"),
  DATABASE_URL: envRequireString("DATABASE_URL"),
  FRONTEND_URL: envRequireString("FRONTEND_URL"),
  BCRYPT_SALT_ROUNDS: envRequireNumber("BCRYPT_SALT_ROUNDS"),

  // OTP
  OTP_EXPIRES_IN: envRequireNumber("OTP_EXPIRES_IN"),

  // AI Base API
  AI_BASE_API: envRequireString("AI_BASE_API"),

  // Auth token
  token: {
    ACCESS_TOKEN_SECRET: envRequireString("ACCESS_TOKEN_SECRET"),
    ACCESS_EXPIRES_IN: envRequireString("ACCESS_EXPIRES_IN"),
    REFRESH_TOKEN_SECRET: envRequireString("REFRESH_TOKEN_SECRET"),
    REFRESH_EXPIRES_IN: envRequireString("REFRESH_EXPIRES_IN"),
    RESET_PASS_SECRET: envRequireString("RESET_PASS_SECRET"),
    RESET_PASS_EXPIRES_IN: envRequireString("RESET_PASS_EXPIRES_IN"),
  },

  // Admin Credentials
  admin: {
    ADMIN_DEFAULT_EMAIL: envRequireString("ADMIN_DEFAULT_EMAIL"),
    ADMIN_DEFAULT_PASSWORD: envRequireString("ADMIN_DEFAULT_PASSWORD"),
  },

  // RevenueCat config
  revenuecat: {
    REVENUECAT_WEBHOOK_AUTH: process.env.REVENUECAT_WEBHOOK_AUTH as string,
  },

  // Auth Provider
  // oauth: {
  //   google: {
  //     GOOGLE_CLIENT_ID: envRequireString("GOOGLE_CLIENT_ID"),
  //     GOOGLE_CLIENT_SECRET: envRequireString("GOOGLE_CLIENT_SECRET"),
  //   },
  // },

  // Cloudinary Configuration
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: envRequireString("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: envRequireString("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: envRequireString("CLOUDINARY_API_SECRET"),
  },
  mail: {
    SMTP_HOST: envRequireString("SMTP_HOST"),
    SMTP_PORT: envRequireNumber("SMTP_PORT"),
    SMTP_HOST_EMAIL: envRequireString("SMTP_HOST_EMAIL"),
    SMTP_APP_PASS: envRequireString("SMTP_APP_PASS"),
    SMTP_FROM: envRequireString("SMTP_FROM"),
  },
};
