import { createContext, useContext } from 'react';

export const EventContext = createContext();

export function useEventContext() {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('Error! useEventContext missing property or provider!');
  }
  return ctx;
}
