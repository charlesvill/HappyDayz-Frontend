import { useState } from 'react';
import { ModuleRenderer } from '../../components/module/moduleRenderer/moduleRenderer';

export function Event({ data }) {
  const [active, setActive] = useState(data.pages[0]);
  console.log(data.pages);
  const pageTabs = data.pages.map((page) => page.title).filter(Boolean);
  console.log("page tabs: ", pageTabs);
  console.log(active);
  const renderedPage = active.modules.map((module) => (
    <section key={module.id}>
      <ModuleRenderer data={module} />
    </section>
  ));

  function handlePageSetActive(e) {
    const selection = e.target.id;
    if (selection === active.title) {
      return;
    }

    const nextPage = data.pages.find((page) => page.title === selection);

    if (!nextPage) {
      console.error('next page not found!');
      return;
    }
    setActive();
  }

  return (
    <article>
      <nav>
        <ul>
          {pageTabs.map((tab) => (
            <li key={tab}>
              <button id={tab} onClick={handlePageSetActive}>
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <section>{renderedPage}</section>
    </article>
  );
}

// module builder
