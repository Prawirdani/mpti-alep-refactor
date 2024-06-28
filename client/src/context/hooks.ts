import { useContext } from 'react';
import { AuthCtx } from './AuthProvider';
import { TransaksiCtx } from './TransaksiProvider';
import { PaketCtx } from './PaketProvider';
import { KaryawanCtx } from './KaryawanProvider';
import { UserCtx } from './UserProvider';

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return ctx;
};

export const useTransaksi = () => {
  const ctx = useContext(TransaksiCtx);
  if (ctx === undefined) {
    throw new Error('useTransaksi must be used within a TransaksiProvider');
  }
  return ctx;
};

export const usePaket = () => {
  const ctx = useContext(PaketCtx);
  if (ctx === undefined) {
    throw new Error('usePaket must be used within a PaketProvider');
  }
  return ctx;
};

export const useKaryawan = () => {
  const ctx = useContext(KaryawanCtx);
  if (ctx === undefined) {
    throw new Error('useKaryawan must be used within a KaryawanProvider');
  }
  return ctx;
};

export const useUser = () => {
  const ctx = useContext(UserCtx);
  if (ctx === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};
