# @paperist/remark-caption

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-caption
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme
[npm-badge]: https://img.shields.io/npm/v/@paperist/remark-caption.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURcwAAOeIiP////G7u/ri4tIZGdpFReJsbPC3t075sZwAAAAvSURBVCjPY2CgDWAThIMEsACjEhwIUCZg0dGCIqASwMAxMgXAgSzOwMAOC2TqAwBvzR4JxLaP0gAAAABJRU5ErkJggg==
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURSBTICJcIiNgIiZoJTuhNyt3Kf///%2BCqxSgAAAAGdFJOUwpclbn%2B4Fj6/H8AAAABYktHRAZhZrh9AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AkEEjEV7MDQQwAAAGBJREFUCNc1TUEKgDAMi07vE/Q%2BRD8g%2B4BbvAvi/79iMjDQJm1CC6BbDzRsZI3incIpYeYFhCaYnLiyPYnYkwWZFWoFHrSuttCmmbwXh0eJQYVON4JthZTxCzzAmyb8%2BAAKXBRyN6RyZQAAAABJRU5ErkJggg==
[standard-readme-badge]: https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square

> [wooorm/remark] plugin for caption

Support [Pandoc's table / code caption][table-caption] at wooorm/remark.

[wooorm/remark]: https://github.com/wooorm/remark
[table-caption]: http://pandoc.org/MANUAL.html#extension-table_captions

## Table of Contents

<!-- TOC depthFrom:2 depthTo:3 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
- [AST](#ast)
  - [`TableCaption`](#tablecaption)
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

`CaptionBlock` extends [`Parent`][unist-parnet].

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

[unist-caption]: https://github.com/syntax-tree/unist#caption

## Contribute

PRs accepted.

## License

![3846masa] MIT (c) 3846masa

[3846masa]: https://www.gravatar.com/avatar/cfeae69aae4f4fc102960f01d35d2d86?s=50
