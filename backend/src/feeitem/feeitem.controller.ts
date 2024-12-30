import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeeItemService } from './feeitem.service';
import { FeeItem } from './schemas/feeitem.schema';
import { CreateFeeItemDto } from './dto/createfeeiteam.dto';
import { UpdateFeeItemDto } from './dto/updatefeeiteam.dto';

@Controller('feeitem')
export class FeeItemController {
    constructor(private readonly feeitemService: FeeItemService) {}

    @Get()
    async getAllFeeItem(): Promise<FeeItem[]> {
        return this.feeitemService.findAll();
    }

    @Post()
    async createFeeItem(@Body() createFeeItemDto: CreateFeeItemDto): Promise<FeeItem> {
        return this.feeitemService.create(createFeeItemDto);
    }

    @Get('by-branch/:branch_id')
    async getFeeitemByBranch(@Param('branch_id') branch_id: string): Promise<FeeItem[]> {
        return this.feeitemService.findByBranchId(branch_id);
    }

    @Get(':id')
    async getFeeItem(@Param('id') id: string, ): Promise<FeeItem> {
        return this.feeitemService.findById(id);
    }

    @Put(':id')
    async updateItem(@Param('id') id: string, @Body() updateFeeItemDto: UpdateFeeItemDto): Promise<FeeItem> {
        return this.feeitemService.updateById(id, updateFeeItemDto);
    }

    @Delete(':id')
    async deleteItem(@Param('id') id: string): Promise<FeeItem> {
        return this.feeitemService.deleteById(id);
    }
}
