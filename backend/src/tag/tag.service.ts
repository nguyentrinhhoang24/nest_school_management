import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "src/branch/schemas/branch.schema";
import { CreateTagDto } from "./dto/createtag.dto";
import { Tag } from "./schema/tag.schema";
import { UpdateTagDto } from "./dto/updatetag.dto";

@Injectable()
export class TagService {
    constructor(
        @InjectModel('Branch') private branchModel: Model<Branch>,
        @InjectModel('tag') private tagModel: Model<Tag>,
    ){}

    async findAll(): Promise<Tag[]> {
        const tags = await this.tagModel.find();
        return tags;
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const newTag = await this.tagModel.create(createTagDto);
        return newTag;
    }

    async findByBranch(branch_id: string): Promise<Tag[]> {
        const tags = await this.tagModel.find({branch_id: branch_id});
        return tags;
    }

    async findById(id: string): Promise<Tag> {
        const tag = await this.tagModel.findById(id);
        if(!tag){
            throw new NotFoundException('tag not found!!');
        }
        return tag;
    }

    async updateById(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
        return await this.tagModel.findByIdAndUpdate(id, updateTagDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Tag> {
        return await this.tagModel.findByIdAndDelete(id);
    }
}