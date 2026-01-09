import { useState, useContext } from 'react';
import { apiFetch, serverHostName } from '../../utils/apiUtils';
import { Authorization } from '../../utils/auth/authProvider';
import { eventInitialize } from '../../utils/helpers/eventDataInit';

export function EventForm() {
  const [formFields, setFormFields] = useState({});
  const { user, setError } = useContext(Authorization);

  const url = serverHostName() + '/event/' + user.id;

  function handleInput(e) {
    const fieldname = e.target.id;
    const value = e.target.value;

    setFormFields({ ...formFields, [fieldname]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // to refactor: formFields need to go through eventBuilder fn to build json data that will be sent to db.

    try {
      const eventData = eventInitialize(formFields);
      await apiFetch(url, user.token, eventData, 'POST');
    } catch (err) {
      setError(err);
    }
  }

  return (
    <section>
      <header>
        <h2>New Event</h2>
        {user.first_name}
      </header>
      <article>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Event Name</label>
          <input
            type="text"
            id="name"
            value={formFields.name}
            onChange={handleInput}
          />
          <label htmlFor="description">Describe your event</label>
          <input
            type="text"
            id="description"
            value={formFields.description}
            onChange={handleInput}
          />
          <label htmlFor="startDate">When does your event begin?</label>
          <input
            type="text"
            id="startDate"
            value={formFields.startDate}
            onChange={handleInput}
          />
          <label htmlFor="endDate">When does your event end?</label>
          <input
            type="text"
            id="endDate"
            value={formFields.endDate}
            onChange={handleInput}
          />
          <label htmlFor="location">Where does your event take place</label>
          <input
            type="text"
            id="location"
            value={formFields.location}
            onChange={handleInput}
          />
          <button type="submit">Create Event</button>
        </form>
      </article>
    </section>
  );
}

// name
// description
// startDate
// endDate
// location
