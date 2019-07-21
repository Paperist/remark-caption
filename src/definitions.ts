import * as unist from 'unist';

declare module 'mdast' {
  export interface CaptionBlock extends unist.Parent {
    type: 'captionBlock';
  }
}
