import jwt from "jsonwebtoken";

const generateToken = (payload) => {
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

export default generateToken;
