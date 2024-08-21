import { Injectable } from "@nestjs/common";
import { PessoaEntity } from "./pessoa.entity";
import { alteraPessoaDTO } from "./dto/alteraPessoa.dto";

//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class PessoaArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #usuarios: PessoaEntity[] = [];  

    //funçaço responsável por guardar o usuário no vetor
    AdicionarPessoa(pessoa: PessoaEntity){
        this.#pessoa.push(pessoa);
    }


    //função resposável por pesquisar usuários que tenham o email especificado 
    pesquisaEmail(email:string){

        //função find procura no vetor os dados com base no que foi especificado na função de parada( usuario.email = email)
        const possivelPessoa = this.#pessoa.find(
            pessoa => pessoa.email == email
        )
        return possivelPessoa;
    }    

    //função responsável por pesquisar usuário que tenham o ID especificado
    pesquisaId(id:string){
        const possivelPessoa = this.#pessoa.find(
            pessoaSalvo => pessoaSalvo.id === id
        );

        if(!possivelPessoa){
            throw new Error('Usuario não encontrado');//cria um erro quando o usuário não é encontrado
        }

        return possivelPessoa
    }

    //função responsável por alterar o usuário
    alteraPessoa(id:string,dadosNovos: alteraPessoaDTO){
        //pesquisa o usuário que vai ser alterado
        const pessoa = this.pesquisaId(id);

        //aqui os dados que são recebidos no JSon são convertidos para uma tabela de chave e valor, para isolar os dados recebidos
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                //aqui é validado se o campo a ser alterado vai ser o ID, se for ele ignora, pois não se pode alterar o ID
                if(chave === 'id'){
                    return
                }

                //caso não seja nenhum campo especial, é feito só a alteração direta do valor do campo com base no valor passado 
                pessoa[chave] = valor;
            }
        )

        return pessoa;
        
    }

    //função para validar se o email passado ja existe em outro usuário, é usada em geral para o email unico validator
    validaEmail(emailNovo: string){
        const possivelPessoa = this.pesquisaEmail(emailNovo)
        
        return (possivelPessoa === undefined)
    }

    //função responsável por fazer a validação de login
    Login(email:string ,senha:string){
        //primeiro é pesquisado o usuário por meio do email
        const possivelPessoa = this.pesquisaEmail(email)
        //caso encontre o usuário é validada então a senha, caso contrário ja retorna erro de login
        if (possivelPessoa){
            return {
                //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
                usuario: possivelPessoa.senha == senha?possivelPessoa:null,
                status: possivelPessoa.senha == senha
            };
        }else{
            return {
                usuario: null,
                status: false
            };
        }
    }

    
    //função para retornar todos os usuarios
    get Pessoa(){        
        return this.#pessoa;
    }

    async removerPessoa(id:string){
        const pessoa = this.pesquisaId(id);

        this.#pessoa = this.#pessoa.filter(
            pessoaSalvo => pessoaSalvo.id !==id
        )
        return pessoa

    }








}