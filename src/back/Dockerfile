# Use imagem oficial do Node.js
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /back

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera Prisma Client (se necessário)
RUN npx prisma generate

# Faz build do projeto
RUN npm run build

# Expõe a porta usada pelo backend
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "run", "start"]
