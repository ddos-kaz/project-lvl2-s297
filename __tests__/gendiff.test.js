import fs from 'fs';
import genDiff from '../src';

describe('Testing JSON files', () => {
  it('genDiff checks two flat JSON files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before-flat.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after-flat.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result-flat`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toEqual(expected);
  });

  it('genDiff checks two deep JSON files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before-deep.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after-deep.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result-deep`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toEqual(expected);
  });

  it('genDiff checks two flat JSON files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before-flat.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after-flat.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result-flat-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });

  it('genDiff checks two deep JSON files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before-deep.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after-deep.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result-deep-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });
});

describe('Testing YAML files', () => {
  it('genDiff checks two flat YAML files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before-flat.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after-flat.yaml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-flat`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });

  it('genDiff checks two deep YAML files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before-deep.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after-deep.yaml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-deep`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toEqual(expected);
  });

  it('genDiff checks two flat YAML files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before-flat.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after-flat.yaml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-flat-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });

  it('genDiff checks two deep YAML files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/yaml/before-deep.yaml`;
    const pathAfter = `${__dirname}/__fixtures__/yaml/after-deep.yaml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-deep-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });
});

describe('Testing INI files', () => {
  it('genDiff checks two flat INI files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const pathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-flat`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toBe(expected);
  });

  it('genDiff checks two deep INI files : default', () => {
    const pathBefore = `${__dirname}/__fixtures__/ini/before-deep.ini`;
    const pathAfter = `${__dirname}/__fixtures__/ini/after-deep.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-deep`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toEqual(expected);
  });

  it('genDiff checks two flat INI files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const pathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-flat-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });

  it('genDiff checks two deep INI files : plain', () => {
    const pathBefore = `${__dirname}/__fixtures__/ini/before-deep.ini`;
    const pathAfter = `${__dirname}/__fixtures__/ini/after-deep.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-deep-plain`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(expected);
  });
});
