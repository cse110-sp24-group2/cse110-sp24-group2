# cse110-sp24-group2

## [Team Wiki](admin/team.md)

## Running the App

1. Navigate to the source directory:

```bash
cd source
```
If you're on Windows, make sure your package.json file looks like this:
### Windows
```json
{
    "name": "Dev Journal",
    "version": "1.0.0",
    "description": "A Developer Journal That tracks what you do in a day",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "package": "electron-packager . DevJournal --platform=win32 --arch=x64" 
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

### Mac
Use this instead for package key:
`"package": "electron-packager . Calendar --platform=darwin --arch=x64`

```json
{
    "name": "Calendar_App",
    "version": "1.0.0",
    "description": "A Calendar App That tracks what you do in a day",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "package": "electron-packager . Calendar --platform=darwin --arch=x64"
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
```
Run the app:  
```bash
npm run package
npm start
```
