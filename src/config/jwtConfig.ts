import jwt from 'jsonwebtoken';

export class JwtConfig {
  private static readonly SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-here';
  private static readonly EXPIRES_IN = '24h';

  static generateToken(payload: object): string {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, this.SECRET_KEY);
  }
}