import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// Define the interface for user input
export interface IUserInput {
  email: string;
  name: string;
  password: string;
}

// Define the interface for the full user document
export interface IUser extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the user schema
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;

  return bcrypt.compare(candidatePassword, user.password).catch((_e) => false);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
