import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unathorized request");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken?._id;
    if (!userId) {
      console.error("No user id found after decoding the token");
      throw new ApiError(401, "Unathorized request");
    }
    const user = await User.findById(userId).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpir",
    );
    if (!user) {
      console.error("Error : auth middlerware User not found from db");
      throw new ApiError(401, "Unathorized request");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error :: while verifying the JWT :", error);
    throw new ApiError(401, "Unathorized Access");
  }
});
