function modTemplate(type, order, data) {
  return {
    type,
    order,
    data,
  };
}
function pageTemplate(title, type, slug, order, modules) {
  return {
    title,
    type,
    slug,
    order,
    modules,
  };
}

export function eventBuilder(eventFields, hostName) {
  // takes the event fields

  // defines the structure of data to be stored in db for events

  // pages

  //home
  const titleMod = modTemplate('h1', 0, {
    html: `<h1>${eventFields.name}</h1>`,
  });
  const hostMod = modTemplate('p', 2, {
    html: `<p>Hosted by:</p>
          <p>${hostName}</p>`,
  });
  const homePage = pageTemplate('Home', 'home', 'home', 0, [titleMod, hostMod]);

  // location
  const addressMod
  const defaultPages = [homePage, ];

  // modules
}

// what are the types that should be stored in module and how are they represented as jsx from json?
//
//
// which templates should be premade?
//
// title
// host(s)
// address
//
