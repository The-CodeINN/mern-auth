import { type ISessionInput, SessionModel } from "$/models/session.model";

export async function createSession(input: ISessionInput) {
  try {
    // Check for existing valid session for the same user and user agent
    const existingSession = await SessionModel.findOne({
      user: input.user,
      userAgent: input.userAgent,
      valid: true,
    });

    if (existingSession) {
      // Invalidate the existing session if needed
      // await SessionModel.updateOne({ _id: existingSession._id }, { valid: false });

      // Or simply return the existing session and do not create a new one
      return existingSession.toJSON();
    }

    // Create a new session since no valid session exists
    const session = await SessionModel.create(input);
    return session.toJSON();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
