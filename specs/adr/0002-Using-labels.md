# Decision: Using labels to search for a keyword

## Context and Problem Statement:
- We were deliberating the key features to embed in our development journal. One of these features involved facilitating users to search for a specific keyword. 
For instance, if a user needs to find a previously documented bug or any other information they've stored, they would do so using a labeling system. 

## Decision Drivers:
- Ease of User interaction
- Searching inside the text was not valuable enough for us to warrent the extra scope, so deprioritize it
- Filtering by labels is better for quickly skimming notes, which is valuable for a minimal note app.


## Considered Options:
- A search bar to search by keywords in the notes / text
- A dropdown to search by labels - if there are a lot of labels could be hard to scroll
- A search bar to filter by labels 

## Decision Outcome:
- We opted for filtering by using labels with priorities for keyword search.
