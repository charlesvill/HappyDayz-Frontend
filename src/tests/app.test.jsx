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
      },
      'FooBar'
    );

    console.log(exEvent);
    expect(exEvent.fields.name).toBe('Hallo Party');
  });
});
