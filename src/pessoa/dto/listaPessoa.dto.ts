export class ListaPessoaDTO{
    //dtos de resposta normalmente não tem nenhuma validação, apenas o constructor com os campos a serem retornados
    constructor(
            readonly id: string, 
            readonly nome:string,
            readonly email: string
    ){}
}