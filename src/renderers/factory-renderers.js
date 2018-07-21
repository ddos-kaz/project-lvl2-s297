import defaultFN from './default';
import plainFN from './plain';
import jsonFN from './json';

const formatFN = {
  default: defaultFN,
  plain: plainFN,
  json: jsonFN,
};

export default (format, ast) => formatFN[format](ast);
