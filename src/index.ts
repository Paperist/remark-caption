/**
 * Static
 */
const C_NEWLINE = '\n';
const C_SPACE = '\x20';
const C_TAB = '\t';

/**
 * Tokenise a cross-ref label.
 *
 * @example
 *   tokenizeTableCaption(eat, 'Table: Caption {#tbl:table}');
 */
export function tokenizeTableCaption (
  this: any,
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const length = value.length;
  let firstLine = '';
  let idx = 0;

  for ( ; idx < length; idx++) {
    const char = value.charAt(idx);
    firstLine += char;
    if (char === C_NEWLINE) {
      break;
    }
  }

  for (idx++; idx < length; idx++) {
    const char = value.charAt(idx);
    if (char === C_SPACE || char === C_TAB) {
      continue;
    }
    if (char === C_NEWLINE) {
      break;
    }
    return;
  }

  const isMatched = new RegExp(/^(?:\s*table)?\s*:.*$/, 'im').test(firstLine);
  if (!isMatched) {
    return;
  }

  if (silent) {
    return true;
  }

  return eat(firstLine)({
    children: this.tokenizeInline(firstLine, eat.now()),
    type: 'tableCaption',
  });
}

/**
 * Attacher.
 */
function attacher(remark: any) {
  const proto = remark.Parser.prototype;
  const blockMethods = proto.blockMethods;
  const inlineMethods = proto.inlineMethods;

  /**
   * Add a tokenizer to the `Parser`.
   */
  proto.blockTokenizers.tableCaption = tokenizeTableCaption;
  blockMethods.splice(inlineMethods.indexOf('paragraph'), 0, 'tableCaption');
}

/**
 * Expose.
 */

export default attacher;
