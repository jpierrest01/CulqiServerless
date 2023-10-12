# Reto - culqui

## Features

- [TypeScript](https://www.typescriptlang.org/) (v5)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Serverless Framework](https://www.serverless.com/)
- [ESLint](https://eslint.org/) including ESLint's recommended rules, Import plugin and more
  - [Typescript ESlint](https://typescript-eslint.io/)
  - [Jest plugin](https://www.npmjs.com/package/eslint-plugin-jest)
- [Jest](https://jestjs.io)
<!-- - [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push -->

## Setup

```
# Once located in the root of the project (create env files from '.env.example' file)
cp .env.example .env && cp .env.example .env.qa && cp .env.example .env.development

# install dependencies
npm install

# install serverless
npm install -g serverless
```

## Running the app

```
# run in development mode (on port 3000 by default)
npm run dev

# generate build
npm run build
```

## Serverless framework

```
# install serverless
npm install -g serverless

# run lambda locally
serverless offline --stage <stage-name>

# deploy lambda
serverless deploy --stage <stage-name>
```

> Available stages: `dev`, `qa`, `prod`

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```
