FROM node:20.9.0 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.9.0 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --only=prod

FROM node:20.9.0 as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "dev" ]