import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';
import { usePaket } from '@/context/hooks';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { formatIDR } from '@/lib/formatter';
import { useState } from 'react';
import FormAddPaket from '@/components/paket/form-add';
import FormUpdatePaket from '@/components/paket/form-update';
import FormDeletePaket from '@/components/paket/form-delete';

export default function PaketPage() {
  const { listPaket } = usePaket();

  const [updateTarget, setUpdateTarget] = useState<Paket>({} as Paket);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const triggerUpdateDialog = (p: Paket) => {
    setUpdateTarget(p);
    setOpenUpdateDialog(true);
  };

  const triggerDeleteDialog = (p: Paket) => {
    setUpdateTarget(p);
    setOpenDeleteDialog(true);
  };
  return (
    <section>
      <TitleSetter title="Dashboard | Paket" />
      <div className="mb-4">
        <H2>Paket</H2>
        <p>Daftar Paket</p>
      </div>
      <div className="flex justify-end mb-4">
        <FormAddPaket />
        <FormUpdatePaket open={openUpdateDialog} setOpen={setOpenUpdateDialog} updateTarget={updateTarget} />
        <FormDeletePaket open={openDeleteDialog} setOpen={setOpenDeleteDialog} id={updateTarget.id} />
      </div>
      <div>
        <Card className="p-8 bg-white shadow-lg">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="[&>th]:text-medium">
                <TableHead className="text-nowrap">Nama</TableHead>
                <TableHead className="text-nowrap">Deksripsi</TableHead>
                <TableHead className="text-nowrap">Harga</TableHead>
                <TableHead className="w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listPaket.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.nama}</TableCell>
                  <TableCell>{p.deskripsi}</TableCell>
                  <TableCell>{formatIDR(p.harga)}</TableCell>
                  <TableCell className="space-x-4">
                    <Button onClick={() => triggerUpdateDialog(p)} variant="default" size="icon">
                      <SquarePen className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => triggerDeleteDialog(p)} variant="destructive" size="icon">
                      <Trash2 className="h-5 w-5" />
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
