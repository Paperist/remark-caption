import { UNIST } from 'unist';

declare module 'mdast' {
  export namespace MDAST {
    interface TableCaption extends UNIST.Parent {
      type: 'tableCaption';
    }
  }
}
