import { Fetch } from '@/lib/fetcher';
import { createContext, useEffect, useState } from 'react';

type KaryawanCtxType = {
  listKaryawan: Karyawan[];
  fetchKaryawan: () => Promise<void>;
};

export const KaryawanCtx = createContext<KaryawanCtxType | undefined>(undefined);

export default function KaryawanProvider({ children }: { children: React.ReactNode }) {
  const [listKaryawan, setListTransaksi] = useState<Karyawan[]>([]);

  useEffect(() => {
    console.log('TransaksiProvider.tsx: useEffect()');
  }, []);

  async function fetchKaryawan() {
    const res = await Fetch('/api/karyawan', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const resBody = (await res.json()) as { data: Karyawan[] };
      setListTransaksi(resBody.data);
    }
  }

  return (
    <KaryawanCtx.Provider value={{ listKaryawan, fetchKaryawan }}>
      <>{children}</>
    </KaryawanCtx.Provider>
  );
}
