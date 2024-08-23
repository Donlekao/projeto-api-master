import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";


export class criaPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiProperty({
        example: "Joao",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    nome: string;

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @ApiProperty({
        example: "joao@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    @ApiProperty({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 digitos"
    })
    senha:string;
    
    @IsNumber()
    @ApiProperty({
        example: "1990",
        description: "Ano de nascimento do usuário, deve ser informado como Numero(number)"
    })
    idade: number;

    @IsString()
    @ApiProperty({
        example: "Bauru",
        description: "Cidade do usuário, deve ser informado um texto com a cidade"
    })
    cidade: string;

    @IsString()
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    telefone: string;
}