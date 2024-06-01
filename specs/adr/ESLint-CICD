# Adding ESLint to CICD Pipeline

### Date: 6/1/2024

### Main Drivers:
- Andy
- Brian

Consulted with the entire team.

## Problem Statement and Context

- Developers are finding it difficult to resolve and identify Codacy errors
- Codacy takes a while to run/load, making for poor developer experience

## Considered Options

- Disabling Codacy: many of the warnings are valid concerns (not false positives), so not disabling everything
  - However, possibility to safely remove impossible to fix rules that are premature optimization (ie why follow Typescript rules if we'll never use Typescript)
- Switching Codacy to a new tool that is more clear: Other tools are paid, also considering onboarding time picking up new tool would be hard
- Adding Linters to help developers catch
  - Currently considering ESLint
    - Codacy can potentially read ESLint configuration files, syncing expectations between Codacy and Developers
    - Lacked a linter in CICD pipeline before
      - Only had prettier
    - ESLint has a smaller learning curve than an alternative to Codacy
  

## Decision Outcome

- Disabled a selection of Codacy rules
  - Many bugs were able to be manually fixed
  - Learning curve for adding ESLint was too steep, onboarding time would have not been worth it for so late in the quarter / litte time left in project.

Expiration: 1 quarter (3 months)
