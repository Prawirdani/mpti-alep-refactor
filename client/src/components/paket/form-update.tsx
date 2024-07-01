import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PaketSchema, paketSchema } from '@/lib/schemas/paket';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { isErrorResponse } from '@/lib/fetcher';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { usePaket } from '@/context/hooks';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  updateTarget: Paket;
}

export default function FormUpdatePaket({ open, setOpen, updateTarget }: Props) {
  const [apiError, setApiError] = useState<string | null>(null);

  const { updatePaket, invalidate } = usePaket();

  const form = useForm<PaketSchema>({
    resolver: zodResolver(paketSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: PaketSchema) {
    try {
      const res = await updatePaket(updateTarget.id, data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil update paket!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal update paket!', variant: 'destructive' });
    }
  }

  useEffect(() => {
    reset({
      nama: updateTarget.nama,
      harga: updateTarget.harga,
      deskripsi: updateTarget.deskripsi,
    });
    setApiError(null);
  }, [open, updateTarget]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Tambah Paket</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 col-span-2 mb-4">
              <FormField
                control={control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nama">Nama Paket</FormLabel>
                    <FormControl>
                      <Input id="nama" placeholder="Masukkan nama paket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="harga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="harga">Harga Paket</FormLabel>
                    <FormControl>
                      <Input
                        id="harga"
                        placeholder="Masukkan harga paket"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="deskripsi">Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea id="deskripsi" placeholder="Masukkan deskripsi paket" {...field} />
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
