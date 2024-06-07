# cse110-sp24-group2

## [Team Wiki](../team.md)

## Running the App

1. Make sure that the root package.json looks like this:

```json
{
  "name": "dev_journal",
  "version": "1.0.0",
  "description": "A Developer Journal That tracks what you do in a day",
  "main": "source/main.js",
  "devDependencies": {
    "@wdio/cli": "^8.38.1",
    "@wdio/local-runner": "^8.38.0",
    "@wdio/mocha-framework": "^8.38.0",
    "@wdio/spec-reporter": "^8.38.0",
    "electron": "^30.0.9",
    "electron-packager": "^17.1.2",
    "jest": "^29.7.0",
    "jsdoc": "^4.0.3",
    "prettier": "3.2.5",
    "wdio-electron-service": "^6.6.1"
  },
  "scripts": {
    "test": "node node_modules/jest/bin/jest.js",
    "start": "electron .",
    "package-win": "electron-packager . DevJournal --platform=win32 --arch=x64 --asar",
    "package-mac": "electron-packager . DevJournal --platform=darwin --arch=x64 --asar",
    "package-linux": "electron-packager . DevJournal --platform=linux --arch=x64 --asar",
    "wdio": "wdio run ./wdio.conf.js"
  },
  "jest": {
    "transform": {},
    "verbose": true
  }
}
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Depending on which device you have, run one of the following commands:

```bash
npm run package-win
npm run package-mac
npm run package-linux
```

4. Run the app:

```bash
npm start
```

## Linting

### TLDR:

- `npx prettier . --w` to run the linter and overwrite files (for formatting)
- `npx prettier . --check` to run the linter but not overwrite files
- Files should also format on autosave. Use `CMD-P` on Mac or `CTRL-P` on windows to navigate to `.vscode/settings.json` to edit prettier rules.

Make sure `npx prettier . --check` does not show any unformatted files before pushing.

### If you use other linters in other projects...

- Go to the extensions tab and click "disable in workspace" for all non-prettier extensions
- `CTRL-SHIFT-P` and type "Preferences: Open Workspace Settings (JSON)". Click it, it should make / take you to `settings.json`
- Paste the following inside:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Documentation:

[Prettier Docs](https://prettier.io/docs/en/cli.html)

### Archive:

- `npx eslint` to check files that violate eslint (code quality / potential bugs)
  - Need to run `npx eslint` inside the source directory. Use `cd source` if necesasry
