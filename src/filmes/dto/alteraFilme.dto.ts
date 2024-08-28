//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class alteraFilmeDTO{

    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    @ApiPropertyOptional({
        example: 'a volta dos que não foram',
        description: "nome do filme, deve ser informado um texto contendo o nome"
    })
    nome: string;

    @IsNumber(undefined, {message: "email inválido"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "120",
        description:"duracao do filme em minutos"

    })
    duracao: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "um filme que conta a historia de ....",
        description: "sinopse do filme que esta inserido"

    })
    sinopse:string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "1998",
        description: "ano de lançamento do filme"
    })
    ano: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "ação",
        description: "genero do filme"
    })
    genero: string;


}