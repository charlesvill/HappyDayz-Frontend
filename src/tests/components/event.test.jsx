import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dummyData } from '../dummyResponse';
import { Event } from '../../pages/event/event';

describe('Event renderer works', () => {

  beforeEach(() => {
    render(<Event data={dummyData} />);
  });

  it('renders page nav buttons', () => {
    ['Home', 'Location'].forEach((title) => {
      expect(screen.getByRole('button', { name: title })).toBeInTheDocument();
    });
  });

  it('renders location page on button click', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Location' });

    await user.click(button);

    expect(screen.getByRole('heading').textContent).toMatch(/Address/);
  });
});
