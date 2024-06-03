import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';

export default function ContactPage() {
  return (
    <>
      <TitleSetter title="Sultan Barbershop | Contact" />
      <section className="flex-grow flex place-items-center">
        <H2 className="mt-auto mx-auto text-primary">This Is Contact Page</H2>
      </section>
    </>
  );
}
