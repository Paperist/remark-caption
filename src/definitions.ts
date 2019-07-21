import * as unist from 'unist';

declare module 'mdast' {
  export interface TableCaption extends unist.Parent {
    type: 'tableCaption';
  }
}
