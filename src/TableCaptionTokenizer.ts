import { MDAST } from 'mdast';
import * as RemarkParse from 'remark-parse';

import { parse, ParseResult } from './peg/tableCaption';

const MathTokenizer: RemarkParse.Tokenizer = function(eat, value, silent) {
  let result: ParseResult;
  try {
    result = parse(value);
  } catch (err) {
    return silent ? false : undefined;
  }

  if (silent) {
    return true;
  }

  const matchStr = value.substring(
    result.location.start.offset,
    result.location.end.offset
  );

  const now = eat.now();
  const offset = matchStr.indexOf(result.caption);
  now.column += offset;
  if (now.offset) {
    now.offset += offset;
  }

  const node: MDAST.TableCaption = {
    type: 'tableCaption',
    children: this.tokenizeInline(result.caption, now),
  };

  return eat(matchStr)(node);
};

export default MathTokenizer;
