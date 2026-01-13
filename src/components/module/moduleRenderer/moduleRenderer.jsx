import { componentMap } from '../../../utils/componentMap/ComponentMap';

export function ModuleRenderer({ type, data }) {
  const Module = componentMap.module[type];
  if (!Module) {
    console.error(`warning unknown module: ${type}`);
    return null;
  }
  return <Module {...data} />;
}
