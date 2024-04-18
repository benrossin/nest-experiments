import { Role } from '../../user/enums/roles.enum';

export class JwtPayloadDto {
  sub: string;
  thumbnail: string;
  refreshToken: string;
  email: string;
  role: Role;
  isActive: boolean;
}
