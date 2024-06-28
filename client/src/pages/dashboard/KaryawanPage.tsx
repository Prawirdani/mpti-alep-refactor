import FormAddKaryawan from '@/components/karyawan/form-add';
import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useKaryawan } from '@/context/hooks';
import { useState } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import FormUpdateKaryawan from '@/components/karyawan/form-update';
import FormDeleteKaryawan from '@/components/karyawan/form-delete';

export default function KaryawanPage() {
  const { listKaryawan } = useKaryawan();

  const [updateTarget, setUpdateTarget] = useState<Karyawan>({} as Karyawan);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const triggerUpdateDialog = (k: Karyawan) => {
    setUpdateTarget(k);
    setOpenUpdateDialog(true);
  };

  const triggerDeleteDialog = (k: Karyawan) => {
    setUpdateTarget(k);
    setOpenDeleteDialog(true);
  };

  return (
    <section>
      <TitleSetter title="Transaksi" />
      <div className="mb-4">
        <H2>Karyawan</H2>
        <p>Daftar Karyawan</p>
      </div>
      <div className="flex justify-end mb-4">
        <FormAddKaryawan />
        <FormUpdateKaryawan open={openUpdateDialog} setOpen={setOpenUpdateDialog} updateTarget={updateTarget} />
        <FormDeleteKaryawan open={openDeleteDialog} setOpen={setOpenDeleteDialog} id={updateTarget.id} />
      </div>
      <div>
        <Card className="p-8 bg-white shadow-lg">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="[&>th]:text-medium">
                <TableHead className="text-nowrap">Id</TableHead>
                <TableHead className="text-nowrap">Nama</TableHead>
                <TableHead className="text-nowrap">Handphone</TableHead>
                <TableHead className="w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listKaryawan.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.id}</TableCell>
                  <TableCell>{k.nama}</TableCell>
                  <TableCell>{k.handphone}</TableCell>
                  <TableCell className="space-x-4">
                    <Button onClick={() => triggerUpdateDialog(k)} variant="default" size="icon">
                      <SquarePen className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => triggerDeleteDialog(k)} variant="destructive" size="icon">
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
