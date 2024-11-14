import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AddUserDto } from './dto/adduser.dto';
import { LoginDto } from './dto/login.dto';

export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async addUser(addUserDto: AddUserDto): Promise<{ token: string }> {
        const { school_id, branch_id, class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password, role } = addUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            school_id, 
            branch_id, 
            class_id, 
            bus_id, 
            student_id, 
            name, 
            phone, 
            address, 
            birthday, 
            gender, 
            image, 
            email, 
            password: hashedPassword, 
            role,
        });

        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
}