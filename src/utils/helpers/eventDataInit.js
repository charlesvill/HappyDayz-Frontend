import { page } from '../templates/page';
import { module } from '../templates/module';
import { eventBuilder } from '../templates/event';

// new home of helper to initialize any event

export function eventInitialize(fields = {}, hostName) {
  const homePage = page('Home', 'home', 'home', 0, [
    module('heading', 0, { size: 1, text: fields.name }),
    module('img', 1, { src: fields.image, alt: 'event image' }),
    module('heading', 2, { size: 2, text: `Hosted by ${hostName}` }),
    module('paragraph', 3, { text: fields.description }),
  ]);
  const locationPage = page('Location', 'location', 'location', 1, [
    module('img', 0, { src: 'image', alt: 'image' }),
    module('paragraph', 1, { text: fields.location }),
  ]);
  const newEvent = eventBuilder(fields, hostName)
    .addPage(homePage)
    .addPage(locationPage);
  const { addPage, build, ...eventBody } = newEvent;

  return eventBody;
}
