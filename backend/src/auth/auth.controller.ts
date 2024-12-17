import { Body, Controller, Post, Get, UseGuards, Req } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AddUserDto } from "./dto/adduser.dto";
import { AuthService } from "./auth.service";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";
import { User } from "./schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./guards/roles.guard";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/adduser')
    @UseGuards(AuthGuard(), RolesGuard)
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
}