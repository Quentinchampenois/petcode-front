# ---- Build Stage ----
FROM --platform=linux/amd64 node:18 AS x86_64-builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Build Stage ----
FROM --platform=linux/arm64 node:18 AS arm64-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM --platform=linux/arm64 nginx:alpine AS arm64-nginx
COPY --from=arm64-builder /app/build /usr/share/nginx/html
RUN apk add --no-cache py-pip && pip install j2cli
COPY dist/nginx.conf.j2 /etc/nginx/conf.d/nginx.conf.j2
COPY dist/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]

# ---- Production Stage ----
FROM nginx:alpine AS production
COPY --from=x86_64-builder /app/build /usr/share/nginx/html
RUN apk add --no-cache py-pip && pip install j2cli
COPY dist/nginx.conf.j2 /etc/nginx/conf.d/nginx.conf.j2
COPY dist/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]