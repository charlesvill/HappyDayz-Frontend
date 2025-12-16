import { useState } from 'react';
import { ModuleBuilder } from '../../components/module/moduleBuilder/moduleBuilder';

// current build is to have data passed as prop for testing template and builder fns
//
//production build will pull data by event id

function handlePageSetActive() { }

export function Event({ data }) {
  const [active, setActive] = useState(data.pages[0]);
  const pageTabNames = data.pages.map((page) => page.title).filter(Boolean);
  const renderedPage = active.modules.map((module) => (
    <section>{ModuleBuilder(module.data)}</section>
  ));
  return <article></article>;
}

// module builder
