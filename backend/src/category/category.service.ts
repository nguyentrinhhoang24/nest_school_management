import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "src/branch/schemas/branch.schema";
import { Category } from "./schema/category.schema";
import { CreateCategoryDto } from "./dto/createcate.dto";
import { UpdateCategoryDto } from "./dto/updatecate.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Branch') private branchModel: Model<Branch>,
        @InjectModel('category') private cateModel: Model<Category>,
    ){}

    async findAll(): Promise<Category[]> {
        const categories = await this.cateModel.find();
        return categories;
    }

    async create(createCateDto: CreateCategoryDto): Promise<Category> {
        const branch = await this.branchModel.findById(createCateDto.branch_id);
        if(!branch){
            throw new NotFoundException('Branch not found!!');
        }
        const newCategory = await this.cateModel.create(createCateDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { category_id: newCategory._id } }
        );
        return newCategory;
    }

    async findByBranch(branch_id: string): Promise<Category[]> {
        const categories = await this.cateModel.find({branch_id: branch_id});
        return categories;
    }

    async findById(id: string): Promise<Category> {
        const Category = await this.cateModel.findById(id);
        if(!Category){
            throw new NotFoundException('Category not found!!');
        }
        return Category;
    }

    async updateById(id: string, updateCateDto: UpdateCategoryDto): Promise<Category> {
        return await this.cateModel.findByIdAndUpdate(id, updateCateDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Category> {
        const category = await this.cateModel.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found.');
        }
        await this.branchModel.findByIdAndUpdate(
            category.branch_id,
            { $pull: { category_id: id } },
            { new: true }
        )
        return await this.cateModel.findByIdAndDelete(id);
    }
}