import { EventBuilder } from '../../components/event/eventBuilder/eventBuilder';
import { PageBuilder } from '../../components/page/pageBuilder/pageBuilder';
import { ModuleBuilder } from '../../components/module/moduleBuilder/moduleBuilder';

import * as ModCollection from '../../components/module/';

export const componentMap = {
  event: {
    builder: EventBuilder,
  },
  page: {
    builder: PageBuilder,
  },
  module: {
    builder: ModuleBuilder,
    title: ModCollection.Title,
    img: ModCollection.Img,
  },
};
