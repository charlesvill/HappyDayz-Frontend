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
  const [stageData, setStageData] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [unSavedChanges, setUnSavedChanges] = useState(false);
  const { eventid } = useParams();
  // url query param of /?edit => truthy
  const editMode = useSearchParams.has('edit');

  // individual modules will pull the mode and data setter fn from context
  // each module
  const url = serverHostName() + `/event/${user.id}/${eventid}`;
  console.log('url is: ', url);
  const { loading, data } = useFetchData(url, eventid);

  useEffect(() => {
    // init effect
    // come back here to see if I need check for unsaved progress from ls
    if (data) {
      data.localTimeStamp = new Date().toISOString();
      localStorage.setItem(`localEvent:${eventid}`, JSON.stringify(data));
      setLocalData(data);
    } else if (localStorage.getItem(`localEvent:${eventid}`)) {
      setUnSavedChanges(true);
    }
  }, [data]);

  useEffect(() => {
    // mutation effect
    if (stageData) {
      // check timestamp localStorage and stageData
      // if stage data has newer time, update
      // the local data

      const local = localStorage.getItem(`localEvent:${eventid}`);
      if (local) {
        const lsData = JSON.parse(local);
        if (stageData.localTimeStamp > lsData.localTimeStamp) {
          setLocalData(stageData);
          localStorage.setItem(
            `localEvent:${eventid}`,
            JSON.stringify(stageData)
          );
        }
      }
    }
  }, [stageData]);

  const eventContextValue = {
    localData,
    setStageData,
    editMode,
  };

  return (
    <>
      <EventContext.Provider value={eventContextValue}>
        {!loading ? <Event data={data} /> : <section>Loading...</section>}
      </EventContext.Provider>
    </>
  );
}
