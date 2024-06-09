const { saveLabel, saveDatetoLabel, deleteLabel, deleteDatetoLabel } = require('../../source/Notes/label-helper');
const fs = require('fs');
jest.mock('fs');

describe('label-helper', () => {
  const day = 1;
  const month = 1;
  const year = 2022;
  const label = 'Test Label';

  let readFileSpy;
  let writeFileSpy;
  let mkdirSpy;
  let savedLabels = [];

  beforeEach(() => {
    // Create a spy on fs.readFile
    readFileSpy = jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => callback(null, JSON.stringify(savedLabels)));
    writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, options, callback) => {
      return new Promise((resolve) => {
        savedLabels = JSON.parse(data);
        resolve();
      });
    });
    mkdirSpy = jest.spyOn(fs, 'mkdir').mockImplementation((path, options, callback) => callback(null));

    // Reset all instances and calls to constructor and all methods:
    readFileSpy.mockClear();
    writeFileSpy.mockClear();
    mkdirSpy.mockClear();
  });

  afterEach(() => {
    // Restore the original implementation of fs.readFile after each test
    readFileSpy.mockRestore();
    writeFileSpy.mockRestore();
    mkdirSpy.mockRestore();
  });

  it('should save a label', async () => {
    // Save label
    await Promise.all([
      saveLabel(day, month, year, label),
      saveDatetoLabel(day, month, year, label)
    ]);
  
    // Check that the label was saved
    expect(savedLabels).toContainEqual({ day, labels: [label] });
  });

  it('should delete a label', async () => {
    // Save label first
    await Promise.all([
      saveLabel(day, month, year, label),
      saveDatetoLabel(day, month, year, label),
    ]);
    //delete label
    await Promise.all([
      deleteLabel(day, month, year, label),
      deleteDatetoLabel(day, month, year, label)
    ]);
    // Check that the label was deleted
    expect(savedLabels).not.toContainEqual({ day, labels: [label] });
  });
});