# @paperist/remark-caption

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-caption
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme
[npm-badge]: https://flat.badgen.net/npm/v/@paperist/remark-caption
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[standard-readme-badge]: https://flat.badgen.net/badge/standard-readme/OK/green

> [wooorm/remark] plugin for caption

Support [Pandoc's table / code caption][table-caption] at wooorm/remark.

[wooorm/remark]: https://github.com/wooorm/remark
[table-caption]: http://pandoc.org/MANUAL.html#extension-table_captions

## Table of Contents

<!-- TOC depthFrom:2 depthTo:3 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
- [AST](#ast)
  - [`CaptionBlock`](#captionblock)
- [Contribute](#contribute)
- [License](#license)

<!-- /TOC -->

## Install

```
npm i remark @paperist/remark-caption
```

## Usage

```js
const unified = require('unified');
const parser = require('remark-parse');
const tableCaption = require('@paperist/remark-caption');

const markdown = `
| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |

Table: Demonstration of pipe table syntax.


~~~rb
puts "Hello World!";
~~~

Code: Hello World written by Ruby.
`;

const processor = unified()
  .use(parser)
  .use(tableCaption);
const ast = processor.parse(markdown);

processor.run(ast).then((ast) => {
  console.dir(ast, { depth: null });
});
```

## AST

See also [mdast], [unist].

[mdast]: https://github.com/syntax-tree/mdast
[unist]: https://github.com/syntax-tree/unist

### `CaptionBlock`

`CaptionBlock` extends [`Parent`][unist-parent].

```typescript
interface CaptionBlock extends Parent {
  type: 'captionBlock';
}
```

For example, the following markdown:

```md
Table: Caption {#tbl:label}
```

Yields:

```json
{
  "type": "captionBlock",
  "children": [
    {
      "type": "text",
      "value": "Caption {#tbl:lable}"
    }
  ]
}
```

[unist-parent]: https://github.com/syntax-tree/unist#parent

## Contribute

PRs accepted.

## License

[MIT (c) 3846masa](https://3846masa.mit-license.org)
