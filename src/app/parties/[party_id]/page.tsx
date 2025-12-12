import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PartyPageParams {
  params: { party_id: string };
}

export default async function PartyPage({ params }: PartyPageParams) {
  const partyId = parseInt(params.party_id, 10);

  if (isNaN(partyId)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-right">סיעה #{partyId}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-right">פרטי הסיעה</CardTitle>
        </CardHeader>
        <CardContent className="text-right">
          <p className="text-muted-foreground">
            עמוד זה יציג מידע מפורט על הסיעה, כולל רשימת חברי הכנסת בסיעה, היסטוריה והצבעות.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
