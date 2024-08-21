import { PessoaEntity } from "../pessoa.entity";

export class RetornoPessoaDTO{
    constructor(
        readonly status: string,
        readonly usuario: PessoaEntity
        ){}
}