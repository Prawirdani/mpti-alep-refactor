import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorResponse } from '@/lib/fetcher';
import { useKaryawan, usePaket, useTransaksi } from '@/context/hooks';
import { TransaksiBookingSchema, transaksiBookingSchema } from '@/lib/schemas/transaksi';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { id } from 'date-fns/locale';
import { format } from 'date-fns';
import DialogSuccessBooking from '@/components/booking/dialog-success';

export default function BookingForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const { addBookingTransaksi, invalidate } = useTransaksi();
  const { listPaket } = usePaket();
  const { listKaryawan } = useKaryawan();

  const form = useForm<TransaksiBookingSchema>({
    resolver: zodResolver(transaksiBookingSchema),
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

  async function onSubmit(data: TransaksiBookingSchema) {
    try {
      console.log(data);
      const res = await addBookingTransaksi(data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      await invalidate();
      reset();
      setOpenSuccessDialog(true);
    } catch (error) {
      toast({ description: 'Gagal menambahkan transaksi!', variant: 'destructive' });
    }
  }
  return (
    <Card className="md:w-2/3 2xl:w-2/5 mx-auto h-full p-16 shadow-lg flex flex-col justify-center">
      <DialogSuccessBooking open={openSuccessDialog} setOpen={setOpenSuccessDialog} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 col-span-2 mb-8">
            <FormField
              control={control}
              name="namaCustomer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="namaCustomer">Nama</FormLabel>
                  <FormControl>
                    <Input id="namaCustomer" placeholder="Masukkan nama anda" {...field} />
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
                  <FormLabel htmlFor="noHp">Nomor Handphone</FormLabel>
                  <FormControl>
                    <Input id="noHp" placeholder="Masukkan Nomor Handphone" {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl id="paketId">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Paket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-56">
                      {listPaket.map((paket) => (
                        <SelectItem key={paket.id} value={String(paket.id)}>
                          <p>{paket.nama}</p>
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
                  <FormLabel htmlFor="karyawanId">Pemangkas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    defaultValue={field.value}
                  >
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

            <div className="pt-1.5">
              <FormField
                control={form.control}
                name="jadwalBooking"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP', { locale: id }) : <span>Tentukan tanggal</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const min = new Date();
                            min.setDate(min.getDate() - 1);
                            return date < min;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {apiError && <p className="text-destructive text-sm text-end mb-4">{apiError}</p>}
          <div className="flex justify-center">
            <Button className="w-44" type="submit" disabled={isSubmitting}>
              <span>Book</span>
              {isSubmitting && <Loader2 className="ml-2 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
