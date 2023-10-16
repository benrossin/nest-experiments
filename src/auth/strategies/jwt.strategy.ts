import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { jwtKey } from '../constants/auth.constant';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

export interface FullJwtPayload extends JwtPayloadDto {
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, jwtKey) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(fullPayload: FullJwtPayload): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...payload } = fullPayload;
    return await this.userService.findOne(payload.sub);
  }
}
