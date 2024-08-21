import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaArmazenados } from './pessoa.dm';
import { emailUnicoValidator } from './validacao/email-unico.validator';

@Module({  
  controllers: [PessoaController],  
  providers: [PessoaArmazenados,emailUnicoValidator],
})
export class PessoaModule {}