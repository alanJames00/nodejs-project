const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Configure the S3 client with your access credentials and the S3 region
const s3Client = new S3Client({ 
    endpoint: 'https://chatapp.blr1.digitaloceanspaces.com',
    region: 'us-east-1',
    forcePathStyle: false,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


// Function to generate a pre-signed upload URL for a file
async function generatePresignedUrl(fileId) {
    const command = new PutObjectCommand({
        Bucket: 'chatapp',
        Key: fileId,
        });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
}

module.exports = {
    generatePresignedUrl
};