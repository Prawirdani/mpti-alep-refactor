import { Card } from '@/components/ui/card';

interface ArtistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
  description: string;
}
export default function ArtistCard(props: ArtistCardProps) {
  return (
    <Card className="max-w-80 p-2 md:p-4 flex flex-col sm:[&:nth-child(3)]:col-span-2 lg:[&:nth-child(3)]:col-span-1 [&:nth-child(3)]:justify-self-center">
      <img src={props.image} alt="hair-artist-image" className="rounded-md shadow-md h-3/4 object-cover" />
      <div className="flex-grow space-y-2 flex flex-col justify-center">
        <h3 className="text-public-primary text-xl font-bold text-center">{props.name}</h3>
        <p className="text-center font-medium">{props.description}</p>
      </div>
    </Card>
  );
}
