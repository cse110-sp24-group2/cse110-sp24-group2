### Functional Suitability

- Add / delete notes
- Filter by day
- Custom filtering

#### User Stories

- As a user, I want to add and delete notes to record
- To make finding notes easier...
  - As a user, I want to filter notes by day
  - As a user, I want to control how I filter notes
    - (Fulfilled by our labeling system)

### Performance Efficiency - Does it perform properly

- The app should be able to run without a graphics card and with 8 GB of RAM.
- The app should not take more than 500 MB of space

### User Stories

- As a user, I want my app to load in less than a second so I don't lose my train of thought

### Compatibility - is it compatible with the systems we are building for?

- The app must be compatible with Windows 11 and MacOS
  - Developers keep their devices up to date, so we will target the latest versions

### Usability

- Usability refers to our user's ability to use our app

- Our app should satisfy usability in three different ways

1. Our app should make it easy for our user to use the app. Our user just needs to navigate through our app and create notes whenever needed. It should just be a simple process of just clicking on a certain day, typing in notes for that day, saving, working with the todo lists, and exiting the app
2. Our user should only need to perform 6 clicks at minimum when using the app. This includes clicking on a day, clicking on the textbox to enter in notes for that day, clicking save, adding a task to the notes page to do list, and exiting out of the app.
3. Our app also should contain nested menus within dropdowns, everything that the user needs to use our app should be right in front of them (adding and deleting journal entries, navigating across different days in the calendar, working with the calendar and notes page to do list)

### Reliability

- This application should not rely on having a stable internet connection.

### Security

In terms of security for our app, we should hinge on two things

1. Local First

We should use an Electron based offline web app to not have to rely on third party services to keep our user data protected.

With user authentication, we would have to worry about encryption and other methods to protect user data. By using Electron and creating an offline web app, we can focus on fulfilling the other -ilities and other aspects of our app instead of having to account for the user data encryption and protection methods that online web apps require

1. Codacy

Our app should not cause any Codacy security errors. We have a suite of 32 security checks run by Codacy as a part of their recommended suite.

![SecurityCodacyFilters](SecurityCodacy.png)

### Maintainability

Our app should be separated into folders that each serve a different purpose

### Portability

- This application should work without a wireless connection

- Our user should be able to install and use our app regardless of operating system or other various factors
