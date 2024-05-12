import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.sto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types/payload.type';
import * as speakeasy from 'speakeasy';
import { Enable2FAType } from './types/auth-types';
import { UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
    private configService: ConfigService


  ) { }
  getEnvVariables() {
    return {
      port: this.configService.get<number>("port"),
    };
  }

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO); // 1.
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password
    ); // 2.
    if (passwordMatched) {
      // 3.
      delete user.password; // 4.
      const payload: PayloadType = { email: user.email, userId: user.id }; // 1
      // find if it is an artist then the add the artist id to payload
      const artist = await this.artistService.findArtist(user.id); // 2
      if (artist) {
        // 3
        payload.artistId = artist.id;
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Password does not match"); // 5.
    }
  }


  // two factor authentication
  // handle
  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId); //1
    if (user.enable2FA) { //2
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret(); //3
    console.log(secret);
    user.twoFASecret = secret.base32; //4
    await this.userService.updateSecretKey(user.id, user.twoFASecret); //5
    return { secret: user.twoFASecret }; //6



  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }
  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      // find the user on the based on id
      const user = await this.userService.findById(userId);
      // extract his 2FA secret
      // verify the secret with a token by calling the speakeasy verify method
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: 'base32',
      });
      // if validated then sends the json web token in the response
      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error verifying token');
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return updateAuthDto;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

}
