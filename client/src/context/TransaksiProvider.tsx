import { Fetch } from '@/lib/fetcher';
import { createContext, useEffect, useState } from 'react';

type TransaksiCtxType = {
  listTransaksi: Transaksi[];
  fetchTransaksi: () => Promise<void>;
};

export const TransaksiCtx = createContext<TransaksiCtxType | undefined>(undefined);

export default function TransaksiProvider({ children }: { children: React.ReactNode }) {
  const [listTransaksi, setListTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    console.log('TransaksiProvider.tsx: useEffect()');
  }, []);

  async function fetchTransaksi() {
    const res = await Fetch('/api/transaksi', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const resBody = (await res.json()) as { data: Transaksi[] };
      setListTransaksi(resBody.data);
    }
  }

  return (
    <TransaksiCtx.Provider value={{ listTransaksi, fetchTransaksi }}>
      <>{children}</>
    </TransaksiCtx.Provider>
  );
}
