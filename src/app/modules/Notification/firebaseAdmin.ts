import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "love-connect-212c7",
  private_key_id: "65f6a47b4604a49eff6cf93383898991cadeb951",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCm8cjzfnFs/b0j\njm3WbQZxlw1YbJLIzrhCOvuKUMnE7kFXXh+lk9M+sIcqr6qKkdMnGRntFrfdHGVM\ntnzBHrxQyIROZofXau3FYRgniP9aumTIUTLKdcM0RddPnqrLTHgzHtIwfxdleypp\nKrEUAysCTgGhOiLD9AA9xX0urbGltYTNXRaJY37to8jJjeZNNtEJRMuxFan868LD\n86lsHLZl+BkMMr0nFCBMB8dEs+ED7EsDPWPm5SN/aaKX824GUv7Ves6Zuztf4/M8\nAsobqEVMpp5tYvu16NBm6TbP4aINmGF2yK/1tal6npYkyU3i8j6EY498VpUMNOgp\nWsb3a0xDAgMBAAECggEAPMgpRuYRfAJCO9DeksRtJSw+8qPNKYmCMrLw5GIXpDiu\n15VwZkOVFO0GuXbt27fOLh0IgHbWCI4PH8gNUe7T14G6EiVobfkDiuqX9cT+W9Uj\nXn+Zw3bu1HhdNSLqwkwcM1iUZI3RQeR/A31EramdniAynbXh9IBBGjxuIHGjDVab\no8EXI09XJ+3r93JuDMtFMMmXaYUJOjGQZR8/VFHhB3M/LUnhWMOEeoiwix8xOrvQ\ncsBDipynuvVTX63Ib7uUA5sqESZc9Ho5huShZ2NyWdi5sH2WxIaKVBQy7hJWgN+K\nkC1fHh7WSLMoS3+pEbsmYZY5ZDp14lOcmgYs/WybsQKBgQDcaTQ80TH6DXeAUSXu\n/6BJ9SNOyJcu19X2IELI22dxt7JTe3biKN0gPF6+yXRyFNKyj1dRQUTc9IukigSD\nRkdQLIHUIoVqQKt9wFdIyBR3bkMgg98j87zr5AGNkEP+vU9ER5TrQI6b4/oLIBRH\nvpdHkU6YdSmkQ5mrFop/YNkiewKBgQDB5oR3Ap0wNjeXpRvZvilytDp2YkWcQGGo\nC/1N6vpeZ6cQhZNC9X5ol2N6OvEx88b7VYSQ+uAC/3/X9NZAD2KOXUdo0ZtEb9W4\nwF1itM2q24MzT/5aLTWdTvCOIkfE5zqKI270vvWLyR32AnybGLZUdvFxLmxQfKFj\nDq91x6uW2QKBgQC3pfjei7fGj534jqS6xMd7mAN5S22cnD4su6ipzxYcDGFLad4e\nhsnoaCTRdu3NeEgue3zXuTh1mlUYHd+wucgFp2/tn23moEfDmZWgkQVslbTczMQK\nIrZRHkOk/oWJJZd8XuBYPAwXHBdlWa9MMCPAf/Qq18SAl8rcYQW5KKsDLQKBgGuS\nvzTjf1+LBMad9FiWFpqrgK/DD4mDcmpv1GVREvwjF12kLbH9Ttcp/ieG4d9rtp4j\nsLtaY8NmCoA+Nkst/eiruX1epHyQawrntieX1W6QADcMjzlqUY9nhy/jttt3yVNw\nGxOviby2pGeis4y8ZhNwNb0sGy2AJ200bYWzc+/pAoGAQbtk+Y389oRnL5rOs+th\nPMSx4ar3y6eK+ZSl2OIm0x0ioXnMbagBnrrHEwOWuU+47mrLPgszwHPnkuUqzts1\np5VxOsi0W1ty16sLke9ZjGP32sQCfmwdTB5NxQMZb9yPgpkim2JZm+PWZGqIeuIM\n47OqdUhQuna5/ZGRJGqf/xk=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@love-connect-212c7.iam.gserviceaccount.com",
  client_id: "110143327992639064384",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40love-connect-212c7.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const fcm = admin.messaging();
