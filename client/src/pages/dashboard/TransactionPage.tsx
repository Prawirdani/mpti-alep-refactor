import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTransaksi } from '@/context/hooks';
import { formatIDR, formatTime } from '@/lib/formatter';
import { titleCase } from '@/lib/utils';

export default function TransactionPage() {
  const { listTransaksi } = useTransaksi();
  return (
    <section>
      <TitleSetter title="Transaksi" />
      <div className="mb-8">
        <H2>Transaksi</H2>
        <p>Daftar Transaksi</p>
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
                <TableHead className="w-[10%]"></TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}
// <TableCell className="flex gap-2 justify-center">
//   <Button onClick={() => triggerUpdateDialog(tx)} variant="outline" className="shadow-md">
//     <SquarePen className="h-4 w-4" />
//   </Button>
//   <Button
//     disabled={tx.totalBooks > 0}
//     onClick={() => triggerDeleteDialog(tx)}
//     variant="destructive"
//     className="shadow-md"
//   >
//     <Trash className="h-4 w-4" />
//   </Button>
// </TableCell>
