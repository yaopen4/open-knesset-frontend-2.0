import KnessetDataDisplay from "@/components/knesset-data/knesset-data-display";

export default function KnessetDataPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">נתוני כנסת היסטוריים</h1>
        <p className="text-muted-foreground">
          כאן תוכלו למצוא נתונים מפורטים על הרכב כל הכנסות בישראל, מהכנסת הראשונה ועד היום.
        </p>
      </div>
      <KnessetDataDisplay />
    </div>
  );
}
