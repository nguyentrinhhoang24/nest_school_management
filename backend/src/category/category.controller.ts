import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/createcate.dto";
import { Category } from "./schema/category.schema";
import { UpdateCategoryDto } from "./dto/updatecate.dto";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly cateService: CategoryService
    ){}

    @Get()
    async getAll(): Promise<Category[]> {
        return this.cateService.findAll();
    }

    @Post()
    async createCategory(@Body() createCate: CreateCategoryDto): Promise<Category> {
        return this.cateService.create(createCate);
    }

    // `http://localhost:5000/category/branchid/${branch_id}`
    @Get('branchid/:branch_id')
    async getByBranch(@Param('branch_id') branch_id): Promise<Category[]> {
        return this.cateService.findByBranch(branch_id);
    }

    @Get(':id')
    async getBus(@Param('id') id: string):Promise<Category> {
        return this.cateService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCateDto: UpdateCategoryDto): Promise<Category> {
        return this.cateService.updateById(id, updateCateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Category> {
        return this.cateService.deleteById(id);
    }

}