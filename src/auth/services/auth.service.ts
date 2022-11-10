import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Administrador } from 'src/administrador/entities/administrador.entity';
import { AdministradorDto, CreateAdministradorDto, loginDto } from 'src/administrador/dto/administrador.dto';
import { LectorDto, LectorFindDto, loginLectorDto } from 'src/lector/dto/lector.dtos';
import { Lector } from 'src/lector/entities/lector.entity';
import { PayloadToken } from "./../models/token.model";
import { Console } from 'console';

@Injectable()
export class AuthService {
    constructor(
        // private empresaService: EmpresaService,
        private jwtService: JwtService,
        // @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
        // @InjectRepository(Permiso) private permisoRepo: Repository<Permiso>,
        // private mailService: MailService
        @InjectRepository(Administrador) private administradorRepo: Repository<Administrador>,
        @InjectRepository(Lector) private lectorRepo: Repository<Lector>,

        ) { }

    async validateUser(correo: string, clave: string) {
        const user = await this.findClienteByEmail(correo);
        if (user) {
            // const isMatch = await bcrypt.compare(clave, user.clave);
            const isMatch = true ? clave == user.clave : false;
            console.log("isMatch", isMatch)
            if (isMatch) {
                const { clave, ...rta } = user;
                return rta;
            }
        }
        return null;
    }

    async validateUserLector(correo: string, clave: string) {
        const user = await this.findLectorByEmail(correo);
        if (user) {
            // const isMatch = await bcrypt.compare(clave, user.clave);
            const isMatch = true ? clave == user.clave : false;
            console.log("isMatch", isMatch)
            if (isMatch) {
                const { clave, ...rta } = user;
                return rta;
            }
        }
        return null;
    }

    async register(usuario: CreateAdministradorDto) {
        const user = this.administradorRepo.create(usuario);
        const dataUser = await this.administradorRepo.save(user);
        let data: loginDto = {
            nombre: dataUser.nombre,
            clave: dataUser.clave,
            correo: dataUser.correo,
        }
        this.generateJWT(data);
    }

    async generateJWT(usuario: loginDto, message?) {
        const existe = await this.validateUser( usuario.correo, usuario.clave)
        if (!existe) {
            return (`Clave incorrecta`);
        }
        const usuarioFind: AdministradorDto  = await this.findClienteByEmail(usuario.correo)
        const payload: PayloadToken = { sub: usuarioFind.id, correo: usuarioFind.correo } 
        return {
                accessToken: this.jwtService.sign(payload),
                usuario,
                message: message != null ? message : "INICIO DE SESIÓN EXITOSO"
        }
    }

    async generateJWTLector(usuario: loginLectorDto, message?) {
        const existe = await this.validateUserLector( usuario.correo, usuario.clave)
        if (!existe) {
            return (`Clave incorrecta`);
        }
        const lectorFind: LectorDto  = await this.findLectorByEmail(usuario.correo)
        const payload: PayloadToken = { sub: lectorFind.id, correo: lectorFind.correo } 
        console.log("LECTOR", usuario)
        const data = plainToClass(LectorDto, lectorFind)
        return {
                accessToken: this.jwtService.sign(payload),
                data,
                message: message != null ? message : "INICIO DE SESIÓN EXITOSO"
        }
    }

    findLectorByEmail(correo: string) {
        return this.lectorRepo.findOne({ where: { correo } });
    }

    findClienteByEmail(correo: string) {
        return this.administradorRepo.findOne({ where: { correo } });
    }

    finAdministradorById(id: number) {
        return this.administradorRepo.findOne({where: { id}});
    }

    refreshJWT(token: any) {
        const empresa = this.jwtService.verify(token["accessToken"], { publicKey: IS_PUBLIC_KEY })
        return {
            access_token: token["accessToken"],
            empresa,
            message: "Inicio de sesión exitoso"
        }
    }

    async perfil(idAdmin: number) {
        var empresa = await this.administradorRepo.findOneBy({id: idAdmin});
        return empresa
    }

    async perfilLector(idLector: number) {
        var lector = await this.lectorRepo.findOneBy({id: idLector});
        return lector
    }

    async recuperarClave(changes: any) {
        // const user = await this.empresaService.findByEmail(changes.correo);
        // if (user) {
        //     user.clave = uid(8)
        //     const clave = user.clave
        //     const hashPassword = await bcrypt.hash(user.clave, 10)
        //     user.clave = hashPassword
        //     this.empresaRepo.merge(user, changes);
        //     this.mailService.emailRecuperarClave(user.nombre, user.correo, clave)
        //     return this.empresaRepo.save(user);
        // } else {
        //     throw new NotFoundException(`No existe el correo en la plataforma.`);
        // }
    }

    async cambiarClave(changes: any) {
        // const user = await this.empresaService.findByEmail(changes.correo);
        // if (user) {
        //     const hashPassword = await bcrypt.hash(changes.clave, 10)
        //     user.clave = await hashPassword
        //     return this.empresaRepo.save(user);
        // } else {
        //     throw new NotFoundException(`No existe el correo en la plataforma.`);
        // }
    }

    

}
