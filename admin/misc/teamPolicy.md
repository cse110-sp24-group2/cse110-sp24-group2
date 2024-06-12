If you are to start work on a new feature:

Check if there is an existing issue on GitHub correlating to that feature
If one exists, assign yourself to that issue. If someone else is already assigned to the issue, contact them to see if they need help
If one does not exist, after ensuring with others that the feature is necessary, create a new issue for the feature, assign yourself to it, create a branch attached to the issue

While you are working on a new feature:

Use Prettier on every file you edit to ensure code style
If Prettier is not working, make sure you have done npm install on your local version of the code to get the extension. Ensure /node_modules is in the .gitignore file
Can also get the VSCode extension to go along with it
Look up "Prettier" and choose the first option, NOT alternatives like ESLint Prettier
Document your code
Use JSDoc comments so that it can be properly documented and help others. If new to JSDoc style, look here : https://jsdoc.app/
Ensure that functions are not stuck within other functions otherwise JSDoc may struggle with pulling the documentation
(ie if you run write the function to run after the DOM was loaded, declare init() outside of where you add the event listener)
Try to add testing to your new functionality, either in the form of unit tests or e2e tests
Not always applicable, but we should definitely try to test as we develop

When creating a pull request:

Make sure that your code passes ALL tests, including:
Unit tests
e2e tests
Fix any Codacy issues that are reported
If you think the issues that are brought up are wrong or unnecessary for the time, please comment on the pull request arguing why that is true
Request that someone reviews your PR

When reviewing someone's pull request:

Ensure that Codacy policies are followed
If they are not but the justification in the comments are reasonable, that is fine
Checkout the branch and do a quick review to make sure things still work and the branch properly implements what they are intending
If any issues are found, leave a comment on the PR and let the creator of the PR know
Otherwise, provide your successful review and merge the branch

When a PR gets merged:

Make sure to delete the branch so we don't have a clutter of branches
If for some reason the branch needs to be started up again, you can always go to the PR in which it was merged and restore the branch after deleting it
