import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AddUserDto } from './dto/adduser.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';

export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async addUser(addUserDto: AddUserDto, user: User): Promise<{ token: string }> {
        const { branch_id, class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password, role } = addUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData: any = { branch_id, class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password: hashedPassword, role };

          // SuperAdmin tạo SchoolAdmin
          if (user.role.includes(Role.Superadmin)) {
            if (!addUserDto.school_id) {
              throw new BadRequestException('Thiếu id school');
            }
            userData.school_id = addUserDto.school_id; // Gán school_id được chỉ định
          } else if (user.role.includes(Role.Schooladmin)) {
            // SchoolAdmin tạo thêm user trong trường mình quản lý
            userData.school_id = user.school_id; // Gán school_id của chính SchoolAdmin
          } else {
            throw new ForbiddenException('Không có quyền thêm user');
          }
        
        const newuser = await this.userModel.create(userData);
        const token = this.jwtService.sign({ id: newuser._id, role: newuser.role });
        return { token };
    }
 
    async login(loginDto: LoginDto): Promise<{ token: string }> {
      const { email, password } = loginDto;
      
      const user = await this.userModel.findOne({ email }).exec();
  
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      const payload = { id: user._id };
      const token = this.jwtService.sign(payload);
  
      return { token };
    }

    async findAll(): Promise<User[]> {
      const users = await this.userModel.find();
      return users;
    }

    async getUserById(userId: string): Promise<{ email: string; role: string[] }> {
      const user = await this.userModel.findById(userId).select('-password');
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return { email: user.email, role: user.role };
    }
}