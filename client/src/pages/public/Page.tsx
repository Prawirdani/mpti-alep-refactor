import './style.css';
import TitleSetter from '@/components/pageTitle';
import { H1 } from '@/components/typography';
import Header from './header';
import Footer from './footer';
import HeroImage from '@/assets/bghero1.jpg';
import BGAbout from '@/assets/aboutb.jpeg';
import StoreImage from '@/assets/depan1.jpeg';
import PriceListImage from '@/assets/price1.jpeg';
import { createContext, useContext, useRef } from 'react';
import ArtistCard from './hair-artist-card';
import ArtistImage1 from '@/assets/artist1.jpeg';
import ArtistImage2 from '@/assets/artist2.jpeg';
import BookingForm from './booking-form';

type PublicPageContext = {
  heroSection: React.RefObject<HTMLElement>;
  aboutSection: React.RefObject<HTMLElement>;
  artistSection: React.RefObject<HTMLElement>;
  priceSection: React.RefObject<HTMLElement>;
  contactSection: React.RefObject<HTMLElement>;
  bookingSection: React.RefObject<HTMLElement>;
};

const PageCtx = createContext<PublicPageContext | undefined>(undefined);

export const usePublicPage = () => {
  const ctx = useContext(PageCtx);
  if (!ctx) {
    throw new Error('usePublicPage must be used within PublicPageProvider');
  }
  return ctx;
};

export default function PublicPage() {
  const heroSection = useRef<HTMLElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const artistSection = useRef<HTMLElement>(null);
  const priceSection = useRef<HTMLElement>(null);
  const contactSection = useRef<HTMLElement>(null);
  const bookingSection = useRef<HTMLElement>(null);

  return (
    <PageCtx.Provider
      value={{
        heroSection,
        aboutSection,
        artistSection,
        priceSection,
        contactSection,
        bookingSection,
      }}
    >
      <div className="public-page">
        <TitleSetter title="Sultan Barbershop" />
        <Header />
        <div>
          {/* Hero Section */}
          <section
            ref={heroSection}
            className="section bg-cover bg-center bg-no-repeat hero-mask"
            style={{
              backgroundImage: `url(${HeroImage})`,
            }}
          >
            <div className="mx-auto text-center">
              <h1 className="text-white font-bold text-[2em] md:text-[3em] xl:text-[5em]">
                ACHIEVE YOUR <span className="text-public-primary">Style</span>
              </h1>
              <p className="text-white md:text-xl xl:text-3xl">We'll create your best images</p>
            </div>
          </section>
          {/* End Hero Section */}

          {/* About Section */}
          <section
            style={{
              backgroundImage: `url(${BGAbout})`,
            }}
            ref={aboutSection}
            className="section bg-cover bg-center bg-no-repeat about-mask "
          >
            <H1 className="mx-auto">
              <span className="text-public-primary">Tentang</span> kami
            </H1>
            <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-20 2xl:gap-x-24 items-center">
              <img src={StoreImage} alt="Store Image" className="flex-grow h-96 rounded-md" />
              <div className="text-justify lg:text-xl [&>p]:leading-relaxed lg:w-3/5 space-y-4">
                <p>
                  Sultan Barbershop adalah destinasi utama bagi pria yang mengutamakan penampilan dan perawatan rambut
                  yang berkualitas. Didirikan dengan semangat untuk menghadirkan pengalaman potong rambut yang tak
                  tertandingi. Kami memadukan keahlian tata rias rambut terkini dengan sentuhan khas keramahan dan
                  kenyamanan untuk menciptakan lingkungan yang ramah dan santai.
                </p>
                <p>
                  Dengan suasana yang hangat dan layanan yang personal, kami bertujuan untuk menjadikan kunjungan Anda
                  ke Sultan Barbershop sebagai pengalaman yang menyenangkan dan memuaskan. Terima kasih telah memilih
                  Sultan Barbershop sebagai tujuan Anda untuk perawatan rambut. Kami berharap dapat menyambut Anda
                  dengan senyuman hangat dan memberikan layanan yang melebihi ekspektasi Anda setiap kali Anda
                  mengunjungi kami. Salam hangat, Tim Sultan Barbershop
                </p>
              </div>
            </div>
          </section>
          {/* End About Section */}

          {/* Artist Section */}
          <section ref={artistSection} className="section">
            <H1>
              Our Hair <span className="text-public-primary">Artist</span>
            </H1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 h-3/4 w-fit ">
              <ArtistCard
                image={ArtistImage1}
                name="John Doe"
                description="Experienced in men's grooming and classic cuts"
              />
              <ArtistCard
                image={ArtistImage2}
                name="Jane Smith"
                description="Specializes in modern hairstyles and creative cuts"
              />
              <ArtistCard
                image={ArtistImage2}
                className=""
                name="Arishandi"
                description="Specializes in modern hairstyles and creative cuts"
              />
            </div>
          </section>
          {/* End Artist Section */}

          {/* PriceList Section */}
          <section ref={priceSection} className="section">
            <H1 className="mx-auto text-public-primary">Pricelist</H1>
            <img src={PriceListImage} alt="PriceList" className="object-cover lg:h-[600px] overflow-hidden" />
          </section>
          {/* End PriceList Section */}

          {/* Contact Section */}
          <section ref={contactSection} className="section">
            <H1 className="mx-auto">
              <span className="text-public-primary">Kontak</span> kami
            </H1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9304803580317!2d106.92219007475222!3d-6.402958493587724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699544b007dcdd%3A0x8343edc2cfa5486d!2sSultan%20barbershop%20%26Maris%20Hijab!5e0!3m2!1sid!2sid!4v1711630480872!5m2!1sid!2sid"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </section>
          {/* End Contact Section */}

          {/* Booking Section */}
          <section ref={bookingSection} className="section">
            <H1 className="mx-auto text-public-primary">Booking</H1>
            <BookingForm />
          </section>
          {/* End Booking Section */}
        </div>

        <Footer />
      </div>
    </PageCtx.Provider>
  );
}
