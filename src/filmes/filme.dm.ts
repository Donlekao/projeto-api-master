//data module do modulo de usuário, responsável por guardar os dados de usuários e manipular os dados armazenados
import { Injectable } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";


//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class FilmeArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #filmes: FilmeEntity[] = [];  

    //funçaço responsável por guardar o usuário no vetor
    AdicionarFilme(filme: FilmeEntity){
        this.#filmes.push(filme);
    }

    async removerfilme(id:string){
        const filme = this.pesquisaId(id);

        this.#filmes = this.#filmes.filter(
            filmeSalvo => filmeSalvo.id !==id
        )
        return filme

    }

    

    pesquisaId(id:string){
        const possivelfilme = this.#filmes.find(
            filmeSalvo => filmeSalvo.id === id
        );

        if(!possivelfilme){
            throw new Error('filme não encontrado');//cria um erro quando o usuário não é encontrado
        }

        return possivelfilme
    }

    
    alteraFilme(id:string,dadosNovos: alteraFilmeDTO){
        //pesquisa o usuário que vai ser alterado
        const filme = this.pesquisaId(id);

        
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                
                if(chave === 'id'){
                    return
                }

                
                filme[chave] = valor;
            }
        )

        return filme;
        
    }


    get filmes(){        
        return this.#filmes;
    }

  







}

