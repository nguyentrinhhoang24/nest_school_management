import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeeItem } from './schemas/feeitem.schema';
import { CreateFeeItemDto } from './dto/createfeeiteam.dto';
import { UpdateFeeItemDto } from './dto/updatefeeiteam.dto';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class FeeItemService {
    constructor(
        @InjectModel('feeitem') private feeitemModel: Model<FeeItem>,
        @InjectModel('branch') private branchModel: Model<Branch>,
    ) {}

    async findAll(): Promise<FeeItem[]> {
        const feeitems = await this.feeitemModel.find();
        return feeitems;
    }

    async create(createFeeItemDto: CreateFeeItemDto): Promise<FeeItem> {
        const branch = await this.branchModel.findById(createFeeItemDto.branch_id);
        if(!branch) {
            throw new NotFoundException('Branch not found.');
        }
        const autoCreateCode = (): string => {
            const firstChar = 'FI';
            const timestamps = Date.now().toString();
            const newCode = timestamps.substring(timestamps.length - 6);
            return `${firstChar}${newCode}`;
        }
        createFeeItemDto.code = autoCreateCode();
        createFeeItemDto.school_id = branch.school_id;
        const newFeeItem = await this.feeitemModel.create(createFeeItemDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { feeitem_id: newFeeItem._id } }
        );
        return newFeeItem;
    }

    async findByBranchId(branch_id: string): Promise<FeeItem[]> {
        const feeitems = await this.feeitemModel.find({ branch_id: branch_id });
        return feeitems;
    };

    async findById(id: string): Promise<FeeItem> {
        const feeItem = await this.feeitemModel.findById(id);
        if(!feeItem) {
            throw new NotFoundException('Fee item not found!!')
        }
        return feeItem;
    }

    async updateById(id: string, updateFeeItemDto: UpdateFeeItemDto): Promise<FeeItem> {
        return await this.feeitemModel.findByIdAndUpdate(id, updateFeeItemDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<FeeItem> {
        const feeitem = await this.feeitemModel.findById(id);
        if (!feeitem) {
            throw new NotFoundException('Feeitem not found.');
        }
            await this.branchModel.findByIdAndUpdate(
        feeitem.branch_id,
            { $pull: { feeitem_id: id } },
            { new: true }
        )
        return await this.feeitemModel.findByIdAndDelete(id);
    }

}
