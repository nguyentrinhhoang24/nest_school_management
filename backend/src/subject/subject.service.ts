import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Subject } from "./schemas/subject.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSubjectDto } from "./dto/createsubject.dto";
import { UpdateSubjectDto } from "./dto/updatesubject.dto";

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel('subject') private subjectModel: Model<Subject>,
        @InjectModel('branch') private branchModel: Model<Subject>,
    ) {}
    
    async findAll(): Promise<Subject[]> {
        const subject = await this.subjectModel.find();
        return subject;
    }

    async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
        const branch = await this.branchModel.findById(createSubjectDto.branch_id);
        if (!branch) {
            throw new NotFoundException('Branch not found.');
        }
        const autoCreateCode = (): string => {
            const firstChar = 'SJ';
            const timestamps = Date.now().toString();
            const newCode = timestamps.substring(timestamps.length - 6);
            const randomNumber = Math.floor(Math.random() * 10)
            return `${firstChar}${randomNumber}${newCode}`;
        }
        createSubjectDto.code = autoCreateCode();
        const newSubject = await this.subjectModel.create(createSubjectDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { subject_id: newSubject._id } }
        )
        
        return newSubject;
    }

    async createManySubject(createSubjectDto: CreateSubjectDto[]): Promise<Subject[]> {
        const branchId = createSubjectDto[0].branch_id;
        const branch = await this.branchModel.findById(branchId);
        if(!branch) {
            throw new NotFoundException('branch not found');
        }
        const autoCreateCode = (index: number): string => {
            const firstChar = 'SJ';
            const timestamp = Date.now().toString().substring(8);
            return `${firstChar}${timestamp}${index}`;
        };

        createSubjectDto = createSubjectDto.map((subject, index) => ({
        ...subject,
        code: autoCreateCode(index + 1)
        }));

        const subjects = await this.subjectModel.insertMany(createSubjectDto);
        const subjectId = subjects.map(subject => subject._id);
        await this.branchModel.updateOne(
            { _id: branchId },
            { $push: { subject_id: { $each: subjectId } } }
        );
        console.log('response data:', subjects);
        return subjects;
    }

    async findByBranchId(branch_id: string): Promise<Subject[]> {
        const subjects = await this.subjectModel.find({ branch_id: branch_id });
        return subjects;
    }

    async findById(id: string): Promise<Subject> {
        const subject = await this.subjectModel.findById(id);
        if (!subject) {
            throw new NotFoundException('subject not found!!');
        }
        return subject;
    }

    async updateById(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
        return await this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, {
            new: true,
            runValidators: true,
        });
    }
    
    async deleteById(id: string): Promise<Subject> {
        const subject = await this.subjectModel.findById(id);
        if (!subject) {
        throw new NotFoundException('subject not found.');
        }
        await this.branchModel.findByIdAndUpdate(
        subject.branch_id,
        { $pull: { subject_id: id } },
        { new: true }
        ) 
        return await this.subjectModel.findByIdAndDelete(id);
    }
}