import { Card } from '@/components/ui/card';

export default function Index() {
  return (
    <section>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <Card className="p-4 rounded-sm min-h-44">This is a card</Card>
        <Card className="p-4 rounded-sm min-h-44">This is a card</Card>
        <Card className="p-4 rounded-sm min-h-44">This is a card</Card>
        <Card className="p-4 rounded-sm min-h-44">This is a card</Card>
      </div>
    </section>
  );
}
