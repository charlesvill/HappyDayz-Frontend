import { ModuleRenderer } from '../../components/module/moduleRenderer/moduleRenderer';

import * as ModCollection from '../../components/module/';

// I may not need neither of the renderer components included
// extraneous to the purpose of this component map

export const componentMap = {
  event: {
    renderer: null,
  },
  page: {
    renderer: null,
  },
  module: {
    renderer: ModuleRenderer,
    img: ModCollection.Img,
    paragraph: ModCollection.Paragraph,
    heading: ModCollection.Heading,
  },
};
