import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user: any;
    
    try {
        user = await this.usersService.getOneByEmail(email);
    } catch (err) {
        return null
    }
    
    //Check if password is correct
    const passwordMatch = await bcrypt.compare(pass, user.password)

    if (!passwordMatch) {
        return null
    }

    const payload = { email: user.email, sub: user.id };
    
    return {
        token: this.jwtService.sign(payload),
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }

  }

  async validateAdminUser(id: string) {
    const user = await this.usersService.getOne(id);
    if (user.isAdmin) {
      return user;
    }
    return null;
  }
}