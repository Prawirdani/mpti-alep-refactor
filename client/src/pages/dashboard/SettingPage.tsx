import FormResetPasswordUser from '@/components/akun/form-reset-password';
import FormUpdateUser from '@/components/akun/form-update';
import TitleSetter from '@/components/pageTitle';
import { H2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/hooks';
import { titleCase } from '@/lib/utils';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';

export default function SettingPage() {
  const { user } = useAuth();

  const [updateTarget, setUpdateTarget] = useState<User>({} as User);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  const triggerUpdateDialog = (k: User) => {
    setUpdateTarget(k);
    setOpenUpdateDialog(true);
  };

  const triggerResetPasswordDialog = (k: User) => {
    setUpdateTarget(k);
    setOpenResetPasswordDialog(true);
  };

  return (
    <section>
      <TitleSetter title="Dashboard | Pengaturan" />
      <div className="mb-4">
        <H2>Pengaturan</H2>
      </div>

      <Card className="h-[400px] bg-white shadow-md flex">
        <ul className="w-[15%] flex flex-col p-4">
          <li className="font-medium text-lg hover:cursor-pointer bg-gray-300 px-4 py-2 rounded-md">Akun</li>
        </ul>
        <Separator orientation="vertical" />
        <div className="w-full p-6 [&_*]:border-gray-400">
          <p className="text-lg font-medium mb-6">Pengaturan Akun</p>
          <Card className="w-full bg-white px-4 shadow-md mb-4">
            <div className="flex justify-between items-center py-4">
              <p>Informasi Personal</p>
              <FormUpdateUser updateTarget={updateTarget} open={openUpdateDialog} setOpen={setOpenUpdateDialog} />
              <Button variant="outline" size="sm" onClick={() => triggerUpdateDialog(user as User)}>
                <SquarePen className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </Button>
            </div>
            <Separator className="bg-gray-400" />
            <div className="p-4 flex gap-40">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p>{user.nama}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p>{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p>{titleCase(user.role)}</p>
              </div>
            </div>
          </Card>
          <Card className="w-full bg-white px-4 shadow-md">
            <div className="flex justify-between items-center py-4">
              <p>Password</p>
              <FormResetPasswordUser
                id={updateTarget.id}
                open={openResetPasswordDialog}
                setOpen={setOpenResetPasswordDialog}
              />
              <Button variant="outline" size="sm" onClick={() => triggerResetPasswordDialog(user as User)}>
                <SquarePen className="w-4 h-4 mr-2" />
                <span>Reset Password</span>
              </Button>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}
