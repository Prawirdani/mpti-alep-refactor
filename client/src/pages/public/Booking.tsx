import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';

export default function BookingPage() {
  return (
    <>
      <TitleSetter title="Sultan Barbershop | Booking" />
      <section className="flex-grow flex place-items-center">
        <H2 className="mt-auto mx-auto text-primary">This Is Booking Page</H2>
      </section>
    </>
  );
}
