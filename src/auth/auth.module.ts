import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategy/jwt.strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    ArtistsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: "10d"
        }
      }),
      inject: [ConfigService],

    })
  ],

  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService]
})
export class AuthModule { }
