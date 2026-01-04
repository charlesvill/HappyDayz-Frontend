import { useFetchData } from '../../../utils/hooks/useFetchData';
import { serverHostName } from '../../../utils/apiUtils';
import { useContext } from 'react';
import { Authorization } from '../../../utils/auth/authProvider';
import { useParams } from 'react-router-dom';
import { Event } from '../../../pages/event/event';

export function EventRenderer() {
  // pull event id from url params
  // useEffect to pull event data
  // pass event data and return event component

  // event/userid/eventid
  const { user } = useContext(Authorization);
  const { eventid } = useParams();

  const url = serverHostName() + `/event/${user.id}/${eventid}`;
  console.log('url is: ', url);
  const { loading, data } = useFetchData(url, eventid);
  return !loading ? <Event data={data} /> : <section>Loading...</section>;
}
