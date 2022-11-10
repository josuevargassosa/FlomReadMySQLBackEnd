import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import config from "../../config";
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>,
    private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // OBTENDREMOS EL TOKEN LOS HEADERS COMO 'Bearer token'
            ignoreExpiration: false,
            // IGNORA LA EXPIRACION, EN TU CASO EL TIEMPO QUE LE HAYAS PUESTO
            // EJE.  signOptions: { expiresIn: '24h' }, YO LE PUSE 1 DIA 
            secretOrKey: configService.jwtSecret,
            // LA LLAVE SECRETA CON LA QUE FIRMAMOS EL TOKEN AL HACER LOGIN
            usernameField: 'correo',
            passwordField: 'clave',
        });
        console.log(configService.jwtSecret);
    }

    // ESTA FUNCION LO QUE HARA SERA RECIBIR EL TOKEN DECODIFICADO 
    // CON LA CARGA DE DATOS QUE LE PUSIMOS AL HACER LOGIN
    // validate(payload: PayloadToken) {
    //     return payload;
    // }
    async validate(correo: string, clave: string) {
        const user: any = await this.authService.validateUser(correo, clave);
        console.log('VALIDACION',user);
        if (!user) {
            throw new UnauthorizedException('Correo o clave inválida.');
        }
        return user;
    }
}