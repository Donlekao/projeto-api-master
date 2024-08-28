//DTO responsável por receber dados de criação de um novo usuário
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criaFilmeDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiProperty({
        example: 'a volta dos que não foram',
        description: "nome do filme, deve ser informado um texto contendo o nome"
    })
    nome: string;

    @IsNumber(undefined, {message: "email inválido"})
    @ApiProperty({
        example: "120",
        description:"duracao do filme em minutos"

    })
    duracao: number;

    @IsString()
    @ApiProperty({
        example: "um filme que conta a historia de ....",
        description: "sinopse do filme que esta inserido"

    })
    sinopse:string;
    
    @IsString()
    @ApiProperty({
        example: "1998",
        description: "ano de lançamento do filme"
    })
    ano: string;

    @IsString()
    @ApiProperty({
        example: "ação",
        description: "genero do filme"
    })
    genero: string;


}