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
import { useUser } from '@/context/hooks';
import { UserRegisterSchema, userRegisterSchema } from '@/lib/schemas/user';

export default function FormRegisterUser() {
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { registerUser, invalidate } = useUser();

  const form = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      nama: '',
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: UserRegisterSchema) {
    try {
      const res = await registerUser(data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil registrasi akun!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal registrasi akun!', variant: 'destructive' });
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
        <span>Akun</span>
      </Button>
      {/* Dialog Trigger Button */}

      <DialogContent className="sm:max-w-[500px] px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Registrasi Akun Operator</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 col-span-2 mb-4">
              <FormField
                control={control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nama">Nama</FormLabel>
                    <FormControl>
                      <Input id="nama" placeholder="Masukkan nama pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="Masukkan username pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="Masukkan password pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="repeatPassword">Ulangi Password</FormLabel>
                    <FormControl>
                      <Input id="repeatPassword" type="password" placeholder="Ketikkan ulang password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {apiError && <p className="text-destructive text-sm text-end mb-4">{apiError}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                <span>Registrasi</span>
                {isSubmitting && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
