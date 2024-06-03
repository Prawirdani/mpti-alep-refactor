import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';

export default function AboutPage() {
  return (
    <>
      <TitleSetter title="Sultan Barbershop | About" />
      <section className="flex-grow flex place-items-center">
        <H2 className="mt-auto mx-auto text-primary">This Is About Page</H2>
      </section>
    </>
  );
}
