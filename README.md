# cse110-sp24-group2

## [Team Wiki](admin/team.md)

## Running the App

1. Navigate to the source directory:

```bash
cd source
```
If you're on Windows, make sure your package.json file looks like this:
```json
{
    "name": "Dev Journal",
    "version": "1.0.0",
    "description": "A Developer Journal That tracks what you do in a day",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "package": "electron-packager . DevJournal --platform=win32 --arch=x64 --out=DevJournal"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "electron": "^11.5.0"
    },
    "devDependencies": {
        "electron-packager": "^15.5.2"
    }
}
```
If you're on Mac, make sure your package.json file looks like this:
```json
{
    "name": "Dev Journal",
    "version": "1.0.0",
    "description": "A Developer Journal That tracks what you do in a day",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "package": "electron-packager . DevJournal --platform=darwin --arch=x64 --out=DevJournal"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "electron": "^11.5.0"
    },
    "devDependencies": {
        "electron-packager": "^15.5.2"
    }
}
```
Install the necessary dependencies:  
```bash
npm install --save-dev electron-packager
npm run package
```
Run the app:  
```bash
npm start
```