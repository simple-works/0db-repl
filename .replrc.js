//==============================================================================
// ■ .REPLRC (.replrc.js)
//------------------------------------------------------------------------------
//     Local-REPL configuration.
//==============================================================================
require("colors");
const $0db = require("0db");
const faker = require("faker");

//------------------------------------------------------------------------------
// ● REPL-Context
//------------------------------------------------------------------------------
const context = {
  $0db,
  db: $0db(),
  faker,
  gen: gen(),
  cls,
  help,
};
const contextHelp = {
  $0db: "0db object",
  db: "Default instance (./db.json)",
  faker: "Fake data generator (See: https://npmjs.com/package/faker)",
  gen: "Built-in example data objects generator (using faker)",
  cls: "Clears screen",
  help: "Shows this help message",
};
function help(name = "") {
  if (!name) {
    _logContext(context);
  }
  _logContextHelp(context, contextHelp, name);
  return "==================================================";
}

//------------------------------------------------------------------------------
// ● Data-Objects-Generator
//------------------------------------------------------------------------------
function gen() {
  return {
    user(count = 1) {
      if (count < 1) count = 1;
      const users = [];
      for (let i = 0; i < count; i++) {
        const { name, internet, datatype } = faker;
        const gender = name.gender("binary");
        const firstName = name.firstName(gender);
        const lastName = name.lastName(gender);
        users[i] = {
          name: internet.userName(firstName, lastName),
          firstName: name.firstName(gender),
          lastName: name.lastName(gender),
          gender,
          email: internet.email(firstName, lastName),
          password: internet.password(),
          points: datatype.number({ min: 0, max: 8000 }),
        };
      }
      return users.length === 1 ? users[0] : users;
    },
    note(author, count = 1) {
      if (count < 1) count = 1;
      if (!author) author = "/** Put here the $id of some existent user **/";
      const notes = [];
      for (let i = 0; i < count; i++) {
        notes[i] = {
          author,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
        };
      }
      return notes.length === 1 ? notes[0] : notes;
    },
  };
}

//------------------------------------------------------------------------------
// ● REPL-Prompt
//------------------------------------------------------------------------------
function prompt(context, package) {
  return "[0db] ► ";
}

//------------------------------------------------------------------------------
// ● REPL-Banner
//------------------------------------------------------------------------------
function banner(context, package) {
  cls();
  _logPackage(package);
  _logContext(context);
  console.log();
}

//------------------------------------------------------------------------------
// ● Clear-Console
//------------------------------------------------------------------------------
function cls() {
  const readline = require("readline");
  console.log("\n".repeat(process.stdout.rows));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
  console.clear();
  return "Console cleared.";
}

//------------------------------------------------------------------------------
// ● Helpers
//------------------------------------------------------------------------------
function _logContext(context) {
  const vars = Object.keys(context).join(", ");
  console.log("● Context variables:", `${vars}`.green);
}
function _logContextHelp(context, contextHelp, name) {
  const filter = name ? (key) => key === name : (key) => true;
  const keys = Object.keys(context).filter(filter);
  if (keys.length) {
    for (const key of keys) {
      console.log(`\t• ${key.green}: ${contextHelp[key]}.`);
    }
  } else {
    console.log(`\t${name.red} object does not exist in the built-in context.`);
  }
}
function _logPackage(package) {
  const { name, version, description } = package;
  console.log(
    "♛ Welcome to",
    `${name}@${version}`.blue,
    `✎ ${description}`.grey
  );
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  context,
  prompt,
  banner,
  cls,
  enableAwait: true,
};
