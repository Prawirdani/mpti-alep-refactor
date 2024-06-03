import TitleSetter from '@/components/pageTitle';
import DialogCancelTransaksi from '@/components/transaksi/dialog-cancel';
import DialogCompleteTransaksi from '@/components/transaksi/dialog-complete';
import FormAddTransaksi from '@/components/transaksi/form-add';
import { H2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTransaksi } from '@/context/hooks';
import { formatIDR, formatTime } from '@/lib/formatter';
import { titleCase } from '@/lib/utils';
import { Check, TextSearch, X } from 'lucide-react';
import { useState } from 'react';

export default function TransaksiPage() {
  const [updateTarget, setUpdateTarget] = useState<Transaksi>({} as Transaksi);

  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const triggerCompleteDialog = (tx: Transaksi) => {
    setUpdateTarget(tx);
    setOpenCompleteDialog(true);
  };

  const triggerCancelDialog = (tx: Transaksi) => {
    setUpdateTarget(tx);
    setOpenCancelDialog(true);
  };

  const { listTransaksi } = useTransaksi();
  return (
    <section>
      <TitleSetter title="Transaksi" />
      <div className="mb-4">
        <H2>Transaksi</H2>
        <p>Daftar Transaksi</p>
      </div>
      <div className="flex justify-end mb-4">
        <FormAddTransaksi />
        <DialogCompleteTransaksi open={openCompleteDialog} setOpen={setOpenCompleteDialog} id={updateTarget.id} />
        <DialogCancelTransaksi open={openCancelDialog} setOpen={setOpenCancelDialog} id={updateTarget.id} />
      </div>

      <div>
        <Card className="p-8 bg-white shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-medium">
                <TableHead className="text-nowrap">Waktu</TableHead>
                <TableHead className="text-nowrap">Nama Pelanggan</TableHead>
                <TableHead className="text-nowrap">No Hp</TableHead>
                <TableHead className="text-nowrap">Barber</TableHead>
                <TableHead className="text-nowrap">Total</TableHead>
                <TableHead className="text-nowrap">Status</TableHead>
                <TableHead className="w-[12%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listTransaksi.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-nowrap">{formatTime(new Date(tx.waktu_transaksi))}</TableCell>
                  <TableCell className="text-nowrap">{tx.nama_customer}</TableCell>
                  <TableCell>{tx.no_hp}</TableCell>
                  <TableCell>{tx.karyawan.nama}</TableCell>
                  <TableCell>{formatIDR(tx.total_harga)}</TableCell>
                  <TableCell>{titleCase(tx.status)}</TableCell>
                  <TableCell className="flex justify-between">
                    <Button className="" variant="outline" size="icon">
                      <TextSearch />
                    </Button>
                    <Button onClick={() => triggerCancelDialog(tx)} variant="destructive" size="icon">
                      <X />
                    </Button>
                    <Button onClick={() => triggerCompleteDialog(tx)} variant="default" size="icon">
                      <Check />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}
