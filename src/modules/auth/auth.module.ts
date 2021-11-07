import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register(
      {
        secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
        signOptions: {
          expiresIn: '24h',
        },
      },
    ),
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
