import * as RemarkParse from 'remark-parse';

import TableCaptionTokenizer from './TableCaptionTokenizer';
import transformer from './transformer';

function attacher(this: RemarkParse) {
  const Parser = this.Parser;

  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers['tableCaption'] = TableCaptionTokenizer;
  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'tableCaption');

  return transformer;
}

export = attacher;
