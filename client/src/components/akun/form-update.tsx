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
import { UserUpdateSchema, userUpdateSchema } from '@/lib/schemas/user';

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	updateTarget: User;
	callback?: () => void;
}

export default function FormUpdateUser({ open, setOpen, updateTarget, callback }: Props) {
	const [apiError, setApiError] = useState<string | null>(null);

	const { updateUser, invalidate } = useUser();

	const form = useForm<UserUpdateSchema>({
		resolver: zodResolver(userUpdateSchema),
	});

	const {
		handleSubmit,
		control,
		reset,
		formState: { isSubmitting },
	} = form;

	async function onSubmit(data: UserUpdateSchema) {
		try {
			const res = await updateUser(updateTarget.id, data);

			const resBody = await res.json();
			if (!res.ok) {
				setApiError(isErrorResponse(resBody) ? resBody.error.message : 'Terjadi Kesalahan');
				return;
			}
			toast({ description: 'Berhasil update akun pengguna!' });
			await invalidate();
			setOpen(false);
			callback && callback();
		} catch (error) {
			toast({ description: 'Gagal update akun pengguna!', variant: 'destructive' });
		}
	}

	useEffect(() => {
		reset({
			nama: updateTarget.nama,
			username: updateTarget.username,
		});
		setApiError(null);
	}, [open, updateTarget]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[500px] px-8">
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader className="mb-4">
							<DialogTitle>Update Akun Pengguna</DialogTitle>
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
