import yaml from 'js-yaml';
import ini from 'ini';

const fileExtFN = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default ext => fileExtFN[ext];
