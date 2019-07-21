import './definitions';
import RemarkParse from 'remark-parse';

import CaptionBlockTokenizer from './CaptionBlockTokenizer';
import transformer from './transformer';

function attacher(this: RemarkParse.Parse) {
  const Parser = this.Parser;

  const blockTokenizers = (Parser.prototype as any).blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers['captionBlock'] = CaptionBlockTokenizer;
  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'captionBlock');

  return transformer;
}

export = attacher;
