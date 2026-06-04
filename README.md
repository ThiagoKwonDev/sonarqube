# AvisaAqui API

Backend da aplicação AvisaAqui, construído com NestJS.

## Pré-requisitos

- Node.js 22.x
- Docker

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd AvisaAqui_API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando Localmente

1. Execute o PostgreSQL usando Docker:
   ```bash
   docker run -d --name avisaaqui-postgres -p 5432:5432 -e POSTGRES_DB=avisaaqui -e POSTGRES_USER=avisaaqui_user -e POSTGRES_PASSWORD=avisaaqui_password postgres:13-alpine
   ```

O backend já está configurado para se conectar a esse banco usando os valores padrão abaixo:

- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USER=avisaaqui_user`
- `DB_PASSWORD=avisaaqui_password`
- `DB_NAME=avisaaqui`

2. Execute a aplicação em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```

A API estará disponível em `http://localhost:3000`.

## Testes

```bash
npm run test
```
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
