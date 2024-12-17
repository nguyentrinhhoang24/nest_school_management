import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
              throw new BadRequestException('School ID is required for creating a SchoolAdmin');
            }
            userData.school_id = addUserDto.school_id; // Gán school_id được chỉ định
          } else if (user.role.includes(Role.Schooladmin)) {
            // SchoolAdmin tạo thêm user trong trường mình quản lý
            userData.school_id = user.school_id; // Gán school_id của chính SchoolAdmin
          } else {
            throw new ForbiddenException('dont have permission to create a SchoolAdmin');
          }
        
        const newuser = await this.userModel.create(userData);
        const token = this.jwtService.sign({ id: newuser._id, role: newuser.role });
        return { token };
    }
 
    async login(loginDto: LoginDto): Promise<{ token: string }> {
      const { email, password } = loginDto;
      // console.log(email)
      // console.log(password)
  
      // Find the user by email
      const user = await this.userModel.findOne({ email }).exec();
  
      if (!user) {
        throw new UnauthorizedException('Khong tim thay user');
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      // Generate JWT token with user ID and possibly roles or other claims
      const payload = { id: user._id, role: user.role };
      const token = this.jwtService.sign(payload);
  
      return { token };
    }

    async findAll(): Promise<User[]> {
      const users = await this.userModel.find();
      return users;
    }
}