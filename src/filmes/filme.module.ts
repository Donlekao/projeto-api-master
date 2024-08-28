//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { FilmeArmazenados} from './filme.dm';
import { emailUnicoValidator } from './validacao/email-unico.validator';

@Module({  
  controllers: [FilmeController],  
  providers: [FilmeArmazenados,emailUnicoValidator],
})
export class FilmeModule {}
