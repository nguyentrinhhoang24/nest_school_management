import { Body, Controller, Post, Get, UseGuards, Req, NotFoundException, Delete, Param } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AddUserDto } from "./dto/adduser.dto";
import { AuthService } from "./auth.service";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";
import { User } from "./schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./guards/roles.guard";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    @Post('/adduser')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Superadmin, Role.Schooladmin)
    addUser(@Body() addUserDto: AddUserDto, @Req() req): Promise<{token: string}> {
        return this.authService.addUser(addUserDto, req.user);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return this.authService.login(loginDto);
    }

    @Get()
    async getAll(): Promise<User[]> {
        return this.authService.findAll();
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async getUserProfile(@Req() req): Promise<{ email: string; role: string[] }> {
    const userId = req.user.id; // `id` được giải mã từ token trong strategy
    return this.authService.getUserById(userId);
    }

}