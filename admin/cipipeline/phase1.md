## Currently Functional:


### Jest
We will be using Jest in order to implement our unit tests. Examples of Jest unit tests can be found in Lab 5.

### JSDocs for Documentation

We will be using [this Github Actions](https://github.com/marketplace/actions/jsdoc-action) link to implement our JSDocs documentation pipeline process.

If there is a need to run the JSDocs manually, do the following. We will use JSDocs as a part of our documentation process. To install JSDocs, developers must run the command `npm install --save-dev jsdoc`.

To generate documents for a file, developers should run `./node_modules/.bin/jsdoc file_name.js`. Replaced`file_name.js` with the name of the file you are trying to generate 

To run `./node_modules/.bin/jsdoc file_name.js`, you need to be in the parent directory of `node_modules`. If you `ls` and cannot see the `node_modules` directory, do the following: 
1) If you have never run `npm install` for the repository, run it
2) If you have, navigate to the parent directory of `node_modules` using `cd`

## In Progress
- Wrapping up the JSDocs command into a convenient `npm` script command.

## Future Plans

### Prettier Github Actions & Linting

Currently, we plan for everyone to use `prettier` locally to help code quality. If this strategy does not work, we also have the option to integrate `prettier` into our Github Actions pipeline. We can consult the following two links:
- [Prettier Actions](https://github.com/marketplace/actions/prettier-action)
- [Online Tutorial](https://mskelton.dev/blog/auto-formatting-code-using-prettier-and-github-actions)

Additionally, we can look into adding a layer of linting onto our prettier formatting. The [prettier.io documentation](https://prettier.io/docs/en/comparison.html) mentions that `prettier` should be used for code formatting, while a linter can help prevent and catch potential bugs early. Future options include both looking into using linting locally and integrating it into our Github Actions in a process similar to the one we are using for `prettier`.

### Expanding the pipeline for merging our `Testing` branch into the `Main` branch

We would like to look into further pipeline steps we could implement when merging our testing branch into our main branch. Code merged into our main branch should have the highest standard of quality 


### Setting up development dependencies

A key point stressed in class was that codebases should be minimalistic and lightweight. In the future, we would like to figure out how to utilize [development dependencies](https://stackoverflow.com/questions/36999461/how-to-install-only-devdependencies-using-npm) in order to reduce the number of dependencies in production environment.

### End to end / integration testing
We would like to look into how to do integration testing using Jest or another package.