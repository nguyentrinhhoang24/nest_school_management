import { Body, Controller, Post, Get, UseGuards, Req, NotFoundException, Delete, Param, Query, BadRequestException, Put } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/createuser.dto";
import { AuthService } from "./auth.service";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";
import { User } from "./schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./guards/roles.guard";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RecaptchaService } from "./recaptcha.service";
import { UpdateUserDto } from "./dto/updateuser.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private recaptchaService: RecaptchaService,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    @Post('/createuser')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Superadmin, Role.Schooladmin)
    addUser(@Body() createUserDto: CreateUserDto, @Req() req): Promise<{token: string}> {
        return this.authService.createUser(createUserDto, req.user);
    }

    // http://localhost:5000/auth/importexcel
    @Post('/importexcel')
    addParents(@Body() createUserDto: CreateUserDto[]): Promise<{token: string}[]> {
        return this.authService.createManyParents(createUserDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return this.authService.login(loginDto);
    }

    @Get()
    async getAll(): Promise<User[]> {
        return this.authService.findAll();
    }

    @Get('/by-branch/:branch_id')
    async getByBranchRole(@Param('branch_id') branch_id, @Query('roles') roles: string): Promise<User[]> {
        if(!branch_id) {
            throw new Error('branch id is required');
        }
        const roleArray = roles.split(',');
        return this.authService.getByBranchAndRole(branch_id, roleArray);
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async getUserProfile(@Req() req): Promise<{ email: string; role: string[] }> {
    const userId = req.user.id; // `id` được giải mã từ token trong strategy
    return this.authService.getUserById(userId);
    }

    @Get(':id')
    async getById(@Param('id') id: string,): Promise<User> {
    return this.authService.findById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.authService.updateUserById(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.authService.deleteById(id);
    }

}