import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'student', schema: StudentSchema}]),
        CacheModule.register({
            ttl: 60,
            max: 100,
          }),
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService],
})

export class StudentModule {}