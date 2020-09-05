import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      }
    );
  });
};

const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

export const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");

  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    const ONE_DAY = 60 * 60 * 24;

    if (Date.now() / 1000 - decoded.iat > ONE_DAY) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile }, "account");

      const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

      ctx.cookies.set("access_token", freshToken, {
        httpOnly: true,
        maxAge: SEVEN_DAYS,
      });
    }

    ctx.request.user = decoded;
  } catch (e) {
    ctx.request.user = null;
  }

  return next();
};
