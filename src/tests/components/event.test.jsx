import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { dummyData } from '../dummyResponse';
import { Event } from '../../pages/event/event';

describe('Event renderer works', () => {
  screen.debug();

  it('renders page nav buttons', () => {
    render(<Event data={dummyData} />);
    ['Home', 'Location'].forEach((title) => {
      expect(screen.getByRole('button', { name: title })).toBeInTheDocument();
    });
  });
});
