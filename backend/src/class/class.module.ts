import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { ClassSchema } from "./schemas/class.schema";
import { ClassGroupModule } from "src/classgroup/classgroup.module";
import { ClassGroupSchema } from "src/classgroup/schemas/classgroup.schema";

@Module({
    imports: [
      ClassGroupModule,
      MongooseModule.forFeature([{name: 'Class', schema: ClassSchema}]),
      MongooseModule.forFeature([{name: 'Classgroup', schema: ClassGroupSchema}])
    ],
    controllers: [ClassController],
    providers: [ClassService],
    exports: [ClassService],
  })
  export class ClassModule {}