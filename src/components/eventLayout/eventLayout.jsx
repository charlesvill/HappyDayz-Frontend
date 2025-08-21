import { FooterEvent } from './footer_event/footerEvent';
import { HeaderEvent } from './header_event/headerEvent';

export function EventLayout() {
  return (
    <>
      <FooterEvent />
      <main>Outlet goes here</main>
      <HeaderEvent />
    </>
  );
}
