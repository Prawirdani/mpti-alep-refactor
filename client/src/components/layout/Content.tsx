import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function PublicContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-12 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
