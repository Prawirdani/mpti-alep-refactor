import { Fetch } from '@/lib/fetcher';
import { PaketSchema } from '@/lib/schemas/paket';
import { createContext, useState } from 'react';

type PaketCtxType = {
  listPaket: Paket[];
  fetchPaket: () => Promise<void>;
  addPaket: (data: PaketSchema) => Promise<Response>;
  updatePaket: (id: number, data: PaketSchema) => Promise<Response>;
  deletePaket: (id: number) => Promise<Response>;
  invalidate: () => Promise<void>;
};

export const PaketCtx = createContext<PaketCtxType | undefined>(undefined);

export default function TransaksiProvider({ children }: { children: React.ReactNode }) {
  const [listPaket, setListPaket] = useState<Paket[]>([]);

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

  async function addPaket(data: PaketSchema) {
    return await Fetch('/api/paket', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function updatePaket(id: number, data: PaketSchema) {
    return await Fetch(`/api/paket/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function deletePaket(id: number) {
    return await Fetch(`/api/paket/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async function invalidate() {
    await fetchPaket();
  }

  return (
    <PaketCtx.Provider
      value={{
        listPaket,
        fetchPaket,
        addPaket,
        updatePaket,
        deletePaket,
        invalidate,
      }}
    >
      <>{children}</>
    </PaketCtx.Provider>
  );
}
