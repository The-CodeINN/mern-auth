import User, { IUserInput } from "../models/user.model";

export async function createUser(input: IUserInput) {
  try {
    const user = await User.create(input);
    return user;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
