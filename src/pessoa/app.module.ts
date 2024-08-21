import { Module } from '@nestjs/common';
import { UsuarioModule } from './pessoa/pessoa.module';



@Module({
  imports: [PessoaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}