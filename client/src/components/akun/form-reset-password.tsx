import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { isErrorResponse } from '@/lib/fetcher';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/hooks';
import { UserResetPasswordSchema, userResetPasswordSchema } from '@/lib/schemas/user';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function FormResetPasswordUser({ open, setOpen, id }: Props) {
  const [apiError, setApiError] = useState<string | null>(null);

  const { resetPassword, invalidate } = useUser();

  const form = useForm<UserResetPasswordSchema>({
    resolver: zodResolver(userResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      repeatPassword: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: UserResetPasswordSchema) {
    try {
      const res = await resetPassword(id, data);

      const resBody = await res.json();
      if (!res.ok) {
        setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
        return;
      }
      toast({ description: 'Berhasil reset password akun!' });
      await invalidate();
      setOpen(false);
    } catch (error) {
      toast({ description: 'Gagal reset password!', variant: 'destructive' });
    }
  }

  useEffect(() => {
    reset();
    setApiError(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Reset Password Akun</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 col-span-2 mb-4">
              <FormField
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="newPassword">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Masukkan password baru pengguna"
                        {...field}
                      />
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
                <span>Simpan</span>
                {isSubmitting && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
