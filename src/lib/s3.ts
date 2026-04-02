import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

export const S3_BUCKET = process.env.S3_BUCKET_NAME!;
export const S3_PUBLIC_BASE = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}`;
