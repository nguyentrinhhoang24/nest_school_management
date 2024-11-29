import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "./schemas/student.schema";
import { CreateStudentDto } from "./dto/createstudent.dto";
import { UpdateStudentDto } from "./dto/updatestudent.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class StudentService {
    constructor(
      @InjectModel('student') private studentModel: Model<Student>,
      // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

      async findAll(): Promise<Student[]> {
        const students = await this.studentModel.find();
        return students;
      }

      // sử dụng index
      async findBySchoolId(id: string): Promise<Student[]> {
        return this.studentModel.find({ school_id: id }).exec();
      }

      async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = await this.studentModel.create(createStudentDto);
        return newStudent;
      }
    
      async findById(id: string): Promise<Student> {
        const student = await this.studentModel.findById(id);
        if (!student) {
          throw new NotFoundException('Student not found.');
        }
        return student;
      }
    
      async updateById(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        return await this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<Student> {
        return await this.studentModel.findByIdAndDelete(id);
      }
    
}