# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia solo los archivos de dependencias
COPY package.json package-lock.json ./

# 2. Instala dependencias PRIMERO sin ag-grid-svelte
RUN npm install --legacy-peer-deps --force

# 3. Ahora instala Tailwind y compañía
RUN npm install -D tailwindcss postcss autoprefixer && \
    npx tailwindcss init -p

# 4. Copia el resto y construye
COPY . .
RUN npm run build

# --- Etapa de producción ---
FROM nginx:alpine

# Copia los archivos estáticos (SvelteKit adapter-static)
COPY --from=builder /app/build /usr/share/nginx/html

# Configuración de Nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]