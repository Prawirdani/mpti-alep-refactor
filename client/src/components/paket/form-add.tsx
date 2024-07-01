import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorResponse } from '@/lib/fetcher';
import { usePaket } from '@/context/hooks';
import { PaketSchema, paketSchema } from '@/lib/schemas/paket';
import { Textarea } from '../ui/textarea';

export default function FormAddPaket() {
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { addPaket, invalidate } = usePaket();

  const form = useForm<PaketSchema>({
    resolver: zodResolver(paketSchema),
    defaultValues: {
      nama: '',
      deskripsi: '',
      harga: 0,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: PaketSchema) {
    try {
      const res = await addPaket(data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil menambahkan paket!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal menambahkan paket!', variant: 'destructive' });
    }
  }

  useEffect(() => {
    reset();
    setApiError(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger Button */}
      <Button className="space-x-1" onClick={() => setOpen(true)}>
        <Plus />
        <span>Paket</span>
      </Button>
      {/* Dialog Trigger Button */}

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
                <span>Tambah</span>
                {isSubmitting && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
