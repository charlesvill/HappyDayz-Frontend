import { FooterEvent } from './footer_event/footerEvent';
import { HeaderEvent } from './header_event/headerEvent';

export function EventLayout() {
  return (
    <>
      <HeaderEvent />
      <main>Outlet goes here</main>
      <FooterEvent />
    </>
  );
}
