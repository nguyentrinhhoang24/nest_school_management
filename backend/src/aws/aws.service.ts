// import { Injectable } from '@nestjs/common';
// import * as AWS from 'aws-sdk';
// import { config } from 'dotenv';

// config(); // Để lấy các biến từ .env

// @Injectable()
// export class AwsService {
//   private s3: AWS.S3;

//   constructor() {
//     // Cấu hình AWS SDK
//     AWS.config.update({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       region: process.env.AWS_REGION,
//     });

//     this.s3 = new AWS.S3();
//   }

//   // Tạo một phương thức để upload ảnh lên S3
//   async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `${folder}/${Date.now()}-${file.originalname}`,  // Tên file trong S3
//       Body: file.buffer,
//       ACL: 'public-read',  // Để ảnh có thể truy cập công khai
//     };

//     try {
//       const data = await this.s3.upload(params).promise();
//       return data.Location;  // URL của ảnh sau khi upload lên S3
//     } catch (err) {
//       throw new Error('File upload failed: ' + err.message);
//     }
//   }
// }
