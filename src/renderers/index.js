import customFN from './custom';
import plainFN from './plain';
import jsonFN from './json';

const formatFN = {
  default: customFN,
  plain: plainFN,
  json: jsonFN,
};

export default (format, ast) => formatFN[format](ast);
