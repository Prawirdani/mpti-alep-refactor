import { Fetch } from '@/lib/fetcher';
import { createContext, useEffect, useState } from 'react';

type PaketCtxType = {
  listPaket: Paket[];
  fetchPaket: () => Promise<void>;
};

export const PaketCtx = createContext<PaketCtxType | undefined>(undefined);

export default function TransaksiProvider({ children }: { children: React.ReactNode }) {
  const [listPaket, setListPaket] = useState<Paket[]>([]);

  useEffect(() => {
    console.log('PaketProvider.tsx: useEffect()');
  }, []);

  async function fetchPaket() {
    const res = await Fetch('/api/paket', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const resBody = (await res.json()) as { data: Paket[] };
      setListPaket(resBody.data);
    }
  }

  return (
    <PaketCtx.Provider value={{ listPaket, fetchPaket }}>
      <>{children}</>
    </PaketCtx.Provider>
  );
}
