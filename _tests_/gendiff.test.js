import genDiff from '../src';

describe('Testing flat JSON file - step 2', () => {
  const pathBefore = `${__dirname}/_fixtures_/before.json`;
  const pathAfter = `${__dirname}/_fixtures_/after.json`;

  it('genDiff check two JSON files', () => {
    const expected = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}';
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });
});
