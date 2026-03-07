FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npx prisma generate
EXPOSE 5173
CMD ["pnpm", "run", "dev"]