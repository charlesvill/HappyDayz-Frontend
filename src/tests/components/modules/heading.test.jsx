import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Heading } from '../../../components/module';

vi.mock('../../../utils/hooks/useModuleContext', () => ({
  useModuleContext: vi.fn(),
}));

vi.mock('../../../utils/hooks/useModuleFns', () => ({
  useModuleFns: vi.fn(),
}));

vi.mock('../../../utils/hooks/useEventContext', () => ({
  useEventContext: vi.fn(),
}));

import { useModuleContext } from '../../../utils/hooks/useModuleContext';
import { useModuleFns } from '../../../utils/hooks/useModuleFns';
import { useEventContext } from '../../../utils/hooks/useEventContext';

describe('Heading', () => {
  const exData = { size: 2, text: 'this is test' };

  it('renders inputs when editMode is true', () => {
    useEventContext.mockReturnValue({
      localData: exData,
      editMode: true,
    });
    useModuleContext.mockReturnValue({
      pageId: 1,
      moduleId: 1,
    });
    useModuleFns.mockReturnValue({
      setStageData: vi.fn(),
      updateObj: vi.fn(),
    });

    render(<Heading size={exData.size} text={exData.text} />);

    expect(screen.getByRole('textbox')).toHaveValue(exData.text);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('calls cycleEdit when heading is clicked', async () => {
    const cycleEdit = vi.fn();

    useEventContext.mockReturnValue({
      localData: exData,
      editMode: false,
    });
    useModuleContext.mockReturnValue({
      pageId: 1,
      moduleId: 1,
    });
    useModuleFns.mockReturnValue({
      setStageData: vi.fn(),
      updateObj: vi.fn(),
      cycleEdit,
    });

    render(<Heading size={exData.size} text={exData.text} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('heading'));

    expect(cycleEdit).toHaveBeenCalledTimes(1);
  });
});

