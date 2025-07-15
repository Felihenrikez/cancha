import bcrypt from 'bcrypt';
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { JwtConfig } from '../../config/jwtConfig';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: string;
  };
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginData;

    // Buscar usuario por email
    const userEmail = new UserEmail(email);
    const user = await this.userRepository.findByEmail(userEmail);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password.getValue());
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar token JWT
    const tokenPayload = {
      id: user._id?.getValue(),
      email: user.email.getValue(),
      role: user.role.getValue()
    };

    const token = JwtConfig.generateToken(tokenPayload);

    // Retornar respuesta
    return {
      token,
      user: {
        id: user._id?.getValue() || '',
        name: user.name.getValue(),
        email: user.email.getValue(),
        phone: user.phone.getValue(),
        birthDate: user.birthDate.getValue().toISOString(),
        role: user.role.getValue()
      }
    };
  }
}