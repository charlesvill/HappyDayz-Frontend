import { useModuleContext } from '../../../utils/hooks/useModuleContext';
import { useEventContext } from '../../../utils/hooks/useEventContext';
import { useModuleFns } from '../../../utils/hooks/useModuleFns';
import { useState } from 'react';

export default function Heading({ size, text }) {
  const { localData, editMode } = useEventContext();
  const { pageId, moduleId } = useModuleContext();
  const { setStageData, cycleEdit, updateObj } = useModuleFns();

  const [fields, setFields] = useState({ size, text });

  function handleInput(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function commit() {
    updateObj(localData, pageId, moduleId, fields, setStageData);
  }

  if (!editMode) {
    const Tag = `h${size}`;
    return <Tag onClick={cycleEdit}>{text}</Tag>;
  }

  return (
    <>
      <input
        type="text"
        name="text"
        value={fields.text}
        onChange={handleInput}
        onBlur={commit}
      />
      <input
        type="number"
        name="size"
        value={fields.size}
        onChange={handleInput}
        onBlur={commit}
      />
    </>
  );
}
