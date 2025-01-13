import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './schemas/user.schema';
import { RecaptchaService } from './recaptcha.service';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    forwardRef(() => BranchModule), 
    MongooseModule.forFeature([{ name: 'Branch', schema: BranchSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RecaptchaService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}  