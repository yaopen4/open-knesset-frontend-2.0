import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { Calendar } from 'lucide-react';

interface TimelineSectionProps {
  knessetData: UnifiedKnessetData;
}

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

export default function TimelineSection({ knessetData }: TimelineSectionProps) {
  // Build timeline events from available data
  const events: TimelineEvent[] = [];

  if (knessetData.startDate) {
    events.push({
      date: knessetData.startDate,
      title: 'הקמת הכנסת',
      description: `הכנסת ה-${knessetData.knessetNum} החלה את עבודתה`,
    });
  }

  if (knessetData.finishDate) {
    events.push({
      date: knessetData.finishDate,
      title: 'פירוק הכנסת',
      description: `הכנסת ה-${knessetData.knessetNum} הסתיימה`,
    });
  }

  // Sort events by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('he-IL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
    } catch {
      return dateString;
    }
  };

  const hasEvents = events.length > 0;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">ציר זמן</h2>
        <p className="text-muted-foreground">
          אירועים מרכזיים ונקודות ציון בתולדות הכנסת
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">אירועים מרכזיים</CardTitle>
          <CardDescription className="text-right">
            {hasEvents 
              ? 'רשימת אירועים היסטוריים חשובים'
              : 'נתוני אירועים יועלו בקרוב'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6" dir="rtl">
          {hasEvents ? (
            <div className="relative border-r-2 border-muted pr-6 space-y-8">
              {events.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -right-[33px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-end">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <h3 className="text-lg font-semibold text-right">{event.title}</h3>
                    {event.description && (
                      <p className="text-muted-foreground text-right text-sm">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>נתוני ציר הזמן יועלו בעדכון הבא</p>
              <p className="text-sm mt-2">
                במערכת יוצגו אירועים כגון: שינויים בממשלה, אירועים פוליטיים משמעותיים, 
                ותאריכי חקיקה חשובים
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Period Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">תקופת הכהונה</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">תאריך התחלה</p>
              <p className="text-lg font-semibold">
                {knessetData.startDate 
                  ? formatDate(knessetData.startDate)
                  : 'לא זמין'}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">תאריך סיום</p>
              <p className="text-lg font-semibold">
                {knessetData.finishDate 
                  ? formatDate(knessetData.finishDate)
                  : 'עדיין פעילה'}
              </p>
            </div>
          </div>
          
          {knessetData.startDate && knessetData.finishDate && (
            <div className="p-4 bg-muted rounded-lg text-right">
              <p className="text-sm text-muted-foreground mb-1">משך הכהונה</p>
              <p className="text-lg font-semibold">
                {(() => {
                  const start = new Date(knessetData.startDate);
                  const end = new Date(knessetData.finishDate);
                  const diffTime = Math.abs(end.getTime() - start.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  const years = Math.floor(diffDays / 365);
                  const months = Math.floor((diffDays % 365) / 30);
                  return `${years > 0 ? `${years} שנים ` : ''}${months} חודשים`;
                })()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

