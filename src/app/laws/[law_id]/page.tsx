import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LawPageParams {
  params: { law_id: string };
}

export default async function LawPage({ params }: LawPageParams) {
  const lawId = parseInt(params.law_id, 10);

  if (isNaN(lawId)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-right">חוק #{lawId}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-right">פרטי החוק</CardTitle>
        </CardHeader>
        <CardContent className="text-right">
          <p className="text-muted-foreground">
            עמוד זה יציג את נוסח החוק המאוחד והיסטוריית התיקונים.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
