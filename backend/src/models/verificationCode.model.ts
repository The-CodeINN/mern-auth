import { Document, Types, Schema, model } from 'mongoose';
import { verificationCodeTypes } from '../constants/verificationCodeTypes';

export interface VerificationCodeDocument extends Document {
  userId: Types.ObjectId;
  type: verificationCodeTypes;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerificationCodeModel = model<VerificationCodeDocument>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes'
);

export { VerificationCodeModel };
