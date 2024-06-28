import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { isErrorResponse } from '@/lib/fetcher';
import { Loader2 } from 'lucide-react';
import { useKaryawan } from '@/context/hooks';
import { KaryawanSchema, karyawanSchema } from '@/lib/schemas/karyawan';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  updateTarget: Karyawan;
}

export default function FormUpdateKaryawan({ open, setOpen, updateTarget }: Props) {
  const [apiError, setApiError] = useState<string | null>(null);

  const { updateKaryawan, invalidate } = useKaryawan();

  const form = useForm<KaryawanSchema>({
    resolver: zodResolver(karyawanSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: KaryawanSchema) {
    try {
      const res = await updateKaryawan(updateTarget.id, data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil update data karyawan!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal update data karyawan!', variant: 'destructive' });
    }
  }

  useEffect(() => {
    reset({
      nama: updateTarget.nama,
      handphone: updateTarget.handphone,
    });
    setApiError(null);
  }, [open, updateTarget]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Update Data Karyawan</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 col-span-2 mb-4">
              <FormField
                control={control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nama">Nama Karyawan</FormLabel>
                    <FormControl>
                      <Input id="nama" placeholder="Masukkan nama karyawan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="handphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="handphone">Handphone</FormLabel>
                    <FormControl>
                      <Input id="handphone" placeholder="Masukkan no handphone karyawan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {apiError && <p className="text-destructive text-sm text-end mb-4">{apiError}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                <span>Simpan</span>
                {isSubmitting && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
