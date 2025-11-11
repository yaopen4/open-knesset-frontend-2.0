import KnessetDataDisplay from "@/components/knesset-data/knesset-data-display";

export default function MKsPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">חברי כנסת וסיעות</h1>
        <p className="text-muted-foreground">
          כאן תוכלו למצוא נתונים מפורטים על הרכב כל הכנסות בישראל, מהכנסת הראשונה ועד היום.
        </p>
      </div>
      <KnessetDataDisplay />
    </div>
  );
}
