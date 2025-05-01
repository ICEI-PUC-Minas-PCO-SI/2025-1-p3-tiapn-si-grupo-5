
# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes).

 ## User flow

Fluxo de usuário (user flow) é uma técnica que permite ao desenvolvedor mapear todo o fluxo de navegação do usuário na aplicação. Essa técnica serve para alinhar os caminhos e as possíveis ações que o usuário pode realizar junto com os membros da equipe.

![Exemplo de user flow](images/user_flow.jpg)

### Diagrama de fluxo

O diagrama apresenta o estudo do fluxo de interação do usuário com o sistema interativo, muitas vezes sem a necessidade de desenhar o design das telas da interface. Isso permite que o design das interações seja bem planejado e tenha impacto na qualidade do design do wireframe interativo que será desenvolvido logo em seguida.

O diagrama de fluxo pode ser desenvolvido com “boxes” que possuem, internamente, a indicação dos principais elementos de interface — tais como menus e acessos — e funcionalidades, como editar, pesquisar, filtrar e configurar, além da conexão entre esses boxes a partir do processo de interação.


## Wireframes

O wireframe do projeto pode ser visualizado na íntegra através do protótipo interativo no Figma: [Protótipo via Figma](https://www.figma.com/design/mQ01IKXNd8l9l0xQwxCgcQ/wireframe-trackit?node-id=0-1&t=4R3iXTh5kUjHYW4C-1)

## Interface do sistema e telas principais do sistema

As interfaces do sistema seguem um padrão bem definido e organizado. Todas as tela são compostas por uma sidebar expandível que contém as operações que o usuário pode realizar dentro do sistema.

Seguem respectivamente as telas de home para os 3 perfis do sistema: cliente, analista e gestor. As telas de home possuem um botão CTA (call to action), instruindo o determinado perfil de usuário para realizar a principal ação dentro do sistema.

![Home cliente](./images/home-cliente-logado.svg)
![Home analista](./images/home-analista-logado.svg)
![Home cliente](./images/home-gestor-logado.svg)

##  Telas do processo

### Abertura de chamado

![Abertura de chamado](./images/home-cliente-abrir-chamado.svg)

O cliente deve preencher as informações do formulário para conseguir abrir o chamado. Ao criá-lo, o sistema gera automaticamente um número de protocolo, salva no banco de dados e adiciona a fila de chamados não atribuídos, para que os analistas consigam visualizar e atribuir.

![Visualização dos chamados - Cliente](./images/home-cliente-ver-chamados.svg)

O cliente pode visualizar os chamados abertos por ele, de modo a ter uma visão global de quais atendimentos ainda estão pendentes.

![Chat com analista](./images/home-ticket-detalhes.svg)

O cliente tem à disposição um chat interativo com o analista, de modo que pode conversar e enviar anexos para que a demanda possa ser solucionada.

