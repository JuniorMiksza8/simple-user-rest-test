# Projeto para teste técnico

API Rest criado para preencher os seguintes requsitos : 


Cadastro de usuários contendo os campos:
- Código  
- Nome  
- Data de nascimento  
- Foto

Alguns detalhes:  
- Servidor em Node
- Banco de dados Postgres ou MySQL

## Requisitos 
- Docker
- Node

## Como inicializar
- Criar arquivo .env e adicionar as variaveis de ambiente ( documentadas no arquivo .env.example com valores padrões )
-  `npm install` para instalar os modulos
- `docker-compose up` para subir os containers Docker
- `npx prisma migrate --dev` para sincronizar o banco com as migrações da ORM

## Como testar
Projeto possui testes de integração embutido, usando a biblioteca JEST, para executar siga os passos
-  criar arquivo .env.test na raiz do projeto e preencher com as variaveis de ambiente ( documentadas no arquivo .env.example com valores padrões )
- executar `npm run test`

Outra maneira de testar o projeto é importar no [Postman](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman) o arquivo  `user.postman_collection.json` disponivel na raiz do projeto e testar via os endpoints via software.