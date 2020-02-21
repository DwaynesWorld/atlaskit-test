const { resolve } = require("path");
const { writeFileSync } = require("fs");

const packageJsonPath = resolve(__dirname, "../../../package.json");

const packageJson = require(packageJsonPath);

delete packageJson.scripts["hcss-init"];
delete packageJson.scripts["hcss-bare"];
delete packageJson.dependencies["react-localization"];

writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 2));
