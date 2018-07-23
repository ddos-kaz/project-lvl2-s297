import treeFN from './tree';
import plainFN from './plain';
import jsonFN from './json';

const formatFN = {
  tree: treeFN,
  plain: plainFN,
  json: jsonFN,
};

export default (format, ast) => formatFN[format](ast);
