# Decision: What e2e test framework to use for Electron testing

### Date: 05/30/2024

### Consulted: Entire Team

## Context and Problem Statement

- After figuring out that puppeteer was not going to be able to run on the electronJS app, we knew that would cause issues as electron is needed to test for proper functionality. To fix this issue, we had to find a new framework that can support our distribution method. The TAs provided this link to look for alternatives: [Alternate e2e Frameworks](https://www.electronjs.org/docs/latest/tutorial/automated-testing)

## Decision Drivers:

- Similarity to puppeteer
- Easiest to install
- Capability for customization

## Considered Options:

- WebdriverIO
- Selenium
- Playwright

## Decision Outcome:

- Use webdriverIO as our new framework

### Expiration:

1 quarter (3 months)
