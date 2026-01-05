import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { dummyData } from '../dummyResponse';
import { Event } from '../../pages/event/event';

describe('Event renderer works', () => {
  render(<Event data={dummyData} />);

  it('contains tab for home page', () => {
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('contains tab for location page', () => {
    expect(
      screen.getByRole('button', { name: 'Location' })
    ).toBeInTheDocument();
  });
});
