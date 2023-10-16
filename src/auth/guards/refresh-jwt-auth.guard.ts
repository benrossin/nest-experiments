import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { refreshJwtKey } from '../constants/auth.constant';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(refreshJwtKey) {}
