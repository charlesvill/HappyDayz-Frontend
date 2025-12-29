// fields that are expected
// name
// description
// address

export function eventBuilder(fields, hostName) {
  const pages = [];
  const addPage = (page) => {
    pages.push(page);
    return builder;
  };

  const builder = {
    ...fields,
    hostName,
    addPage,
    pages,
    build: () => ({
      pages,
      meta: {
        createdAt: new Date().toISOString(),
      },
    }),
  };

  return builder;
}
