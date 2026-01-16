import { useModuleContext } from '../../../utils/hooks/useModuleContext';
import { useModuleFns } from '../../../utils/hooks/useModuleFns';
import { useState } from 'react';

export default function Heading({ size, text }) {
  const { pageId, moduleId } = useModuleContext();
  const { localData, setStageData, editMode, updateObj } = useModuleFns();

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
    return <Tag>{text}</Tag>;
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
