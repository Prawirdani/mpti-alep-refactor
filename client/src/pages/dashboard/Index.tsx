import { Card } from '@/components/ui/card';
import TitleSetter from '@/components/pageTitle';
import { useEffect, useState } from 'react';
import { formatIDR } from '@/lib/formatter';
import { CalendarClock, Loader2, Scissors, Wallet2 } from 'lucide-react';
import { Fetch } from '@/lib/fetcher';

type Stats = {
	bookCount: number;
	todayOrdersCount: number;
	todayRevenue: number;
};

export default function Index() {
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState<Stats | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			const res = await Fetch('/api/stats');
			const resBody = (await res.json()) as ApiResponse<Stats>;
			setStats(resBody.data);
		};

		fetchStats().finally(() => setLoading(false));
	}, []);

	return (
		<section>
			<TitleSetter title="Dashboard" />
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
				<OverviewCard title="Booking" loading={loading} icon={<CalendarClock />}>
					<span className="text-2xl text-end">{stats?.bookCount}</span>
				</OverviewCard>
				<OverviewCard title="Transaksi Hari Ini" loading={loading} icon={<Scissors />}>
					<span className="text-2xl text-end">{stats?.todayOrdersCount}</span>
				</OverviewCard>
				<OverviewCard title="Pendapatan Hari Ini" loading={loading} icon={<Wallet2 />}>
					<span className="text-2xl text-end">{formatIDR(stats?.todayRevenue ?? 0)}</span>
				</OverviewCard>
			</div>
		</section>
	);
}

interface OverviewCardProps {
	title: string;
	icon: React.ReactNode;
	loading: boolean;
	children: React.ReactNode;
}
function OverviewCard({ title, loading, icon, children }: OverviewCardProps) {
	return (
		<Card className="p-6 rounded-sm min-h-40 flex flex-col justify-between">
			<div className="flex justify-between items-center">
				<p className="font-medium text-xl">{title}</p>
				{icon}
			</div>
			{loading ? <Loader2 className="animate-spin self-end" /> : children}
		</Card>
	);
}
