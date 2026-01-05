import { componentMap } from '../../../utils/componentMap/ComponentMap';

export function ModuleRenderer({ data }) {
  const Module = componentMap.module[data.type];
  console.log(data.title);
  if (!Module) {
    console.error(`warning unknown module: ${data.type}`);
    return null;
  }
  return <Module {...data.data} />;
}
