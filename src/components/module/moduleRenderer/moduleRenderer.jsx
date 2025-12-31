import { componentMap } from '../../../utils/componentMap/ComponentMap';

export function ModuleRenderer({ data }) {
  const Module = componentMap.module[data.type];
  if (!Module) {
    console.error(`warrning unknown module: ${data.type}`);
    return null;
  }
  return <Module {...data.data} />;
}
