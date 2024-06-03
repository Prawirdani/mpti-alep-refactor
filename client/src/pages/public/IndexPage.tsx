import IndexContent from '@/components/layout/Content';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function IndexPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<IndexContent />
			<Footer />
		</div>
	);
}
