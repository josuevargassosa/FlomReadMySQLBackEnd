import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { EmpresaDto, UpdateClaveDto, UpdateCorreoDto, UpdateEmpresaDto } from 'src/empresa/dtos/empresa.dtos';
import { Public } from '../decorators/public.decorator';
import {
  AdministradorDto,
  CreateAdministradorDto,
  loginDto,
} from 'src/administrador/dto/administrador.dto';
import {
  cambiarClaveDto,
  LectorDto,
  loginLectorDto,
} from 'src/lector/dto/lector.dtos';
import { TransformInterceptor } from 'src/providers/transform.interceptor';
import { Lector } from 'src/lector/entities/lector.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('register')
  register(@Body() user: CreateAdministradorDto) {
    return this.authService.register(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() req: loginDto) {
    return this.authService.generateJWT(req);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @ApiBearerAuth()
  @Get('perfil-admin')
  getOrders(@Req() req: Request) {
    const admin = req.user as any;
    return this.authService.perfil(admin.sub);
  }

  @UseGuards(AuthGuard('lector'))
  @Post('login-lector')
  loginLector(@Body() req: loginLectorDto) {
    return this.authService.generateJWTLector(req);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @ApiBearerAuth()
  @Get('perfil-lector')
  getLector(@Req() req: Request) {
    const lector = req.user as any;
    return this.authService.perfilLector(lector.sub);
  }

  @ApiBearerAuth()
  @Post('refresh-access-token')
  getToken(@Body() token: any) {
    return this.authService.refreshJWT(token);
  }

  // @Post('recuperar-clave')
  // @Public()
  // @UseGuards(AuthGuard('api_key'))
  // @ApiSecurity('api_key', ['api_key'])
  // updateClaveCorreo(@Body() payload: any) {
  //   return this.authService.recuperarClave(payload);
  // }

  // @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @Public()
  @Post('cambiar-clave')
  updateClave(@Body() payload: cambiarClaveDto) {
    console.log('payload', payload);
    return this.authService.cambiarClave(payload);
  }

  // @Get('nuevo')
  // nuevo() {
  //   return 'soy nuevo';
  // }
}
