const { saveMarkdownEntry, renderMarkdownEntry, deleteMarkdownEntry } = require('../../source/Notes/notes-helper');
const { deleteLabel, deleteDatetoLabel } = require('../../source/Notes/label-helper');
const fs = require('fs');
const path = require('path');
jest.mock('fs');

describe('app', () => {
    const day = 1;
    const month = 1;
    const year = 2022;
    const markdown = ' ## Test Markdown';

    let readFileSpy;
    let writeFileSpy;
    let mkdirSpy;
    let unlinkSpy;

    beforeEach(() => {
      // Create spies on fs methods
      readFileSpy = jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => callback(null, ''));
      writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, options, callback) => callback(null));
      mkdirSpy = jest.spyOn(fs, 'mkdir').mockImplementation((path, options, callback) => callback(null));
      unlinkSpy = jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => callback(null));
    
      // Reset all instances and calls to constructor and all methods:
      readFileSpy.mockClear();
      writeFileSpy.mockClear();
      mkdirSpy.mockClear();
      unlinkSpy.mockClear();
    });
    
    afterEach(() => {
      // Restore the original implementation of fs methods after each test
      readFileSpy.mockRestore();
      writeFileSpy.mockRestore();
      mkdirSpy.mockRestore();
      unlinkSpy.mockRestore();
    });
    
    it('should save a Markdown entry', async () => {
      // Save Markdown entry
      saveMarkdownEntry(day, month, year, markdown);
    
      // Check that the directories were created and the file was written
      expect(mkdirSpy).toHaveBeenCalledWith(expect.any(String), { recursive: true }, expect.any(Function));
      expect(writeFileSpy).toHaveBeenCalledWith(expect.any(String), markdown, 'utf-8', expect.any(Function));
    });
    
    it('should delete a Markdown entry', async () => {
      // Mock the readFile implementation for labels
      const labels = [{ day, labels: [{ name: 'Test Label' }] }];
      readFileSpy.mockImplementation((path, options, callback) => callback(null, JSON.stringify(labels)));
    
      // Delete Markdown entry
      deleteMarkdownEntry(day, month, year);
    
      // Check that the file was deleted and labels were read
      expect(unlinkSpy).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(readFileSpy).toHaveBeenCalledWith(expect.any(String), 'utf-8', expect.any(Function));
    });
});