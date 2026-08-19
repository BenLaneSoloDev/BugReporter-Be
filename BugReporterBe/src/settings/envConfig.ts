import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({path: envFile});

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing Env Variable: ${key}`);
  return value.toString();
}

const DATABASE_URL: string = requireEnv("DATABASE_URL");
const DATABASE_NAME: string = requireEnv("DATABASE_NAME");
const PORT: string = requireEnv("PORT")
const JWT_SECRET: string = requireEnv("JWT_SECRET");
const JWT_ACCESS_EXPIRATION_TTL: string = requireEnv("JWT_ACCESS_EXPIRATION_TTL");

export {
  DATABASE_URL,
  DATABASE_NAME,
  PORT,
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION_TTL
}