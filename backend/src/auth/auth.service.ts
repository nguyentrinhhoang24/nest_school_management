import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';
import { RecaptchaService } from './recaptcha.service';

export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private recaptchaService: RecaptchaService,
    ) {}

    async createUser(createUserDto: CreateUserDto, user: User): Promise<{ token: string }> {
        const { branch_id, class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password, role } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData: any = { branch_id, class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password: hashedPassword, role };

          // SuperAdmin tạo SchoolAdmin
          if (user.role.includes(Role.Superadmin)) {
            if (!createUserDto.school_id) {
              throw new BadRequestException('Thiếu id school');
            }
            userData.school_id = createUserDto.school_id; // Gán school_id được chỉ định
          } else if (user.role.includes(Role.Schooladmin)) {
            userData.school_id = user.school_id; // Gán school_id của chính SchoolAdmin
          } else {
            throw new ForbiddenException('Không có quyền thêm user');
          }
        
        const newuser = await this.userModel.create(userData);
        const token = this.jwtService.sign({ id: newuser._id, role: newuser.role });
        return { token };
    }
 
    async login(loginDto: LoginDto): Promise<{ token: string, email: string, role: string[], school_id: string }> {
      const { email, password, recaptchaToken } = loginDto;

      if(!recaptchaToken) {
        throw new BadRequestException('captcha token is required');
      }
      await this.recaptchaService.verifyRecaptcha(recaptchaToken);
      
      const user = await this.userModel.findOne({ email }).exec();
  
      if (!user) {
        throw new UnauthorizedException('invalid credentials');
      }
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatched) {
        throw new UnauthorizedException('invalid credentials');
      }
  
      const payload = { id: user._id, email: user.email, role: user.role, school_id: user.school_id };
      const token = this.jwtService.sign(payload);
  
      return { token, email: user.email, role: user.role, school_id: user.school_id };
    }

    async findAll(): Promise<User[]> {
      const users = await this.userModel.find();
      return users;
    }

    async getByBranchAndRole(branch_id: string, roles: string[]): Promise<User[]> {
      return this.userModel.find({branch_id: branch_id, role: { $in: roles },}).exec();
    }

    async getUserById(userId: string): Promise<{ email: string; role: string[] }> {
      const user = await this.userModel.findById(userId).select('-password');
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return { email: user.email, role: user.role };
    }

    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }
}