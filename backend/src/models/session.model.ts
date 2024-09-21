import { Schema, Types, Document, model } from 'mongoose';
import { sevenDaysFromNow } from '../utils/date';

export interface SessionDocument extends Document {
  userId: Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    userAgent: {
      type: String,
    },
    expiresAt: {
      type: Date,
      default: sevenDaysFromNow,
    },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<SessionDocument>('Session', sessionSchema);

export { SessionModel };
