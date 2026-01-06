export const dummyData = {
  id: 1,
  name: 'birthday',
  description: 'it is your birthday. ',
  startDate: '01-03-2026',
  endDate: '01-04-2026',
  pages: [
    {
      id: 0,
      title: 'Home',
      type: 'home',
      slug: 'home',
      order: 0,
      event_id: 1,
      modules: [
        {
          id: 0,
          type: 'heading',
          order: 0,
          data: {
            size: 1,
            text: 'birthday',
          },
          page_id: 0,
        },
        {
          id: 1,
          type: 'img',
          order: 1,
          data: {
            src: 'fake.source',
            alt: 'fake alt',
          },
          page_id: 0,
        },
        {
          id: 2,
          type: 'paragraph',
          order: 3,
          data: {
            text: 'it is your birthday. ',
          },
          page_id: 0,
        },
      ],
    },
    {
      id: 1,
      title: 'Location',
      type: 'location',
      slug: 'location',
      order: 1,
      event_id: 1,
      modules: [
        {
          id: 7,
          type: 'heading',
          order: 0,
          data: {
            size: 2,
            text: 'Address',
          },
          page_id: 1,
        },
        {
          id: 3,
          type: 'img',
          order: 1,
          data: {
            src: 'fake.source',
            alt: 'fake alt',
          },
          page_id: 1,
        },
        {
          id: 4,
          type: 'paragraph',
          order: 2,
          data: {
            text: '127 Washington Blvd',
          },
          page_id: 1,
        },
      ],
    },
  ],
};
