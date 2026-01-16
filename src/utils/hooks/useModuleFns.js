import { useContext } from 'react';
import { EventContext } from '../../components/event/eventRenderer/eventRenderer';

export const useModuleFns = () => {
  const { mutableData, setStageData, editMode } = useContext(EventContext);

  const updateObj = (data, pageId, moduleId, fields, setterFn) => {
    const newData = {
      ...data,
      pages: data.pages.map((page) =>
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

    setterFn(newData);
  };

  return {
    mutableData,
    setStageData,
    editMode,
    updateObj,
  };
};
