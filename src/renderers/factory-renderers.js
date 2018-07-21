import defaultFN from './default';
import plainFN from './plain';

const formatFN = {
  default: defaultFN,
  plain: plainFN,
};

export default (ast, format) => formatFN[format](ast);
