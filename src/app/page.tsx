
import { Users, Gavel, FileText, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: 'חברי הכנסת והמפלגות',
    icon: Users,
    href: '/mks',
  },
  {
    title: 'ועדות הכנסת',
    icon: Gavel,
    href: '/committees',
  },
  {
    title: 'חקיקה והצבעות',
    icon: FileText,
    href: '/bills',
  },
  {
    title: 'ממשק למפתחים',
    icon: Code,
    href: '/developers',
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-grow pb-16">
        <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12 text-center md:py-16">
          <Image
            src="/drowing.png"
            alt="The Knesset building"
            width={800}
            height={300}
            className="mx-auto rounded-lg object-cover shadow-lg"
            data-ai-hint="government building"
          />

          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              ברוכים הבאים לכנסת פתוחה
            </h1>
            <p className="text-xl font-medium text-foreground">
              שקיפות. נגישות. מעורבות אזרחית.
            </p>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              כנסת פתוחה היא יוזמה של הסדנה לידע ציבורי שמטרתה להנגיש לכל אזרח
              ואזרחית מידע אמין, עדכני ומובן על עבודת הכנסת - הבית של הדמוקרטיה
              הישראלית.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">מה תוכלו למצוא כאן?</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col items-center justify-between p-6">
                  <CardHeader className="p-0">
                    <feature.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <CardTitle className="text-center text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <Button asChild variant="default">
                      <Link href={feature.href}>הצג</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-8">
              <h2 className="font-headline text-3xl font-bold">למה זה חשוב?</h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              המידע שמפורסם בכנסת פתוחה מאפשר לכולנו להבין טוב יותר את תהליכי קבלת ההחלטות, לעקוב אחר נבחרי הציבור, ולהשתתף באופן מושכל בשיח הדמוקרטי.
              </p>
          </div>
          
          <div className="space-y-4 pt-8">
              <h2 className="font-headline text-3xl font-bold">הצטרפו אלינו</h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              הפרויקט פתוח לקהילה. אתם מוזמנים לעיין בקוד, לשתף פעולה, או להשתמש במידע כדי לבנות כלים חדשים לשקיפות ציבורית.
              </p>
          </div>

        </div>
      </div>
      <footer className="bg-primary py-2 text-center text-primary-foreground">
        <p>© הסדנא לידע ציבורי (ע"ר) 2025</p>
      </footer>
    </div>
  );
}
