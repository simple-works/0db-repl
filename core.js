//==============================================================================
// ■ Core (core.js)
//------------------------------------------------------------------------------
//     Core functions.
//==============================================================================
require("colors");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { prompt, banner, cls };

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
  const { name, version, description } = package;
  console.log(
    "♛ Welcome to",
    `${name}@${version}`.blue,
    `✎ ${description}`.grey
  );
  const vars = Object.keys(context).join(", ");
  console.log("● Context variables:", `${vars}`.green);
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
};