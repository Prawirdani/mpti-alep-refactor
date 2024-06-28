import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogSuccessBooking({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <p className="font-medium">
          Booking berhasil! Silahkan datang ke barbershop sesuai jadwal yang telah Anda pilih. Terima kasih!
        </p>
        <div className="flex justify-end [&>button]:w-24 gap-2"></div>
      </DialogContent>
    </Dialog>
  );
}
