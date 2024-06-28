import { titleCase } from '@/lib/utils';
import { Badge } from '../ui/badge';

type BadgeVariant = 'secondary' | 'default' | 'destructive';
const variantMap: Record<string, BadgeVariant> = {
  booking: 'secondary',
  selesai: 'default',
  batal: 'destructive',
};

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const variant = variantMap[status];
  return <Badge variant={variant}>{titleCase(status)}</Badge>;
}
