import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_PUBLIC_BASE_URL,
} = process.env;

function getR2Client() {
  if (
    !R2_ACCOUNT_ID ||
    !R2_ACCESS_KEY_ID ||
    !R2_SECRET_ACCESS_KEY ||
    !R2_BUCKET_NAME
  ) {
    throw new Error("R2 configuration is incomplete");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function buildPublicUrl(key: string) {
  if (R2_PUBLIC_BASE_URL) {
    return `${R2_PUBLIC_BASE_URL.replace(/\/$/, "")}/${key}`;
  }

  if (!R2_BUCKET_NAME) {
    throw new Error("R2 bucket name is missing");
  }

  return `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;
}

export async function uploadFileToR2(file: File, folder: string) {
  if (!R2_BUCKET_NAME) {
    throw new Error("R2 bucket name is missing");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name) || ".bin";
  const safeFolder = folder.replace(/^\/+|\/+$/g, "");
  const key = `${safeFolder}/${uuidv4()}${extension}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    }),
  );

  return buildPublicUrl(key);
}
