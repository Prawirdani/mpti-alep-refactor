import { Fetch } from '@/lib/fetcher';
import { KaryawanSchema } from '@/lib/schemas/karyawan';
import { createContext, useState } from 'react';

type KaryawanCtxType = {
  listKaryawan: Karyawan[];
  fetchKaryawan: () => Promise<void>;
  invalidate: () => Promise<void>;
  addKaryawan: (data: KaryawanSchema) => Promise<Response>;
  updateKaryawan: (id: number, data: KaryawanSchema) => Promise<Response>;
  deleteKaryawan: (id: number) => Promise<Response>;
};

export const KaryawanCtx = createContext<KaryawanCtxType | undefined>(undefined);

export default function KaryawanProvider({ children }: { children: React.ReactNode }) {
  const [listKaryawan, setListTransaksi] = useState<Karyawan[]>([]);

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

  async function invalidate() {
    await fetchKaryawan();
  }

  async function addKaryawan(data: KaryawanSchema) {
    return await Fetch('/api/karyawan', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function updateKaryawan(id: number, data: KaryawanSchema) {
    return await Fetch(`/api/karyawan/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function deleteKaryawan(id: number) {
    return await Fetch(`/api/karyawan/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  return (
    <KaryawanCtx.Provider
      value={{ listKaryawan, fetchKaryawan, invalidate, addKaryawan, updateKaryawan, deleteKaryawan }}
    >
      <>{children}</>
    </KaryawanCtx.Provider>
  );
}
