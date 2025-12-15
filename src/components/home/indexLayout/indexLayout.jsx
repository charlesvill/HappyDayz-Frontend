import { Outlet } from 'react-router-dom';
import { FooterIndex } from './footer_index/footerIndex';
import { HeaderIndex } from './header_index/headerIndex';

export function IndexLayout() {
  return (
    <>
      <FooterIndex />
      <main>
        this is where the outlet container goes dont forget the outlet needs the
        context such as user
        <Outlet />
      </main>
      <HeaderIndex />
    </>
  );
}
