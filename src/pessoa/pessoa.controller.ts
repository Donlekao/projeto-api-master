import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaPessoaDTO } from "./dto/pessoa.dto";
import { PessoaEntity } from "./pessoa.entity";
import {v4  as uuid} from 'uuid'
import { PessoaArmazenados } from "./pessoa.dm";
import { RetornoPessoaDTO } from "./dto/retornoPessoa.dto";
import { ListaPessoaDTO } from "./dto/listaPessoa.dto";
import { loginPessoaDTO } from "./dto/loginPessoa.dto";
import { alteraPessoaDTO } from "./dto/alteraPessoa.dto";

//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/pessoa')
export class PessoaController{
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private Pessoa : PessoaArmazenados){

    }

    //POST - Recebe dados, pode ou não retornar informações, mas em geral recebe dados e retorna uma resposta
    //GET - Recebe apenas parametros, mas retorna dados variados, normalmente utilizado para consulta de dados
    //PUT - recebe dados, utilizado para fazer alterações de registros
    //DELETE - recebe dados, utilizado para remover registros


    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    async criaPessoa(@Body() dadosPessoa: criaPessoaDTO){       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        var novoPessoa = new PessoaEntity(uuid(), dadosPessoa.nome, dadosPessoa.idade, 
                                            dadosPessoa.cidade, dadosPessoa.email,
                                            dadosPessoa.telefone, dadosPessoa.senha
        )
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        this.Pessoa.AdicionarPessoa(novoPessoa);

        //criação do padrão de retorno, para depois ser retornado como resposta do método, também é retornado os dados do usuário logado
        var retorno = new RetornoPessoaDTO('Usuario criado',novoPessoa);        
        return retorno        
    }

    @Post('/login')//linha que define o método post para login, nesse caso é idenficado o URL
    async fazerLogin(@Body() dadosLogin: loginPessoaDTO){
        //chamada da função de login
        var retornoLogin = this.Pessoa.Login(dadosLogin.email,dadosLogin.senha)
        //criação de retorno, onde caso a resposta seja true é retornado login efetuado, caso seja false, retorna email ou senha invalidos, também é retornado o usuário logado
        var retorno = new RetornoPessoaDTO(retornoLogin.status?'Login efetuado':'Email ou senha invalidos',retornoLogin.pessoa);        
        return retorno;       
        
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    async alteraPessoa(@Body() dadosNovos: alteraPessoaDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.Pessoa.alteraPessoa(id,dadosNovos)
        //criação do padrão de retorno
        var retorno = new RetornoPessoaDTO('Alteração Efetuada',retornoAlteracao);        
        return retorno;       
        
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    async retornaPessoaId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista usuario DTO)
        var pessoaListados = this.Pessoa.pesquisaId(ID);
        const ListaRetorno = new ListaPessoaDTO(pessoaListados.id,
                                                pessoaListados.nome,
                                                pessoaListados.email)

        return {
                Usuario: ListaRetorno
            };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    async retornaPessoa(){
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaUsuarioDTO)
        var pessoaListados = this.Pessoa.Pessoa;
        const ListaRetorno = pessoaListados.map(
            pessoa => new ListaPessoaDTO(
                pessoa.id,
                pessoa.nome,
                pessoa.email
            )
        );



        return {
                Pessoa: ListaRetorno
            };
    }

    @Delete('/:id')
    async removerPessoa(@Param('id')id: string){
        const retornoExclusao = await this.Pessoa.removerPessoa(id)
        const retorno = new RetornoPessoaDTO('exclusão efetuada', retornoExclusao);
        return retorno;
    }
}