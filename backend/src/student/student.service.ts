import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Student } from "./schemas/student.schema";
import { CreateStudentDto } from "./dto/createstudent.dto";
import { UpdateStudentDto } from "./dto/updatestudent.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Branch } from "src/branch/schemas/branch.schema";
import { Class } from "src/class/schemas/class.schema";

@Injectable()
export class StudentService {
    constructor(
      @InjectModel('student') private studentModel: Model<Student>,
      @InjectModel('branch') private branchModel: Model<Branch>,
      @InjectModel('class') private classModel: Model<Class>,
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
 
      async findByBranchId(branch_id: string): Promise<Student[]> {
        return this.studentModel.find({branch_id: branch_id}).exec();
      }

      async findByClassId(class_id: string): Promise<Student[]> {
        return this.studentModel.find({ class_id: new Types.ObjectId(class_id) }).exec();
      }
 
      async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const branch = await this.branchModel.findById(createStudentDto.branch_id);
        const Class = await this.classModel.findById(createStudentDto.class_id);
        if (!branch) {
          throw new NotFoundException('Branch not found.');
        }
        if (!Class) {
          throw new NotFoundException('Class not found.');
        }
        createStudentDto.school_id = branch.school_id;
        const newStudent = await this.studentModel.create(createStudentDto);
        await Promise.all([
          this.classModel.updateOne(
            { _id: Class._id },
            { $push: { student_id: newStudent._id } }
          ),
          this.branchModel.updateOne(
            { _id: branch._id},
            { $push: { student_id: newStudent._id}}
          ),
        ]); 
        return newStudent;
      }

      async createManyStudent(createStudentDto: CreateStudentDto[]): Promise<Student[]> {
        const branchId = createStudentDto[0].branch_id;
        const branch = await this.branchModel.findById(branchId);
        const classId = createStudentDto[0].class_id;
        const Class = await this.classModel.findById(classId);
        const students = await this.studentModel.insertMany(createStudentDto);
        const studentId = students.map(student => student._id);
        await Promise.all([
          this.branchModel.updateOne(
            { _id: branchId },
            { $push: { student_id: { $each: studentId } } }
          ),
          this.classModel.updateOne(
            { _id: classId },
            { $push: { student_id: { $each: studentId } } }
          ),
        ])
        console.log('response data:', students);
        return students;
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
        const student = await this.studentModel.findById(id);
        if (!student) {
          throw new NotFoundException('student not found.');
        }
        await Promise.all([
          this.branchModel.findByIdAndUpdate(
            student.branch_id,
            { $pull: { student_id: id } },
            { new: true }
          ),
          this.classModel.findByIdAndUpdate(
            student.class_id,
            { $pull: { student_id: id } },
            { new: true }
          ),
        ]) 
        return await this.studentModel.findByIdAndDelete(id);
      }
}