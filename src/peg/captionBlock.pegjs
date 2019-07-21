All
  = match:Match .*
  {
    return match;
  }

Match
  = space:_* data:Caption '\n'?
  {
    return Object.assign(data, {
      location: location(),
    });
  }

Caption
  = CaptionHeader _* caption:(Char*)
  {
    return {
      caption: caption.join(''),
    };
  }

CaptionHeader
  = ('Table' / 'table' / 'Code' / 'code')? _* ':'

Char
  = c:('\\' [^\n] / !'\\' [^\n]) { return c.join(''); }

_ 'whitespace'
  = '\u0020' / '\u0009'
