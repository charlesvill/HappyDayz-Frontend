import { useModuleContext } from '../../../utils/hooks/useModuleContext';
import { useModuleFns } from '../../../utils/hooks/useModuleFns';
import { useState } from 'react';

export default function Heading({ size, text }) {
  const { pageId, moduleId } = useModuleContext();
  const { localData, setStageData, edit } = useModuleFns();
  function View() {
    const Tag = `h${size}`;
    return <Tag>{text}</Tag>;
  }

  function Form() {
    const [fields, setFields] = useState({ size: size, text: text });

    function updateObj() {
      const newData = {
        ...localData,
        pages: localData.pages.map((page) =>
          page.id !== pageId
            ? page
            : {
                ...page,
                modules: page.modules.map((module) =>
                  module.id !== moduleId
                    ? module
                    : {
                        ...module,
                        data: {
                          ...fields,
                        },
                      }
                ),
              }
        ),
      };
      setStageData(newData);
    }

    function handleInput(e) {
      const fieldName = e.target.id;
      const value = e.target.value;

      setFields({ ...fields, [fieldName]: value });
    }

    // need to write how often data gets updated to the parent

    return (
      <>
        <input type="text" id={`h${size}`} value={fields.test} />
        <input type="number" id={'size'} value={fields.size} />
      </>
    );
    // clicking on the field triggers the slider button
  }
  return edit ? <Form /> : <View />;
}
