import { useModuleFns } from '../../components/module/moduleRenderer/moduleRenderer';

export function useEditable({ view, form }) {
  const { edit } = useModuleFns();

  return edit ? form : view;
}
