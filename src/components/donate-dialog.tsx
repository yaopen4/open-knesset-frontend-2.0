
"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const donationAmounts = [50, 100, 250, 500, 1000];

export function DonateDialog() {
  return (
    <DialogContent className="max-w-4xl p-8">
      <DialogHeader className="text-center mb-6">
        <DialogTitle className="font-headline text-4xl font-bold">
          כיצד לתרום?
        </DialogTitle>
        <DialogDescription className="max-w-2xl mx-auto text-lg">
          אנחנו זקוקים לתמיכה של הקהילה כדי להמשיך ולפעול למען ממשל פתוח יותר. היו אבירי שקיפות והצטרפו בתמיכה חודשית.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* jgive.com Donation */}
        <div className="flex flex-col space-y-4 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-headline text-2xl font-semibold text-center">תרומה דרך אתר jgive.com</h3>
          <div className="grid grid-cols-2 gap-3">
            {donationAmounts.map((amount) => (
              <Button key={amount} variant="outline" className="text-lg py-6">
                ₪{amount}
              </Button>
            ))}
             <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">₪</span>
                <Input type="number" placeholder="סכום אחר" className="h-full text-lg pr-7" />
            </div>
          </div>
          <Button asChild size="lg" className="w-full text-xl py-7 mt-auto">
            <a href="https://www.jgive.com/new/he/ils/donation-targets/326#donation-modal" target="_blank" rel="noopener noreferrer">
              לתרום לסדנא
            </a>
          </Button>
        </div>

        {/* Bank Transfer Donation */}
        <div className="flex flex-col space-y-4 p-6">
           <h3 className="font-headline text-2xl font-semibold text-center">תרומה דרך העברה בנקאית</h3>
           <p className="text-center text-muted-foreground">
             מומלץ לתרום דרך העברה בנקאית לחשבון הבנק של הסדנא לידע ציבורי, מכיוון שבאפיק זה העמלה נמוכה יותר.
           </p>
           <Separator />
           <div className="space-y-2 text-right text-base">
                <p><span className="font-semibold">בנק:</span> יו בנק (26)</p>
                <p><span className="font-semibold">סניף:</span> רחביה (262)</p>
                <p><span className="font-semibold">חשבון:</span> 419931</p>
                <p><span className="font-semibold">שם חשבון:</span> הסדנא לידע ציבורי</p>
           </div>
           <Separator />
            <p className="text-xs text-muted-foreground text-center">
            נא לציין שם מלא וליצור קשר במייל <span className="font-mono">info@hasadna.org.il</span> לאחר התרומה על מנת שנוכל לשלוח קבלה.
            </p>
        </div>
      </div>
    </DialogContent>
  );
}
