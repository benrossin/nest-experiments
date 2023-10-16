import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtKey } from '../constants/auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(jwtKey) {}
