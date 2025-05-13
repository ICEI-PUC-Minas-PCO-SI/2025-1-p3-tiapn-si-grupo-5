## Configurando o Front-End
### Instalando dependências

Para instalar as dependências do projeto automaticamente, basta rodar, no diretório `./src/front/trackit`:

```bash
npm i
```

### Estrutura de Pastas

src/
├── assets/       # Imagens, ícones, fontes e outros arquivos estáticos.
├── components/   # Componentes reutilizáveis do React.
├── contexts/     # Context API para gerenciamento de estados globais.
├── hooks/        # Custom Hooks reutilizáveis.
├── layouts/      # Componentes de layout geral (Sidebar, Navbar, etc).
├── lib/          # Configurações e bibliotecas (ex: configuração do ShadcnUI).
├── pages/        # Páginas da aplicação.
├── routes/       # Definição das rotas da aplicação.
├── services/     # Consumo de APIs e integração com o backend.
├── styles/       # Arquivos de estilização global (CSS, Tailwind).
├── utils/        # Funções utilitárias e helpers.
└── App.tsx       # Componente principal da aplicação.
└── main.tsx      # Ponto de entrada do React.

### Dependências instaladas

- [React Router](https://reactrouter.com/home): Gerenciamento de rotas em SPA.
- [Tailwind](https://tailwindcss.com/): Framework de utilitários CSS para estilização.
- [ShadcnUI](https://ui.shadcn.com/): Biblioteca com componentes React pré-construídos utilizando Tailwind.
- [Husky](https://typicode.github.io/husky/): Ferramenta para hooks de git (controle de commits).

## Explicando sobre as dependências

### ESLint com Husky

O projeto está configurado com o [ESLint](https://eslint.org/docs/latest/), ele é uma ferramenta de análise de código estático para JavaScript e TypeScript. Em aplicações React com TypeScript, o ESLint é configurado para identificar problemas de estilo, erros de sintaxe e potenciais bugs no seu código, garantindo a consistência e a qualidade do projeto. Ele se integra com o TypeScript para entender a tipagem estática e aplicar regras específicas para código TypeScript e React, ajudando a manter um código limpo e seguindo as melhores práticas. Pode ser verificado em `trackit/eslint.config.js`.

Nesse sentido, o Husky é uma ferramenta que permite executar scripts Node.js em hooks Git. Ele usa o ESLint configurado no seu projeto React com TypeScript ao interceptar eventos do Git, como o `pre-commit`. Dessa forma, antes de permitir um commit, o Husky executa o ESLint nos arquivos que você está tentando commitar. Se o ESLint encontrar algum erro ou warning que viole as regras definidas, o Husky impede o commit, garantindo que apenas código validado seja integrado ao repositório.

Aparentemente está com problemas na hora do commit, era pra chamar o comando `npx lint-staged`, que utiliza uma outra biblioteca para que só sejam verificados os arquivos em stage. Entretanto, essa verificação não acontece, portanto, para verificar se os componentes e/ou lógicas desenvolvidas possuem problemas de sintaxe, pode rodar o seguinte comando:

```bash
npm run lint --fix
```
### Utilização dos componentes do ShadCNUI

Os componentes da aplicação devem ser construídos com base nos componentes pré-prontos da biblioteca. A importação deles deve ser feita através da CLI, conforme documentação do [ShadCNUI](https://ui.shadcn.com/docs/componentS/). É ensinado o passo a passo das importações. As cores estão no layoult do [Figma](https://www.figma.com/design/mQ01IKXNd8l9l0xQwxCgcQ/wireframe-trackit?node-id=0-1&t=2bcxI0IfRlNEfzNN-1), ele compartilha os mesmos estilos do ShadCNUI, porém adaptações tanto em componentes, quanto em estilos e cores devem ser feitas para atender as necessidades da aplicação.

Para além disso, os ícones devem ser importados como componentes React através da biblioteca react-icons, a qual já está instalada. A importação para código pode ser feita conforme documentação do [React-Icons](https://react-icons.github.io/react-icons/)

### Especificações das Features

Um guia do que fazer para cada feature estará nas issues do GitHub.