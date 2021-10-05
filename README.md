# 🅾️ 0db REPL

[![NPM version](https://badge.fury.io/js/0db.svg)](https://npmjs.org/package/0db-repl)
[![NodeJS](https://img.shields.io/badge/node-blue?logo=node.js)](https://github.com/topics/node)
[![JavaScript](https://img.shields.io/badge/javascript-blue?logo=javascript)](https://github.com/topics/javascript)
[![Web](https://img.shields.io/badge/web-blue?logo=w3c)](https://github.com/topics/web)

REPL playground for testing [**0db**](https://github.com/Ambratolm/0db).

> This is a nodeJS REPL that comes with some handy context variables to easily play around with 0db on the command line.

![Screenshot](./screenshot.gif?raw=true)

<!-- toc -->

- [📥 Installation](#%F0%9F%93%A5-installation)
- [ℹ️ Usage](#%E2%84%B9%EF%B8%8F-usage)
  - [Context Variables:](#context-variables)
    - [`$0db`](#0db)
    - [`db`](#db)
    - [`faker`](#faker)
    - [`gen`](#gen)
    - [`cls`](#cls)
    - [`help`](#help)
- [🚀 Development](#%F0%9F%9A%80-development)
  - [🏭 Environment](#%F0%9F%8F%AD-environment)
  - [🌑 Application](#%F0%9F%8C%91-application)
- [📃 License](#%F0%9F%93%83-license)

<!-- tocstop -->

## 📥 Installation

```bash
npm i 0db-repl -g
```

## ℹ️ Usage

Launch using:

```bash
0db
```

Type `help()` to see a description of all available context variables.

### Context Variables:

Context variables are objects and functions that are already defined and available for usage during the REPL session.

#### `$0db`

[0db](https://github.com/Ambratolm/0db) object.

🎯 Example:

```js
► const myDb = await $0db("my-db.json")
```

#### `db`

A default instance using the default file `./db.json` ready for use.

🎯 Example:

```js
► await db("users").create({ name: "ambratolm" })
```

#### `faker`

Fake data generator to generate some realistic mock data. (See: [Faker.JS](https://npmjs.com/package/faker))

🎯 Example:

```js
► faker.name.firstName()
► faker.name.lastName()
► faker.name.gender()
► faker.internet.userName()
► faker.internet.email()
► faker.internet.password()
```

```js
► await db("users").create({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  })
```

#### `gen`

Built-in example data objects generator (using faker) that has some functions to generate example objects that can be added to database.

- `gen.user(count?)` : Generates `user` objects.

  - Parameters:
    - `count` : Number, _Optional_. Number of objects to generate. **Default: 1**.
  - Returns an **object** if `count <= 1`, else an **array** of objects.

  `user` object is based on this schema:

  ```js
  {
    name: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    password: String,
    points: Number
  }
  ```

  🎯 Example:

  ```js
  ► gen.user() // Returns 1 user object
  ► gen.user(100) // Returns an array of 100 user objects
  ```

  ```js
  ► await db("users").create(gen.user())
  ```

- `gen.note(author?, count?)` : Generates `note` objects.

  - Parameters:
    - `author` : String, _Optional_. Identifier for the author of the note (Expected to be the `$id` field of a created `user` object that exists in database).
    - `count` : Number, _Optional_. Number of objects to generate. **Default: 1**.
  - Returns an **object** if `count <= 1`, else an **array** of objects.

  `note` object is based on this schema:

  ```js
  {
    author: String,
    title: String,
    content: String
  }
  ```

  🎯 Example:

  ```js
  ► const user = await db("users").create(gen.user()) // Create a user item
  ► gen.note(user.$id) // Returns 1 note object
  ► gen.note(user.$id, 100) // Returns an array of 100 note objects
  ```

  ```js
  ► const user = await db("users").create(gen.user())
  ► await db("notes").create(gen.note(user.$id))
  ```

#### `cls`

Clears screen.

🎯 Example:

```js
► cls()
```

#### `help`

Shows a description of all context variables.

- Parameters:
  - `name` : String, _Optional_. Name of a specific context object or function to show description for.

🎯 Example:

```js
► help() // Shows all descriptions
► help("db") // Shows description only for "db" function
► help("gen") // Shows description only for "gen" object
```

## 🚀 Development

1. Clone the repository.

   ```bash
   cd somewhere
   git clone https://github.com/practical-works/0db-repl.git
   cd 0db-repl
   ```

2. Install dependencies: `npm i`

3. Run:
   - `npm run dev` for development.
   - `npm start` for production.

💡 In development, you can type `rs` to manually restart. (See: [Nodemon](https://www.npmjs.com/package/nodemon))

### 🏭 Environment

- Runtime: [**NodeJS**](https://github.com/nodejs)
- Package Manager: [**NPM**](https://github.com/npm)
- Editor: [**Sublime Text**](https://www.sublimetext.com)

### 🌑 Application

- ⚛️ Core:
  - Main: [**NodeJS**](https://github.com/nodejs/node) / [**0db**](https://github.com/Ambratolm/0db)
  - REPL: [**Local-REPL**](https://github.com/sloria/local-repl)
- 🔧 Utils:
  - Mock Data Generation: [**Faker.JS**](https://github.com/Marak/Faker.js)
  - Console Colors: [**Colors**](https://github.com/Marak/colors.js)

## 📃 License

Licensed under [MIT](./LICENSE).
