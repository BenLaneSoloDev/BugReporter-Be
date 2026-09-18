import { Schema, model } from "mongoose";

interface IBlacklistToken {
  token: string,
  createdAt: Date,
}

const blacklistTokenSchema = new Schema<IBlacklistToken>({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d"
  }
}, { timestamps: true, versionKey: false });

const BlacklistToken = model("BlacklistToken", blacklistTokenSchema);
export {
  IBlacklistToken,
  BlacklistToken
};