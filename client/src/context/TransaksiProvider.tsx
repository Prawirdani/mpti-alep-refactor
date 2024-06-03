import { Fetch } from '@/lib/fetcher';
import { TransaksiCreateSchema } from '@/lib/schemas/transaksi';
import { createContext, useEffect, useState } from 'react';

type TransaksiCtxType = {
  listTransaksi: Transaksi[];
  fetchTransaksi: () => Promise<void>;
  invalidate: () => Promise<void>;
  addTransaksi: (data: TransaksiCreateSchema) => Promise<Response>;
  completeTransaksi: (id: number) => Promise<Response>;
  cancelTransaksi: (id: number) => Promise<Response>;
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

  async function invalidate() {
    await fetchTransaksi();
  }

  async function addTransaksi(data: TransaksiCreateSchema) {
    return await Fetch('/api/transaksi', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_customer: data.namaCustomer,
        no_hp: data.noHp,
        paket_id: Number(data.paketId),
        karyawan_id: Number(data.karyawanId),
      }),
    });
  }

  async function completeTransaksi(id: number) {
    return await Fetch(`/api/transaksi/${id}/complete`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  async function cancelTransaksi(id: number) {
    return await Fetch(`/api/transaksi/${id}/cancel`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  return (
    <TransaksiCtx.Provider
      value={{ listTransaksi, fetchTransaksi, addTransaksi, invalidate, completeTransaksi, cancelTransaksi }}
    >
      <>{children}</>
    </TransaksiCtx.Provider>
  );
}
