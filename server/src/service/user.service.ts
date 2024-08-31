import { type IUserInput, UserModel } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);
    return user;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}

export async function validatePassword(email: string, password: string) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    return omit(user.toJSON(), "password");
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
