# cse110-sp24-group2

## [Team Wiki](admin/team.md)

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
