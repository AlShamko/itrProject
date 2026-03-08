FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm config set side-effects-cache false
RUN pnpm install --unsafe-perm
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]