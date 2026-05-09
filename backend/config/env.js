import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().url("MONGO_URI must be a valid URL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:5173,https://habit-tracker-plum-chi.vercel.app"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:\n", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
