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
