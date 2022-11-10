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
import { loginLectorDto } from 'src/lector/dto/lector.dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() req: loginDto) {
    return this.authService.generateJWT(req);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('register')
  register(@Body() user: CreateAdministradorDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @ApiBearerAuth()
  @Get('perfil-admin')
  getOrders(@Req() req: Request) {
    const empresa = req.user as any;
    return this.authService.perfil(empresa.sub);
  }

  @Post('login-lector')
  loginLector(@Body() req: loginLectorDto) {
    return this.authService.generateJWTLector(req);
  }

  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @ApiBearerAuth()
  @Get('perfil-lector')
  getLector(@Req() req: Request) {
    const empresa = req.user as any;
    return this.authService.perfilLector(empresa.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('refresh-access-token')
  getToken(@Body() token: any) {
    return this.authService.refreshJWT(token);
  }


  @Post('recuperar-clave')
  @Public()
  @UseGuards(AuthGuard('api_key'))
  @ApiSecurity('api_key', ['api_key'])
  updateClaveCorreo(@Body() payload: any) {
    return this.authService.recuperarClave(payload);
  }

  // @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type: null })
  @ApiResponse({ status: 500, description: 'Server error.', type: null })
  @ApiBearerAuth()
  @Post('cambiar-clave')
  updateClave(@Body() payload: any) {
    return this.authService.cambiarClave(payload);
  }
}
