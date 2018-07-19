import yaml from 'js-yaml';

const funcParser = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default (ext, fileData) => {
  const fn = funcParser[ext];
  return fn(fileData);
};
