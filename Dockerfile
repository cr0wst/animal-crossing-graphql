FROM node:lts-alpine as development

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:watch"]

# Build and Run Tests
FROM node:lts-alpine as builder

COPY --from=development /app /app

WORKDIR /app

RUN npm run build

# Build Production Image
FROM node:lts-alpine as production

WORKDIR /app

COPY --from=builder ./app/dist ./dist

COPY package* ./

RUN npm install --only=production

CMD ["npm", "start"]