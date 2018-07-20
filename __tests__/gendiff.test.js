import fs from 'fs';
import genDiff from '../src';

describe('Testing flat JSON file - step 2', () => {
  it('genDiff checks two JSON files', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toEqual(expected);
  });

  it('genDiff checks two YAML files', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after.yaml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });

  it('genDiff checks two INI files', () => {
    const pathBefore = `${__dirname}/__fixtures__/ini/before.ini`;
    const pathAfter = `${__dirname}/__fixtures__/ini/after.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/ini/result`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });
});
