import { useModuleFns } from '../moduleRenderer/moduleRenderer';
import { useState } from 'react';

export default function Heading({ size, text }) {
  const { setStateData, edit } = useModuleFns();
  function View() {
    const Tag = `h${size}`;
    return <Tag>{text}</Tag>;
  }

  function Form() {
    const [fields, setFields] = useState('');
    function handleInput(e) {
      const fieldName = e.target.id;
      const value = e.target.value;

      setFields({ ...fields, [fieldName]: value });
    }

    // now the function that handles when and how often setStateData is called

    return <input type="text" id={`h${size}`} />;
  }
  return edit ? <Form /> : <View />;
}
