import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';
import { RecaptchaService } from './recaptcha.service';
import { UpdateUserDto } from './dto/updateuser.dto';
import { Branch } from 'src/branch/schemas/branch.schema';

export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel('Branch') private branchModel: Model<Branch>,
        private jwtService: JwtService,
        private recaptchaService: RecaptchaService,
    ) {}

    async createUser(createUserDto: CreateUserDto, user: User): Promise<{ token: string }> {
        const { branch_id, class_id, bus_id, student_id, 
          name, phone, address, birthday, gender, 
          image, email, password, role 
        } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData: any = { branch_id, class_id, bus_id, student_id, 
          name, phone, address, birthday, gender, 
          image, email, password: hashedPassword, role 
        };

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

        const checkEmail = await this.userModel.findOne({ email, school_id: userData.school_id })
        if (checkEmail) {
          throw new ConflictException('Email đã tồn tại')
        }
        
        const newuser = await this.userModel.create(userData);
        const token = this.jwtService.sign({ id: newuser._id, role: newuser.role });
        return { token };
    }

    async createManyParents(createUserDto: CreateUserDto[]): Promise<{ token: string }[]> {
        const parents: { token: string }[] = [];
        const branchId = createUserDto[0].branch_id;
        const branch = await this.branchModel.findById(branchId);
        if (!branch) {
            throw new BadRequestException('branch not found');
        }
        const checkEmail = new Set<string>();
        const filterDto = createUserDto.filter((dto) => {
          if(checkEmail.has(dto.email)) {
            return false;
          }
          checkEmail.add(dto.email);
          return true;
        })

        const allEmail = await this.userModel
          .find({ school_id: branch.school_id, email: { $in: Array.from(checkEmail)} })
          .distinct('email')

        const validDto = filterDto.filter((dto) => !allEmail.includes(dto.email));

        for (const parentDto of validDto) {
            const { class_id, bus_id, student_id, name, phone, address, birthday, gender, image, email, password } = parentDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData: any = { branch_id: branch._id, 
              school_id: branch.school_id, class_id, 
              bus_id, student_id, name, phone, address, 
              birthday, gender, image, email, password: hashedPassword, role: ['parent'], 
            };
            const newParent = await this.userModel.create(userData);
            const token = this.jwtService.sign({ id: newParent._id, role: newParent.role });
            parents.push({ token });
        }
        return parents;
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

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
          throw new NotFoundException('user not found.');
        }
        return user;
    }

    async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: true,
      });
    }
    

    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }
}