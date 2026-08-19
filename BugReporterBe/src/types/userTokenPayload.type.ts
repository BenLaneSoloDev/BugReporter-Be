import { JwtPayload } from 'jsonwebtoken';

interface UserTokenPayload extends JwtPayload {
  sub: string
  email: string,
  iat: number,
  exp: number
}

export default UserTokenPayload