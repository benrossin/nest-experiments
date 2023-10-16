import { Role } from '../../user/enums/roles.enum';

export class JwtPayloadDto {
  sub: string;
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  email: string;
  role: Role;
  isActive: boolean;
}
