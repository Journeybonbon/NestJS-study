import { Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import { Headers, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from "./dto/user-login.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/auth/auth.guard";



@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        ) {}

    @Post()
    @ApiOperation({ summary: 'Create User'})
    @ApiResponse({
        status: 201,
        description: 'Created',
        type: CreateUserDto
    })
    @ApiResponse({ status:403, description: 'Forbidden.'})
    async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto;
        await this.usersService.createUser(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;

        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto){
        const { email, password } = dto;

        return await this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUserInfo(@Headers() headers: any, @Param('id', ValidationPipe) userId: number){
        return await this.usersService.getUserInfo(userId);
    }

}