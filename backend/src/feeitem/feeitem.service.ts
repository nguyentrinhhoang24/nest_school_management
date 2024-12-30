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
        createFeeItemDto.school_id = branch.school_id;
        const newFeeItem = await this.feeitemModel.create(createFeeItemDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { feeitem_id: newFeeItem._id } }
        );
        return newFeeItem;
    }

    async findByBranchId(branch_id: string): Promise<FeeItem[]> {
        // Kiểm tra nếu branch_id là ObjectId hợp lệ
        if (!Types.ObjectId.isValid(branch_id)) {
          throw new BadRequestException('Invalid branch ID format');
        }
    
        // Nếu hợp lệ, chuyển branch_id thành ObjectId
        const objectId = new Types.ObjectId(branch_id);
    
        // Truy vấn dữ liệu
        const feeitems = await this.feeitemModel.find({ branch_id: objectId }).exec();
        return feeitems;
    }

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
        return await this.feeitemModel.findByIdAndDelete(id);
    }

}
