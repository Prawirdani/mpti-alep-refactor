import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';

export default function AkunPage() {
  return (
    <section>
      <TitleSetter title="Dashboard | Manajemen Akun" />
      <div className="mb-4">
        <H2>Manajemen Akun</H2>
        <p>Kelola Akun Pengguna Sistem</p>
      </div>
    </section>
  );
}
