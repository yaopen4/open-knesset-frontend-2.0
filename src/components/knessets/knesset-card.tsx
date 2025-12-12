"use client";

import { useState, useEffect } from 'react';
import { StaticKnessetData } from '@/lib/data/static-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { extractOfficeholders } from '@/lib/knesset-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface KnessetSummary {
  knessetNum: number;
  totalMembers: number;
  totalParties: number;
  startDate?: string | null;
  finishDate?: string | null;
}

interface KnessetCardProps {
  knessetNum: number;
  summary: KnessetSummary;
  isCurrent?: boolean;
}

export default function KnessetCard({ knessetNum, summary, isCurrent = false }: KnessetCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullData, setFullData] = useState<StaticKnessetData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load full data only when card is expanded
  useEffect(() => {
    if (isOpen && !fullData && !isLoading) {
      setIsLoading(true);
      const loadData = async () => {
        try {
          const response = await fetch(`/api/knesset/${knessetNum}`);
          if (response.ok) {
            const data = await response.json();
            setFullData(data as StaticKnessetData);
          } else {
            console.error(`Failed to load Knesset ${knessetNum} data`);
          }
        } catch (error) {
          console.error(`Error loading Knesset ${knessetNum} data:`, error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  }, [isOpen, knessetNum, fullData, isLoading]);
  
  const officeholders = fullData ? extractOfficeholders(fullData) : null;
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'לא זמין';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Only use isCurrent prop - don't use fallback logic
  const isCurrentKnesset = isCurrent === true;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn(
        "h-full transform transition-transform hover:-translate-y-1 hover:shadow-lg border-0",
        isOpen && "shadow-lg"
      )}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer" dir="rtl">
            <div className="flex items-start justify-between">
              <div className="space-y-2 text-right flex-1" dir="rtl">
                <div className="flex items-center justify-end gap-2">
                  <CardTitle className="font-headline text-xl">
                    הכנסת ה-{knessetNum}
                  </CardTitle>
                  {isCurrentKnesset && (
                    <Badge variant="default" className="text-xs">
                      נוכחית
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-right">
                  <p>{summary.totalParties} סיעות</p>
                  <p>{summary.totalMembers} חברים</p>
                </CardDescription>
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground",
                isOpen && "rotate-180"
              )} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6 text-right" dir="rtl">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            
            {!isLoading && fullData && (
              <>
            {/* Dates */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">תקופת כהונה</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>תאריך התחלה:</strong> {formatDate(fullData.startDate)}</p>
                <p><strong>תאריך סיום:</strong> {formatDate(fullData.finishDate) || 'עדיין פעילה'}</p>
              </div>
            </div>

            {/* Historical Events - Placeholder for future data */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">אירועים היסטוריים</h3>
              <p className="text-sm text-muted-foreground">
                נתונים יועלו בקרוב
              </p>
            </div>

            {/* Officeholders */}
            {officeholders && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">בעלי תפקידים מרכזיים</h3>
              
              {officeholders.primeMinister.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">ראש הממשלה</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.primeMinister.map((pm, idx) => (
                      <li key={idx}>{pm.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.president.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">נשיא המדינה</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.president.map((p, idx) => (
                      <li key={idx}>{p.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.speaker.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">יו״ר הכנסת</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.speaker.map((s, idx) => (
                      <li key={idx}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.deputySpeakers.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">סגני יו״ר הכנסת</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.deputySpeakers.map((ds, idx) => (
                      <li key={idx}>{ds.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.oppositionLeader.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">ראש האופוזיציה</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.oppositionLeader.map((ol, idx) => (
                      <li key={idx}>{ol.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.knessetCommitteeMembers.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">חברי ועדת הכנסת</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.knessetCommitteeMembers.map((kcm, idx) => (
                      <li key={idx}>{kcm.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {officeholders.committeeChairs.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">יושבי-ראש ועדות הכנסת הקבועות</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {officeholders.committeeChairs.map((cc, idx) => (
                      <li key={idx}>{cc.name} - {cc.committeeName}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Show message if no officeholders found */}
              {Object.values(officeholders).every(arr => arr.length === 0) && (
                <p className="text-sm text-muted-foreground">
                  נתוני בעלי תפקידים יועלו בקרוב
                </p>
              )}
            </div>
            )}

            {/* Statistics Summary */}
            {fullData.members && fullData.members.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">סטטיסטיקות</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <p className="font-medium">{fullData.totalMembers}</p>
                    <p className="text-muted-foreground text-xs">חברי כנסת</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="font-medium">{fullData.totalParties}</p>
                    <p className="text-muted-foreground text-xs">סיעות</p>
                  </div>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="pt-4 border-t flex flex-row gap-3 justify-center flex-wrap">
              {isCurrentKnesset && (
                <Button 
                  asChild
                  className="bg-primary text-white hover:bg-primary/90 rounded-md px-6 py-2"
                >
                  <Link href="/current-knesset">
                    הכנסת הנוכחית
                  </Link>
                </Button>
              )}
              <Button 
                asChild
                className="bg-primary text-white hover:bg-primary/90 rounded-md px-6 py-2"
              >
                <Link href={`/knesset/${knessetNum}`}>
                  צפה בכנסת {knessetNum}
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-primary text-white hover:bg-primary/90 rounded-md px-6 py-2"
              >
                <Link href={`/knesset/${knessetNum}/members`}>
                  רשימת חברי הכנסת
                </Link>
              </Button>
            </div>
            </>
            )}
            
            {!isLoading && !fullData && (
              <div className="text-sm text-muted-foreground text-center py-4">
                לא ניתן לטעון נתונים נוספים
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

