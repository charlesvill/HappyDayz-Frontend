import { page } from '../templates/page';
import { module } from '../templates/module';
import { eventBuilder } from '../templates/event';

// new home of helper to initialize any event

export function eventInitialize(fields = {}, hostName) {
  const homePage = page('Home', 'home', 'home', 0, [
    module('heading', 0, `<h1>${fields.name}<h1>`),
    module('img', 1, `${fields.image}`),
    module('heading', 2, `<h5>Hosted by: ${hostName}</h5>`),
    module('paragraph', 3, `<p>${fields.description}</p>`),
  ]);
  const locationPage = page('Location', 'location', 'location', 1, [
    module('img', 0, '<img>Map picture</img>'),
    module('paragraph', 1, `<p>${fields.loation}</p>`),
  ]);
  const newEvent = eventBuilder(fields, hostName)
    .addPage(homePage)
    .addPage(locationPage);
  const { addPage, build, ...eventBody } = newEvent;

  return eventBody;
}
