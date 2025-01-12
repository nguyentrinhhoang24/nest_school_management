import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { ClassSchema } from "./schemas/class.schema";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";
import { ClassGroupModule } from "src/classgroup/classgroup.module";
import { ClassGroupSchema } from "src/classgroup/schemas/classgroup.schema";

@Module({
    imports: [
      BranchModule,
      ClassGroupModule,
      MongooseModule.forFeature([{name: 'ClassGroup', schema: ClassGroupSchema}]),
      MongooseModule.forFeature([{name: 'Class', schema: ClassSchema}]),
      MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}])
    ],
    controllers: [ClassController],
    providers: [ClassService],
    exports: [ClassService],
  })
  export class ClassModule {}