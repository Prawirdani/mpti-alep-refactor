import { Link } from 'react-router-dom';
import { usePublicPage } from './Page';

export default function Header() {
  return (
    <header className="shadow-xl z-40 px-4 md:px-8 xl:px-32 h-16 md:h-20 fixed top-0 left-0 right-0 flex justify-between items-center bg-black">
      <div className="text-white flex justify-between gap-2 w-full">
        <Link to="/" className="font-bold md:text-2xl lg:text-3xl tracking-wide">
          Sultan <span className="text-public-primary">Barbershop</span>
        </Link>
        <LinkItems />
      </div>
    </header>
  );
}

function LinkItems() {
  const { heroSection, aboutSection, artistSection, priceSection, contactSection, bookingSection } = usePublicPage();

  function scrollSection(ref: React.RefObject<any>) {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <ul className="hidden lg:flex gap-4 items-center [&>li]:text-xl [&>li]:transition-colors [&>li]:duration-300 [&>li]:font-medium">
      <li onClick={() => scrollSection(heroSection)} className="nav-li">
        Home
      </li>
      <li onClick={() => scrollSection(aboutSection)} className="nav-li">
        About
      </li>
      <li onClick={() => scrollSection(artistSection)} className="nav-li">
        HairArtist
      </li>
      <li onClick={() => scrollSection(priceSection)} className="nav-li">
        PriceList
      </li>
      <li onClick={() => scrollSection(contactSection)} className="nav-li">
        Contact
      </li>
      <li onClick={() => scrollSection(bookingSection)} className="nav-li">
        Booking
      </li>
    </ul>
  );
}
