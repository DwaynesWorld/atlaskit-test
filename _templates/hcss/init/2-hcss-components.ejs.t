---
sh: "cd <%= cwd %> && <%= h.useYarn() ? 'yarn add hcss-components' : 'npm install hcss-components --save' %> --registry=https://pkgs.dev.azure.com/hcss/_packaging/HCSS/npm/registry/"
---