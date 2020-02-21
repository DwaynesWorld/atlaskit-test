module.exports = {
  helpers: {
    useYarn: () => {
      const { existsSync } = require("fs");
      const { join } = require("path");
      return existsSync(join(process.cwd(), "yarn.lock"));
    }
  },
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {};
    const execa = require("execa").shell(action, opts);
    execa.stdout.pipe(process.stdout);
    return execa;
  }
};
