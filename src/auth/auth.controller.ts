import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/sign-up.dto';
import { signInDto } from './dto/sign-in.dto';
import { isAuthGuard } from './auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  @UseGuards(isAuthGuard)
  getCurrentUser(@User() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
