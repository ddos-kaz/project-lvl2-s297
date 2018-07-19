import genDiff from '../src';

describe('Testing flat JSON file - step 2', () => {
  const expected = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}';
  it('genDiff checks two JSON files', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after.json`;
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });

  it('genDiff checks two YAML files', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after.yaml`;
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });
});
