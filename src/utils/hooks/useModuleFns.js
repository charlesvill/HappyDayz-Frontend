import { useEventContext } from './useEventContext';

export const useModuleFns = () => {
  const { setStageData, cycleEdit } = useEventContext();

  const updateObj = (data, pageId, moduleId, fields) => {
    return {
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
  };

  return {
    setStageData,
    updateObj,
    cycleEdit,
  };
};
