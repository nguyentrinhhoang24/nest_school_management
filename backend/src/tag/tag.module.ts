import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";
import { TagSchema } from "./schema/tag.schema";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'tag', schema: TagSchema}]),
    ],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}