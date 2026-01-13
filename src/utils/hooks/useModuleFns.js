import { useContext } from 'react';
import { EventContext } from '../../components/event/eventRenderer/eventRenderer';

export const useModuleFns = () => {
  const { mutableData, setStateData, edit } = useContext(EventContext);
  return {
    mutableData,
    setStateData,
    edit,
  };
};
