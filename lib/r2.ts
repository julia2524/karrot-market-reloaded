import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

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

export async function uploadProductImage(photoFile: File) {
  const buffer = Buffer.from(await photoFile.arrayBuffer());
  const fileName = `products/${Date.now()}-${photoFile.name}`;

  await S3.send(
    new PutObjectCommand({
      Bucket: "karrot-market-reloaded", // 버킷 이름
      Key: fileName,
      Body: buffer,
      ContentType: photoFile.type,
    })
  );
  return `${process.env.R2_PUBLIC_URL}/${fileName}`;
}

export async function deleteProductImage(fileUrl: string) {
  const fileKey = fileUrl.split(".dev/")[1];
  await S3.send(
    new DeleteObjectCommand({
      Bucket: "karrot-market-reloaded",
      Key: fileKey,
    })
  );
}
