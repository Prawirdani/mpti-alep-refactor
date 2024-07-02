import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, Loader2, Sheet } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function DialogReport() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [generateAble, setGenerateAble] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setGenerateAble(true);
    } else {
      setGenerateAble(false);
    }
  }, [dateRange]);

  async function downloadExcel() {
    try {
      setLoading(true);
      const from = dateRange?.from?.toISOString();
      const to = dateRange?.to?.toISOString();
      const response = await fetch(`/api/transaksi/report?from=${from}&to=${to}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Create a link element
      const link = document.createElement('a');

      // Set the download attribute with a filename
      link.href = window.URL.createObjectURL(blob);

      const date = new Date();
      const fileName = `report-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.xlsx`;

      link.download = fileName;

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      setApiError('Terjadi kesalahan coba lagi beberapa saat!');
    } finally {
      setLoading(false);
      toast({ description: 'Berhasil mengunduh laporan.' });
      setOpen(false);
    }
  }

  useEffect(() => {
    setApiError(null);
    setDateRange({ from: undefined, to: undefined });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger Button */}
      <Button className="space-x-1" onClick={() => setOpen(true)}>
        <Sheet className="mr-2 h-4 w-4" />
        <span>Laporan</span>
      </Button>
      {/* Dialog Trigger Button */}
      <DialogContent className="px-8 w-fit">
        <DialogHeader className="mb-4">
          <DialogTitle>Generate Laporan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn('w-[300px] justify-start text-left font-normal', !dateRange && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pilih Rentang Tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                toDate={new Date()}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>
        {apiError && <p className="text-destructive text-sm text-end mb-4">{apiError}</p>}
        <div className="flex justify-end">
          <Button disabled={loading || !generateAble} onClick={downloadExcel}>
            <span>Unduh</span>
            {loading && <Loader2 className="ml-2 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
