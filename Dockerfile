FROM node:20.9.0 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.9.0 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --only=prod

FROM node:20.9.0 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
CMD [ "node" , "run", "dev" ]