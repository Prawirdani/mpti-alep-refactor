import { Card } from '@/components/ui/card';
import TitleSetter from '@/components/pageTitle';

export default function Index() {
  return (
    <section>
      <TitleSetter title="Dashboard" />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        <Card className="p-4 rounded-sm min-h-44 flex place-items-center justify-center">Key Metric 1</Card>
        <Card className="p-4 rounded-sm min-h-44 flex place-items-center justify-center">Key Metric 2</Card>
        <Card className="p-4 rounded-sm min-h-44 flex place-items-center justify-center">Key Metric 3</Card>
        <Card className="p-4 rounded-sm min-h-44 flex place-items-center justify-center">Key Metric 4</Card>
        <Card className="p-4 rounded-sm h-[400px] md:col-span-2 xl:col-span-3 flex place-items-center justify-center">
          Graph goes here
        </Card>
        <Card className="p-4 rounded-sm h-[400px] flex place-items-center justify-center">Additional</Card>
      </div>
    </section>
  );
}
