import mongoose, { Schema, type Document, type Types } from "mongoose";

export type ISessionInput = {
  user: Types.ObjectId;
  userAgent: string;
  valid?: boolean;
};

export type ISession = {
  createdAt: Date;
  updatedAt: Date;
} & ISessionInput &
  Document;

const sessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

// Remove the unique index
sessionSchema.index({ user: 1, userAgent: 1 }, { unique: true });

const SessionModel = mongoose.model("Session", sessionSchema);

export { SessionModel };
