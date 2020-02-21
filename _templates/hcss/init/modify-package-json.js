const { resolve } = require("path");
const { writeFileSync } = require("fs");

const packageJsonPath = resolve(__dirname, "../../../package.json");

const packageJson = require(packageJsonPath);

// modify init script
packageJson.scripts["hcss-init"] =
  "echo \"This project has already been initialized. Use 'yarn start' or 'npm start' instead. You can remove this script from package.json.\"";
// add bare script
packageJson.scripts["hcss-bare"] =
  "cross-env HYGEN_OVERWRITE=1 hygen hcss bare && echo \"Initialization finished. Run 'yarn start' or 'npm start'.\"";

// move dependencies to devDependencies
const devDeps = Object.keys(packageJson.dependencies).filter(dep => {
  if (dep.includes("@testing")) return true;
  if (dep.includes("@types")) return true;
  if (dep.includes("hygen")) return true;
  if (dep.includes("typescript")) return true;
  if (dep.includes("cross-env")) return true;
  if (dep.includes("rimraf")) return true;
  if (dep.includes("react-scripts")) return true;

  return false;
});

packageJson.devDependencies = {};

devDeps.forEach(key => {
  packageJson.devDependencies[key] = packageJson.dependencies[key];
  delete packageJson.dependencies[key];
});

writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 2));
