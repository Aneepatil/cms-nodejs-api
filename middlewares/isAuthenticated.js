import { verifyToken } from "../utils/verifyToken.js";

export const isAuthenticated = (model) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token not provided.");
    }

    // Verify token
    const verifiedToken = verifyToken(token);

    if (verifiedToken) {
      // Find the user
      const user = await model
        .findById(verifiedToken?.id)
        .select("name email role");
      req.userAuth = user;
      next();
    } else {
      const err = new Error("Token Expired / Invalid");
      next(err);
    }
  };
};
