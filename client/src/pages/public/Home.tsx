import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';

export default function HomePage() {
  return (
    <>
      <TitleSetter title="Sultan Barbershop | Home" />
      <section className="flex-grow flex place-items-center">
        <H2 className="mt-auto mx-auto text-primary">This Is Home Page</H2>
      </section>
    </>
  );
}
