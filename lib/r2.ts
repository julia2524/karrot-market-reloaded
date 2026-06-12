import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
  region: "auto", // Required by SDK but not used by R2
  // Provide your Cloudflare account ID
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
