const { resolve } = require("path");
const rimraf = require("rimraf");

const srcDir = resolve(__dirname, "../../../src");
rimraf.sync(srcDir);
