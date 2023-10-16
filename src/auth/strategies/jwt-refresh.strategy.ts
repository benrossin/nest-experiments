import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FullJwtPayload } from './jwt.strategy';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { refreshJwtKey } from '../constants/auth.constant';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, refreshJwtKey) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('REFRESH_JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, fullJwtPayload: FullJwtPayload): JwtPayloadDto {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...payload } = fullJwtPayload;
    return { ...payload, refreshToken };
  }
}
