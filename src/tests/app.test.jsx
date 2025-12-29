import { describe, it, expect } from 'vitest';
import { eventInitialize } from '../utils/helpers/eventDataInit';

describe('eventBuilder works', () => {
  it('packages data correctly', () => {
    const exEvent = eventInitialize(
      {
        name: 'Hallo Party',
        description: 'Spooky party',
        startDate: '11-01-25',
        endDate: '11-01-25',
        location: '321 N Maynor Pl',
        image:
          'https://images.squarespace-cdn.com/content/v1/63ec08a7fa1d1a1947280fc6/1708129271588-2BI07Q8O57NQR04KM6OV/more-killer-halloween-party-ideas-featured.png?format=2500w',
      },
      'FooBar'
    );

    console.log(exEvent);
    expect(exEvent.name).toBe('Hallo Party');
  });
});
