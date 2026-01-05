import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { dummyData } from '../dummyResponse';
import { Event } from '../../pages/event/event';

describe('Event renderer works', () => {
  render(<Event data={dummyData} />);

  it('contains page tab', () => {
    expect(screen.getByRole())
  });
});


// left off on listing out the expect and accessing page tabs
