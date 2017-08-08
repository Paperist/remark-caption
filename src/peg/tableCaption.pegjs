All
  = match:Match .*
  {
    return match;
  }

Match
  = space:_* data:TableCaption '\n'?
  {
    return Object.assign(data, {
      location: location(),
    });
  }

TableCaption
  = TableCaptionHeader _* caption:(Char*)
  {
    return {
      caption: caption.join(''),
    };
  }

TableCaptionHeader
  = ('Table' / 'table')? _* ':'

Char
  = c:('\\' [^\n] / !'\\' [^\n]) { return c.join(''); }

_ 'whitespace'
  = '\u0020' / '\u0009'
