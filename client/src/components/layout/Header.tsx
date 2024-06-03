import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shadow-xl z-40 px-8 py-4">
      <div className="flex justify-between gap-2 w-full">
        <h1 className="text-primary font-bold text-xl">Sultan Barbershop</h1>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-primary font-semibold hover:text-secondary">
            Home
          </Link>
          <Link to="/about" className="text-primary font-semibold hover:text-secondary">
            About
          </Link>
          <Link to="/contact" className="text-primary font-semibold hover:text-secondary">
            Contact
          </Link>
          <Link to="/booking" className="text-primary font-semibold hover:text-secondary">
            Booking
          </Link>
        </div>
      </div>
    </header>
  );
}
