import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorResponse } from '@/lib/fetcher';
import { useKaryawan, usePaket, useTransaksi } from '@/context/hooks';
import { TransaksiCreateSchema, transaksiCreateSchema } from '@/lib/schemas/transaksi';

export default function FormAddTransaksi() {
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { addTransaksi, invalidate } = useTransaksi();
  const { listPaket } = usePaket();
  const { listKaryawan } = useKaryawan();

  const form = useForm<TransaksiCreateSchema>({
    resolver: zodResolver(transaksiCreateSchema),
    defaultValues: {
      namaCustomer: '',
      noHp: '',
      paketId: '',
      karyawanId: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: TransaksiCreateSchema) {
    try {
      const res = await addTransaksi(data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil menambahkan transaksi!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal menambahkan transaksi!', variant: 'destructive' });
    }
  }

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger Button */}
      <Button className="space-x-1" onClick={() => setOpen(true)}>
        <Plus />
        <span>Transaksi</span>
      </Button>
      {/* Dialog Trigger Button */}

      <DialogContent className="sm:max-w-[500px] px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Tambah Transaksi</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 col-span-2 mb-4">
              <FormField
                control={control}
                name="namaCustomer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="namaCustomer">Nama Pelanggan</FormLabel>
                    <FormControl>
                      <Input id="namaCustomer" placeholder="Masukkan nama customer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="noHp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="noHp">Handphone</FormLabel>
                    <FormControl>
                      <Input id="noHp" placeholder="Masukkan no handphone customer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paketId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="paketId">Paket</FormLabel>
                    <Select onValueChange={field.onChange} name={field.name}>
                      <FormControl id="paketId">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Paket" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-56">
                        {listPaket.map((paket) => (
                          <SelectItem key={paket.id} value={String(paket.id)}>
                            {paket.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="karyawanId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="karyawanId">Barber</FormLabel>
                    <Select onValueChange={field.onChange} name={field.name}>
                      <FormControl id="karyawanId">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Pemangkas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-56">
                        {listKaryawan.map((karyawan) => (
                          <SelectItem key={karyawan.id} value={String(karyawan.id)}>
                            {karyawan.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
