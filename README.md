## NestJS-TypeORM Wallet API

#### Installation
```bash
# Copy .env.example to .env
cp env-example .env

# Install dependencies
npm install
```

#### Local Serve
```bash
# Run postgresql locally or on docker. For docker
docker run --name walletdb -e POSTGRES_DB=walletdb -e POSTGRES_USER=root -e POSTGRES_PASSWORD=12345678 -p 5432:5432 -d postgres

# Start app on dev mode
npm run start:dev
```

#### Docker Serve
```bash
docker-compose up
```

#### E2E Test
```bash
npm run test:e2e
```

#### Swagger Docs
```bash
http://localhost:3000/docs
```

Docker Hub : [https://hub.docker.com/r/ibayazit/nestjs-wallet-app](https://hub.docker.com/r/ibayazit/nestjs-wallet-app)
