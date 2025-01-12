import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchModule } from './branch/branch.module';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassGroupModule } from './classgroup/classgroup.module';
import { ClassModule } from './class/class.module';
import { SessionModule } from './session/session.module';
import { MenuModule } from './menu/menu.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { HealthExamModule } from './healthexam/healthexam.module';
import { NewsModule } from './news/news.module';
import { AlbumModule } from './album/album.module';
import { FeeItemModule } from './feeitem/feeitem.module';
import { InvoiceModule } from './invoice/invoice.module';
import { BusModule } from './bus/bus.module';
import { CacheInterceptor, CacheModule, CacheStore } from '@nestjs/cache-manager';
import {redisStore} from 'cache-manager-redis-store';
import * as dotenv from 'dotenv'
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
// import { CacheModule } from '@nestjs/common';
// import { AwsService } from './aws/aws.service';

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/quanlymaugiao', {
      // replicaSet: 'rs0',
    }),
    
    BranchModule,
    SchoolModule,
    ClassGroupModule,
    ClassModule,
    SessionModule,
    MenuModule,
    SubjectModule,
    StudentModule,
    HealthExamModule,
    AuthModule,
    NewsModule,
    AlbumModule,
    FeeItemModule,
    InvoiceModule,
    BusModule,
    CategoryModule,
    TagModule,
    // CacheModule.register({store: redisStore }),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}