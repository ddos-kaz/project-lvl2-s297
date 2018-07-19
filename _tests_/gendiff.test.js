import genDiff from '../src';

describe('Testing flat JSON file - step 2', () => {
  const pathBefore = `${__dirname}/_fixtures_/before.json`;
  const pathAfter = `${__dirname}/_fixtures_/after.json`;

  it('genDiff contains: "+ timeout: 20"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('+ timeout: 20');
  });

  it('genDiff contains: "host: hexlet.io"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('host: hexlet.io');
  });

  it('genDiff not contains: "+ host: hexlet.io"', () => {
    expect(genDiff(pathBefore, pathAfter)).not.toMatch('+ host: hexlet.io');
  });

  it('genDiff not contains: "- host: hexlet.io"', () => {
    expect(genDiff(pathBefore, pathAfter)).not.toMatch('- host: hexlet.io');
  });

  it('genDiff contains: "- timeout: 50"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('- timeout: 50');
  });

  it('genDiff contains: "- proxy: 123.234.53.22"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('- proxy: 123.234.53.22');
  });

  it('genDiff contains: "- follow: false"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('- follow: false');
  });

  it('genDiff contains: "+ verbose: true"', () => {
    expect(genDiff(pathBefore, pathAfter)).toMatch('+ verbose: true');
  });
});
