import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';
import Loader from '@/components/ui/loader';
import { useAuth, useUser } from '@/context/hooks';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2, KeyRoundIcon } from 'lucide-react';
import { titleCase } from '@/lib/utils';
import FormRegisterUser from '@/components/akun/form-add';
import FormUpdateUser from '@/components/akun/form-update';
import FormDeleteUser from '@/components/akun/form-delete';
import FormResetPasswordUser from '@/components/akun/form-reset-password';

export default function AkunPage() {
  const [loading, setLoading] = useState(true);

  const { fetchUsers, listUsers } = useUser();
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers().finally(() => setLoading(false));
  }, []);

  const [updateTarget, setUpdateTarget] = useState<User>({} as User);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  const triggerUpdateDialog = (k: User) => {
    setUpdateTarget(k);
    setOpenUpdateDialog(true);
  };

  const triggerDeleteDialog = (k: User) => {
    setUpdateTarget(k);
    setOpenDeleteDialog(true);
  };

  const triggerResetPasswordDialog = (k: User) => {
    setUpdateTarget(k);
    setOpenResetPasswordDialog(true);
  };

  return loading ? (
    <Loader />
  ) : (
    <section>
      <TitleSetter title="Dashboard | Manajemen Akun" />
      <div className="mb-4">
        <H2>Manajemen Akun</H2>
        <p>Kelola Akun Pengguna Sistem</p>
      </div>
      <div className="flex justify-end mb-4">
        <FormRegisterUser />
        <FormUpdateUser open={openUpdateDialog} setOpen={setOpenUpdateDialog} updateTarget={updateTarget} />
        <FormDeleteUser open={openDeleteDialog} setOpen={setOpenDeleteDialog} id={updateTarget.id} />
        <FormResetPasswordUser
          open={openResetPasswordDialog}
          setOpen={setOpenResetPasswordDialog}
          id={updateTarget.id}
        />
      </div>
      <div>
        <Card className="p-8 bg-white shadow-lg">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="[&>th]:text-medium">
                <TableHead className="text-nowrap">Id</TableHead>
                <TableHead className="text-nowrap">Nama</TableHead>
                <TableHead className="text-nowrap">Username</TableHead>
                <TableHead className="text-nowrap">Role</TableHead>
                <TableHead className="w-[15%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.nama}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{titleCase(u.role)}</TableCell>
                  <TableCell className="flex justify-center gap-4">
                    <Button onClick={() => triggerUpdateDialog(u)} variant="default" size="icon">
                      <SquarePen className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => triggerResetPasswordDialog(u)} variant="default" size="icon">
                      <KeyRoundIcon className="h-5 w-5" />
                    </Button>
                    {u.id !== user.id && (
                      <Button onClick={() => triggerDeleteDialog(u)} variant="destructive" size="icon">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
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
