import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { isErrorResponse } from '@/lib/fetcher';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/context/hooks';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function FormDeleteUser({ open, setOpen, id }: Props) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { deleteUser, invalidate } = useUser();

  async function handleDelete() {
    try {
      setLoading(true);
      const res = await deleteUser(id);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil hapus akun pengguna!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal hapus akun pengguna!', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setApiError(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] px-8">
        <DialogHeader className="mb-4">
          <DialogTitle>Hapus Akun</DialogTitle>
        </DialogHeader>
        <p>Apakah anda yakin ingin menghapus akun pengguna ini?</p>
        {apiError && <p className="text-destructive text-sm text-end mb-4">{apiError}</p>}
        <div className="flex justify-end">
          <Button disabled={loading} onClick={handleDelete}>
            <span>Ya</span>
            {loading && <Loader2 className="ml-2 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
