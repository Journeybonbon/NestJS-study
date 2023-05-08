import { Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from "./dto/user-login.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UsersService } from "./users.service";
import { UserEntity } from "./dto/user.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfo } from "./UserInfo";


@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

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
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<void> {
        const { signupVerifyToken } = dto;

        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<UserEntity> {
        const { email, password } = dto;

        return await this.usersService.login(email, password);
    }

    @Get('/:id')
    async getUserInfo(@Param('id', ValidationPipe) userId: number): Promise<UserEntity> {
        return await this.usersService.getUserInfo(userId);
    }

}