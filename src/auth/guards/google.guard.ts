import { AuthGuard } from '@nestjs/passport';
import { googleKey } from '../constants/auth.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleGuard extends AuthGuard(googleKey) {}
