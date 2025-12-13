import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BillPageParams {
  params: { bill_id: string };
}

export default async function BillPage({ params }: BillPageParams) {
  const billId = parseInt(params.bill_id, 10);

  if (isNaN(billId)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-right">הצעת חוק #{billId}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-right">פרטי הצעת החוק</CardTitle>
        </CardHeader>
        <CardContent className="text-right">
          <p className="text-muted-foreground">
            עמוד זה יציג מידע מפורט על הצעת החוק, כולל מיוזמים, שלבי החקיקה והצבעות.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

