import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LectorStrategy extends PassportStrategy(Strategy, 'lector') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'correo',
            passwordField: 'clave',
        });
    }

    async validate(correo: string, clave: string) {
        const user: any = await this.authService.validateUserLector(correo, clave);
        if (!user) {
            throw new UnauthorizedException('Correo o clave inválida.');
        }
        return user;
    }
}