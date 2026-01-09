import { useFetchData } from '../../../utils/hooks/useFetchData';
import { serverHostName } from '../../../utils/apiUtils';
import { useContext, useState, useEffect, createContext } from 'react';
import { Authorization } from '../../../utils/auth/authProvider';
import { useParams, useSearchParams } from 'react-router-dom';
import { Event } from '../../../pages/event/event';

export const EventContext = createContext();

export function EventRenderer() {
  // event/userid/eventid

  const { user } = useContext(Authorization);
  const [stageData, setStageData] = useState({});
  const [localData, setLocalData] = useState({});
  const { eventid } = useParams();
  // url query param of /?edit => truthy
  const edit = useSearchParams.has('edit');

  // pass the fn and mode in the context
  // individual modules will pull the mode and data setter fn from context
  // each module
  const url = serverHostName() + `/event/${user.id}/${eventid}`;
  console.log('url is: ', url);
  const { loading, data } = useFetchData(url, eventid);

  useEffect(() => {
    const local = localData.getItem('localEvent');
    if (local) {
      // check timestamp localStorage and stageData
      // if stage data has newer time, update
      // the local data
    } else {
      localStorage.setItem('localEvent', data);
      setLocalData(data);
    }
  }, [stageData]);

  const eventContextValue = {
    setStageData,
    edit,
  };

  return (
    <>
      <EventContext.Provider value={eventContextValue}>
        {!loading ? <Event data={data} /> : <section>Loading...</section>}
      </EventContext.Provider>
    </>
  );
}
