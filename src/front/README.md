# TrackIT Front-End

Este documento detalha a estrutura, instalação, organização e boas práticas do projeto **TrackIT Front-End** para toda a equipe de desenvolvimento.

---

## Sumário

- [Instalação](#instalação)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Dependências e Ferramentas](#dependências-e-ferramentas)
- [Padrões de Código e Boas Práticas](#padrões-de-código-e-boas-práticas)
- [API Layer](#api-layer)
- [Componentização](#componentização)
- [Rotas](#rotas)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Testes e Debug](#testes-e-debug)
- [Dicas Gerais](#dicas-gerais)

---

## Instalação

No diretório `./src/front/trackit`, execute:

```bash
npm install
```

Para rodar o projeto localmente:

```bash
npm run dev
```

---

## Estrutura de Pastas

```
src/
├── assets/           # Imagens, ícones, fontes e arquivos estáticos
├── components/       # Componentes reutilizáveis do React
│   ├── ui/           # Componentes de interface (inputs, buttons, etc)
│   ├── params/       # Componentes de parâmetros/configurações
│   └── ...           # Outros domínios/componentes específicos
├── contexts/         # Context API para estados globais (ex: UserContext)
├── layouts/          # Layouts gerais (Sidebar, Navbar, etc)
├── lib/              # Configurações e bibliotecas (ex: ShadcnUI)
├── pages/            # Páginas da aplicação (cada rota principal)
│   ├── assign-tickets/
│   ├── my-tickets/
│   ├── open-ticket/
│   ├── params/
│   ├── user-tickets/
│   └── ...
├── routes/           # Definição das rotas da aplicação
├── services/         # (Opcional) Serviços utilitários ou integrações
├── styles/           # Arquivos de estilização global (CSS, Tailwind)
├── utils/            # Funções utilitárias e helpers
├── api/              # Camada de consumo da API RESTful (ver abaixo)
├── App.tsx           # Componente principal da aplicação
└── main.tsx          # Ponto de entrada do React
```

---

## Fluxo de Desenvolvimento

1. **Crie uma branch para sua feature ou correção.**
2. **Implemente a feature seguindo a estrutura acima.**
3. **Garanta que os componentes sejam reutilizáveis e tipados.**
4. **Faça commits claros e objetivos.**
5. **Abra um Pull Request para revisão.**
6. **Após aprovação, faça o merge na branch principal.**

---

## Dependências e Ferramentas

- **React + TypeScript**: Base do projeto.
- **React Router**: Gerenciamento de rotas SPA.
- **Tailwind CSS**: Utilitários CSS para estilização.
- **ShadcnUI**: Componentes React pré-construídos (importação via CLI).
- **React Icons**: Ícones SVG como componentes React.
- **ESLint + Husky**: Padrão de código e hooks de commit.
- **Zod**: Validação de schemas e formulários.
- **React Hook Form**: Gerenciamento de formulários.
- **Phosphor Icons**: Ícones adicionais.

---

## Padrões de Código e Boas Práticas

- **Componentes funcionais e hooks sempre que possível.**
- **Use TypeScript para tipagem forte.**
- **Componentes pequenos, focados em uma responsabilidade.**
- **Separe componentes de layout dos de negócio.**
- **Utilize pastas internas para componentes específicos.**
- **Nunca faça fetch direto nos componentes, use a camada `api/`.**
- **Trate erros de API nos componentes para feedback ao usuário.**
- **Siga o padrão de nomenclatura e organização das pastas.**

---

## API Layer

A pasta `api/` centraliza todas as funções responsáveis por consumir a API RESTful do backend. Cada arquivo representa um domínio/recurso da aplicação (ex: usuários, tipos de chamados, status, etc.), facilitando a manutenção, reutilização e padronização das chamadas HTTP.

- **Responsabilidade única:** Cada arquivo trata apenas de um recurso/domínio.
- **Padronização:** Todas as funções retornam Promises e utilizam o padrão RESTful de endpoints.
- **Tipagem:** As funções são tipadas com TypeScript.
- **Exemplo de uso:**

```typescript
import { getAllUsers, registerNewUser } from "@/api/users";

async function exemplo() {
  const users = await getAllUsers();
  await registerNewUser({ /* dados do usuário */ });
}
```

---

## Componentização

- **Componentes UI:** Inputs, botões, selects, modais, alerts, etc. ficam em `components/ui/`.
- **Componentes de domínio:** Tabelas, formulários, filtros, etc. ficam em subpastas de `components/` ou `pages/`.
- **Componentes de contexto:** Estados globais (ex: usuário logado) ficam em `contexts/`.

---

## Rotas

- Definidas em `src/routes/Router.tsx`.
- Utiliza `react-router-dom` para navegação SPA.
- Rotas protegidas por tipo de usuário (admin, analista, usuário).
- Cada rota principal aponta para um componente/página em `pages/`.

---

## Ambiente de Desenvolvimento

- **Variáveis de ambiente:** Configure variáveis sensíveis em `.env` na raiz do projeto.
- **Senhas padrão:** Veja instruções nos comentários dos componentes de criação de usuário.
- **Lint:** Rode `npm run lint --fix` para garantir padrões de código.
- **Husky:** Hooks de commit para garantir qualidade do código.

---

## Testes e Debug

- **Lint:** `npm run lint --fix`
- **Debug:** Utilize o console do navegador e o console do Node para logs.
- **Validação:** Utilize Zod para validação de formulários e dados.

---

## Dicas Gerais

- **Consulte a documentação das bibliotecas utilizadas:**
  - [React Router](https://reactrouter.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [ShadcnUI](https://ui.shadcn.com/)
  - [React Icons](https://react-icons.github.io/react-icons/)
- **Consulte o Figma para padrões visuais e cores.**
- **Siga as issues do GitHub para orientações de features.**
- **Mantenha a branch principal estável.**
- **Faça code reviews antes de mergear.**

---

## Observações

- Sempre consulte este README antes de iniciar uma nova feature.
- Dúvidas sobre arquitetura ou padrões? Consulte o time ou os arquivos de documentação do projeto.
