import { get } from "lodash";
import config from "config";
import { type ISessionInput, SessionModel } from "$/models/session.model";
import { signJwt, verifyJwt } from "$/utils/jwt.utils";
import { type UpdateQuery, type FilterQuery } from "mongoose";
import { findUser } from "./user.service";

export async function createSession(input: ISessionInput) {
  try {
    const existingSession = await SessionModel.findOne({
      user: input.user,
      userAgent: input.userAgent,
      valid: true,
    }).lean();

    if (existingSession) {
      return existingSession;
    }

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

export async function findSessions(query: FilterQuery<ISessionInput>) {
  try {
    const sessions = await SessionModel.find(query).lean();
    return sessions;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}

export async function updateSession(
  query: FilterQuery<ISessionInput>,
  update: UpdateQuery<ISessionInput>
) {
  try {
    const session = await SessionModel.updateOne(query, update);
    return session;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}

export async function reIssueAccessToken(refreshToken: string) {
  try {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) {
      return false;
    }

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    // create access token
    const accessToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get("accessTokenTtl"), // 15 minutes
      }
    );

    return accessToken;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
}
