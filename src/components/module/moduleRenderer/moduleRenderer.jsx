import { componentMap } from '../../../utils/componentMap/ComponentMap';
import { useContext } from 'react';
import { EventContext } from '../../event/eventRenderer/eventRenderer';

export const useModuleFns = () => {
  const { setStateData, edit } = useContext(EventContext);
};

export function ModuleRenderer({ data }) {
  const Module = componentMap.module[data.type];
  if (!Module) {
    console.error(`warning unknown module: ${data.type}`);
    return null;
  }
  return <Module {...data.data} />;
}
