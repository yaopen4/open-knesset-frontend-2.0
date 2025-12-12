import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CommitteePageParams {
  params: { committee_id: string };
}

export default async function CommitteePage({ params }: CommitteePageParams) {
  const committeeId = parseInt(params.committee_id, 10);

  if (isNaN(committeeId)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-right">ועדה #{committeeId}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-right">פרטי הוועדה</CardTitle>
        </CardHeader>
        <CardContent className="text-right">
          <p className="text-muted-foreground">
            עמוד זה יציג מידע מפורט על הוועדה, כולל חברים, ישיבות והחלטות.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
