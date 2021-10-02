const $0db = require("0db");
const { prompt, banner, cls } = require("./core");

module.exports = {
  context: {
    $0db,
    db: $0db(),
    cls,
  },
  enableAwait: true,
  prompt,
  banner,
};
