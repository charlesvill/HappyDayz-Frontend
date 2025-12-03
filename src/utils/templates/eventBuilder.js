function modStruct(type, order, data) {
  return {
    type,
    order,
    data,
  };
}

function pageStruct(title, type, slug, order, modules) {
  return {
    title,
    type,
    slug,
    order,
    modules,
  };
}

export function eventBuilder(fields, hostName) {
  // defines the json structure for initializing an event
  const homePage = () => {
    const titleMod = modStruct('h1', 0, {
      html: `<h1>${fields.name}</h1>`,
    });
    const imgMod = modStruct('img', 1, {
      html: `<img>`,
    });
    const hostMod = modStruct('p', 2, {
      html: `<p>Hosted by:</p>
          <p>${hostName}</p>`,
    });
    const descMod = modStruct('p', 3, {
      html: `<p>${fields.description}</p>`,
    });

    return pageStruct('Home', 'home', 'home', 0, [
      titleMod,
      imgMod,
      hostMod,
      descMod,
    ]);
  };

  const locationPage = () => {};

  return {
    homePage,
    locationPage,
  };
}
