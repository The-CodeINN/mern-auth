import mongoose, { Schema, type Document, type Types } from "mongoose";

// Define the interface for session input
export type ISessionInput = {
  user: Types.ObjectId; // Reference to User model
  userAgent: string;
  valid?: boolean;
};

// Define the interface for the full session document
export type ISession = {
  createdAt: Date;
  updatedAt: Date;
} & ISessionInput &
  Document;

// Define the session schema
const sessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index on user and userAgent to prevent multiple sessions from the same user agent
sessionSchema.index({ user: 1, userAgent: 1 }, { unique: true });

const SessionModel = mongoose.model<ISession>("Session", sessionSchema);

export { SessionModel };
