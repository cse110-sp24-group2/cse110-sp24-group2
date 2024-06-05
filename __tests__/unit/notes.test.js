const { saveMarkdownEntry, renderMarkdownEntry, deleteMarkdownEntry } = require('../../source/Notes/notes-helper');
const fs = require('fs');
jest.mock('fs');