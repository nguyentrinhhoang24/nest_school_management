import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/createtag.dto";
import { Tag } from "./schema/tag.schema";
import { UpdateTagDto } from "./dto/updatetag.dto";


@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService
    ){}

    @Get()
    async getAll(): Promise<Tag[]> {
        return this.tagService.findAll();
    }

    @Post()
    async createCategory(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tagService.create(createTagDto);
    }

    // `http://localhost:5000/tag/branchid/${branch_id}`
    @Get('branchid/:branch_id')
    async getByBranch(@Param('branch_id') branch_id): Promise<Tag[]> {
        return this.tagService.findByBranch(branch_id);
    }

    @Get(':id')
    async getBus(@Param('id') id: string):Promise<Tag> {
        return this.tagService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<Tag> {
        return this.tagService.updateById(id, updateTagDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Tag> {
        return this.tagService.deleteById(id);
    }

}