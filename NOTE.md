# CheckIn app

GymPass style app

<!-- 
Oque é possivel que o usuario
faça na applicação (funcionalidades)
-->
## Requisitos funcionais (RFs)

- [ ] Deve ser possivel se cadastrar
- [ ] Deve ser possivel se authenticar
- [ ] Deve ser possivel obter perfil de um usuario logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado
- [ ] Deve ser possivel o usuario obter seu historico de check-ins
- [ ] Deve ser possivel o usuario buscar academias proximas
- [ ] Deve ser possivel o usuarios buscar academias pelo nome
- [ ] Deve ser possivel o usuario realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuario
- [ ] Deve ser possivel cadastrar uma academia

<!--
São basicamente caminhso que cada requisito pode tomar,
Siginifica ser as "restriçoes" das funcionalidades
(as validaçoes da applicação)
-->
## Regras de negocio (RN)

- [ ] O usuario não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuario só poderá fazer check in se estiver a menos de 100m da acadamia
- [ ] O usuario não pode fazer check-in de um check-in no mesmo dia
- [ ] O check-in so pode ser validado até 20 minutos após criado
- [ ] O check-in so pode ser validado por adiministradores
- [ ] A academia so pode ser cadastrada por adiministradores

<!--
Não partem do cliente (ele nao tem controle disso),
são topicos mais tecnicos, do que a nivel de
funcionalidade
-->
## Requisitos não funcionais (RNFs)

- [ ] A senha do usuario precisa esta criptografada
- [ ] Os dados da aplicação precisam esta persistidos em um banco de dados postgressSQL
- [ ] Todas as listas de dados devem estar paginadas com 20 items por pagina
- [ ] O usuario deve ser identificado por um JWT

Comando docker:

```sh
#Comando para criar um container postgresql
# esse comando tbm faz uma conexão da porta 5432 do seu pc com a 5432 do container
docker run --name std-node-solid-api-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

#CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS                          PORTS     NAMES
#d46177ba9cf7   bitnami/postgresql   "/opt/bitnami/script…"   2 minutes ago   Exited (0) About a minute ago             std-node-solid-api-pg
docker ps -a #Lista todas os containers que vc criou

docker start std-node-solid-api-pg #Comando para rodar o container novamente
docker stop std-node-solid-api-pg #comando para parar o container
docker rm std-node-solid-api-pg #Comando para apagar um container
docker logs std-node-solid-api-pg #Abre o console com os logs do container
docker logs std-node-solid-api-pg -follow #Abre o console com os logs do container em tempo real

# Usando docker compose
docker compose up -d # o `-d` faz rodar em background sem os logs
docker compose stop # comando para parar os containers porem sem apagar
docker compose down # comando para apagar os containers


npx prisma --init
npx prisma migrate dev
npx prisma studio
```
