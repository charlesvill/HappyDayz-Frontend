import { createContext, useContext } from 'react';

export const ModuleContext = createContext();

export function useModuleContext() {
  const ctx = useContext(ModuleContext);
  if (!ctx) {
    throw new Error('Error! useModuleContext missing property or provider!');
  }
  return ctx;
}
