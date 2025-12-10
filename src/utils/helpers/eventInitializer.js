import { page } from '../templates/pageBuilder';
import { module } from '../templates/moduleBuilder';
import { eventBuilder } from '../templates/eventBuilder';

// new home of helper to initialize any event

export function eventInitialize(fields, hostName) {
  const homePage = page('Home', 'home', 'home', 0, [
    module('h1', 0, `<h1>${fields.name}<h1>`),
    module('img', 1, '<img>'),
    module('p', 2, `<p>Hosted by: ${hostName}</p>`),
    module('p', 3, `<p>${fields.description}</p>`),
  ]);
  const locationPage = page('Location', 'location', 'location', 1, [
    module('img', 0, '<img>Map picture</img>'),
    module('p', 1, `<p>${fields.loation}</p>`),
  ]);
  const newEvent = eventBuilder(fields, hostName)
    .addPage(homePage)
    .addPage(locationPage);

  return newEvent;
}
