import { describe, it, expect, vi } from 'vitest';

vi.mock('../../utils/hooks/useEventContext', () => ({
  useEventContext: vi.fn(),
}));

import { useModuleFns } from '../../utils/hooks/useModuleFns';
import { dummyData } from '../dummyResponse';
import { useEventContext } from '../../utils/hooks/useEventContext';

describe('Module Functions', () => {
  it('updates data without data loss', () => {
    useEventContext.mockReturnValue({
      localData: '',
      editMode: true,
    });

    // declare necessary parameters
    const { updateObj } = useModuleFns();
    const pageId = 0;
    const moduleId = 0;
    const fields = {
      size: 4,
      text: 'hello world',
    };

    expect(dummyData.pages[0].modules[0].data.size).toBe(1);
    expect(dummyData.pages[0].modules[0].data.text).toBe('birthday');

    const newData = updateObj(dummyData, pageId, moduleId, fields);

    expect(newData.pages[0].modules[0].data.size).toBe(4);
    expect(newData.pages[0].modules[0].data.text).toBe('hello world');
    expect(newData.pages[1].modules[0].data.text).toBe('Address');

    // read another part, like another page, a particular module is present
    // pass to fn
    // read that new fields are present
  });
});import { useEventContext, useEventContext } from '../../utils/hooks/useEventContext';
