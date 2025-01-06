import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";
import { CategorySchema } from "./schema/category.schema";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'category', schema: CategorySchema}]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}