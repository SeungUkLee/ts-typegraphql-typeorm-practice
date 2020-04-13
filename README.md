we need to have a schema that defines out types, mutations and queries with SDL.
그런 다음 스키마 값을 위한 resolver 를 작성. 또한 DB의 테이터를 나타내는 ORM 모델을 정의해야한다.
모델에서 정의한 필드는 스키마를 준수해야한다. 그렇지 않으면 작동하지 않는다.

이러한 접근 방식은 유지관리가 어렵다는 문제가 있다. 데이터에서 필드를 수정하려면 DB 모델 클래스와 GraphQL 스키마를 변경하고
type interface (if using typescript)를 조정해야한다.
그러나 이 tutorial 에서는 TypeGraphQL 및 TypeORM 을 사용하여 GraphQL API 를 좀 더 재밌게(?) 작성하는 방법을 보여준다.

TypeGraphQL 은 Node.js and Typescript 를 사용하여 GraphQL API 를 빌드하기위한 프레임워크이다.
이 툴은 우리의 스키마를 직관적으로 정의할 수 있게 해준다.

TypeORM 은 SQL 데이터베이스와 상호작용할 수 있는 라이브러리이다. 이러한 툴들을 결합하여 어려움 없이 type-safe 한 GraphQL API 를 구출할 수 있다.

## Getting Started

```bash
$ npm init -y
$ npm install apollo-server type-graphql typeorm reflect-metadata
$ npm install -D typescript ts-node nodemon
```

* `apollo-server` - build and run out GraphQL Server
* `type-graphql` - generate our schema from TypeScript classes
* `typeorm` - interact with our SQL database
* `reflect-metadata` - TypeScript decorators

* `typescript` - compile out code to plain javscript
* `ts-node` - run our server in development env
* `nodemon` - automatically restart the server

```json
// package.json
{
  // ...
  "scripts": {
     "start": "nodemon -w src --ext ts --exec ts-node src/index.ts"
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions":{
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
  }
}
```

## Setting up a GraphQL Server


## Database configuration

TypeORM 에 사용할 데이터베이스 종류와 엑세스 방법을 알려주는 database configuration 을 정의해야한다.
여러가지 방법이 있는데 여기서는 `ormconfig.json` 을 만들어서 사용한다.

MySQL, PostgreSQL 등 여러가지 데이터베이스를 사용할 수 있지만 여기서는 SQLite 를 사용한다.

``` bash
$ npm install sqlite3
```

```json
// ormconfig.json
{
  "type": "sqlite",
  "database": "./db.sqlite3",
  "entities": ["./src/models/*.ts"],
  "synchronize": true
}
```

## Resolvers

GraphQL 리졸버를 빌드하기 위해 먼저 GraphQL Schema language 를 사용하여 스키마에서 mutations, queries, and other object 를 정의한다.

리졸버는 일반적으로 single object 에 매핑되는 collection of functions 이며 앞에서 정의한 스키마와 일치해야한다.
이러한 방법은 스키마와 리졸버를 별도의 위치에 정의해야되서 복잡해보인다.

그러나 TypeGraphQL 을 사용하면 스키마를 명시적으로 작성할 필요가 없다.
타입스크립트 클래스와 데코레이터로 리졸버를 정의하면 TypeGraphQL 이 스키마를 생성한다.

## Models
model 은 데이터베이스의 특정 테이블과 상호작용할 수 있는 클래스이다. TypeORM을 사용하려면 리졸버와 마찬가지로 클래스 및 데코레이터를 사용하여 데이터베이스 모델을 정의할 수 있다.

## Object types
GraphQL 에서 모든 query and mutation 은 객체가 boolean, string or a custom object 와 상관없이 객체를 반환한다. 모델과 마찬가지로 클래스와 데코레이터를 사용하여
object types 를 간단히 정의할 수 있다.

TypeGraphQL 과 TypeORM 데코레이터를 single TypeScript 클래스에 결합할 수 있다. 이런 식으로 GraphQL object type 과 데이터베이스 모델을 모두 나타내는 클래스를 가질 수 있다.
(`src/models/Book.ts` 참고) 

한 곳에서 single data type 을 정의하므로 property inconsistency errors 를 줄일 수 있다.

`isPublished` property 를 `published` 업데이트하려고 한다고 하자. 일반적으로 기본 GraphQL schema language 를 사용하는 경우 데이터베이스 모델과
 GraphQL 스키마 모두에서 data type 을 정의해야한다. 그러나 데코레이터를 사용하면 클래스의 속성을 간단히 업데이트하여 스키마와 모델을 모두 업데이트할 수 있다.
 
## Database CRUD

## Conclusion
TypeGraphQL 은 타입스크립트와 함께 GraphQL API 를 개발할 때 발생하는 문제점들을 해결하는데 도움을 준다.
GraphQL API 를 빌드할떄 보다 깨끗하고 안전한 방법을 제공하며 동일한 작업을 반복하지 않도록 한다.

TypeORM 을 사용하면 데이터베이스 모델을 정의하는데 동일한 접근 방식이 사용되므로 유용하다.

---

## Reference

[How to build a GraphQL API with TypeGraphQL and TypeORM
](https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/) 
