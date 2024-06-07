# Decision: Using labels to search for a keyword

## Context and Problem Statement:

- We were deliberating the key features to embed in our development journal. One of these features involved facilitating users to search for a specific keyword.
  - For instance, if a user needs to find a previously documented bug or any other information they've stored, they would do so using a labeling system.

## Decision Drivers:

- Ease of User interaction
- Searching inside the text was not valuable enough for us to warrent the extra scope, so deprioritize it
- Filtering by labels is better for quickly skimming notes, which is valuable for a minimal note app.

## Considered Options:

### Searching

- A search bar to search by keywords in the notes / text
- A dropdown to search by labels - if there are a lot of labels could be hard to scroll
- A search bar to filter by labels

### Label Deletion

- Clicking once to delete labels.
  - Pros: Quick
  - Cons: Easy to accidently delete, non intuative
- Clicking twice to delete labels
  - Pros: Still pretty quick, doesn't require on mouse precision, less likely to make mistakes
  - Cons: Need additional UI to explain, non intuative, additional UI would clutter view
- Using x button to delete labels
  - Pros: Intuative, harder to accidently delete.
  - Cons: Requires ore UI sensitivity

## Decision Outcome:

- We opted for filtering by using labels with priorities for keyword search.
- We opted for using x buttons to delete labels (and TODO list labels later)
