
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function ReportBugPage() {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual submission logic (e.g., send to an API endpoint)
    console.log({
      url,
      description,
      name,
      email,
    });
    toast({
      title: "הדיווח נשלח בהצלחה!",
      description: "תודה שעזרת לנו להשתפר.",
    });
    // Reset form
    setUrl('');
    setDescription('');
    setName('');
    setEmail('');
  };

  return (
    <div className="mx-auto grid w-full max-w-[700px] gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">דיווח על תקלה</CardTitle>
          <CardDescription>
            מצאתם תקלה או משהו שלא עובד כמו שצריך? נשמח אם תספרו לנו כדי שנוכל לתקן.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">כתובת העמוד בו נמצאה התקלה</Label>
              <Input
                id="url"
                placeholder="לדוגמה: /bills/1234"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">תיאור התקלה</Label>
              <Textarea
                id="description"
                placeholder="אנא פרטו מה קרה, מה ציפיתם שיקרה, וכל פרט רלוונטי אחר."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">שם</Label>
                  <Input
                    id="name"
                    placeholder="ישראל ישראלי"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">דוא״ל</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="israel@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                   <p className="text-xs text-muted-foreground">
                    נא למלא למקרה שנצטרך ליצור קשר לקבלת פרטים נוספים.
                  </p>
                </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <Send className="ml-2" />
                שלח דיווח
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
