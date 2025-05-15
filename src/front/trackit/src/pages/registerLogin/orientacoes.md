# Orientações de Padrão para Interfaces, Formulários e Tipagens

## 1. Estrutura de Interface

- **Layout:** Utilize sempre containers flexíveis (`flex`, `flex-col`, `gap-x-*`, `gap-y-*`, `items-center`, `justify-center`, etc.) para garantir responsividade e alinhamento.
- **Componentização:** Separe cada parte da interface em componentes reutilizáveis (ex: `<LoginUser />`, `<Input />`, `<Button />`).
- **Estilização:** Prefira classes utilitárias do TailwindCSS para espaçamento, cores, fontes e responsividade. Para estilos globais ou padrões, utilize o arquivo `index.css`.

## 2. Formulários

- **Gerenciamento:** Use sempre o `react-hook-form` para controle de formulários.
- **Validação:** Utilize o `zod` para schemas de validação e o `@hookform/resolvers/zod` para integração com o `react-hook-form`.
- **Exemplo de uso:**

  ```tsx
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";

  const schema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  ```

- **Exibição de erros:** Sempre exiba mensagens de erro abaixo dos campos, usando o objeto `errors` do `formState`.

## 3. Tipagens

- **Inferência automática:** Sempre derive o tipo do formulário a partir do schema do Zod usando `z.infer<typeof schema>`.
- **Exemplo:**
  ```tsx
  type LoginForm = z.infer<typeof loginSchema>;
  ```

## 4. Inputs e Botões

- **Inputs:** Utilize o componente `<Input />` customizado, passando o `register` do `react-hook-form` via spread:
  ```tsx
  <Input {...register("email")} placeholder="Digite seu e-mail" />
  ```
- **Botões:** Use o componente `<Button />` do ShadcnUI, que já está estilizado com fonte Poppins, tamanho e peso padrão.

## 5. Validação de Senha

- **Padrão:** Senha deve ter no mínimo 8 caracteres, pelo menos uma letra e um número.
- **Regex usado:**
  ```js
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  ```

## 6. Organização de Componentes

- **Separação:** Cada formulário deve ser um componente próprio, com seu schema, tipo e lógica de submit.
- **Exemplo de estrutura:**
  ```
  src/components/
    LoginUser.tsx
    RegisterUser.tsx
    ...
  ```

## 7. Mensagens de Erro

- **Padrão:** Mensagens de erro devem ser claras e exibidas em vermelho logo abaixo do campo correspondente.
- **Exemplo:**
  ```tsx
  {
    errors.email && (
      <span className="text-red-500 text-sm">{errors.email.message}</span>
    );
  }
  ```

## 8. Navegação

- **Links:** Use o componente `<Link />` do React Router, com classes utilitárias para alinhamento e espaçamento (`block w-full text-right`, etc).

## 9. Fontes e Estilo

- **Fontes:** Utilize as fontes importadas no CSS global (`Inter` para textos, `Poppins` para botões).
- **Classes customizadas:** Para títulos, parágrafos e botões, utilize as classes customizadas do CSS global quando necessário.

---

## Resumo do Fluxo para Novas Telas/Formulários

1. Crie um componente para o formulário.
2. Defina o schema de validação com Zod.
3. Derive o tipo do formulário a partir do schema.
4. Use `useForm` com o resolver do Zod.
5. Utilize `<Input />` e `<Button />` customizados.
6. Exiba mensagens de erro abaixo dos campos.
7. Siga o padrão de layout e estilização já utilizado nas telas existentes.

---
