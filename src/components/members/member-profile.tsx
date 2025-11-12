'use client';

import type { Person, PersonToPosition } from '@/lib/api/types';
import { getFullNameHebrew, getKnessetTerms, getPartyAffiliations, isCurrentlyServing } from '@/lib/data/member-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MemberProfileProps {
  member: Person;
  positions: PersonToPosition[];
}

export default function MemberProfile({ member, positions }: MemberProfileProps) {
  const knessetTerms = getKnessetTerms(positions);
  const partyAffiliations = getPartyAffiliations(positions);
  const currentlyServing = isCurrentlyServing(member, positions);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>מידע בסיסי</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">שם מלא</h3>
            <p>{getFullNameHebrew(member)}</p>
          </div>
          
          {member.Email && (
            <div>
              <h3 className="font-semibold mb-2">דוא"ל</h3>
              <p>{member.Email}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">מגדר</h3>
            <p>{member.GenderDesc}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">סטטוס</h3>
            <Badge variant={currentlyServing ? 'default' : 'secondary'}>
              {currentlyServing ? 'מכהן כעת' : 'לא מכהן'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Knesset Terms */}
      <Card>
        <CardHeader>
          <CardTitle>כנסות</CardTitle>
          <CardDescription>מספר הכנסות בהן כיהן: {knessetTerms.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {knessetTerms.map((term) => (
              <Badge key={term} variant="outline" className="text-lg px-3 py-1">
                כנסת {term}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Party Affiliations */}
      {partyAffiliations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>סיעות</CardTitle>
            <CardDescription>רשימת הסיעות בהן היה חבר</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partyAffiliations.map((affiliation, index) => (
                <div key={`${affiliation.factionId}-${affiliation.knessetNum}`}>
                  {index > 0 && <Separator className="my-4" />}
                  <div>
                    <h4 className="font-semibold mb-1">{affiliation.factionName}</h4>
                    <p className="text-sm text-muted-foreground">
                      כנסת {affiliation.knessetNum}
                      {affiliation.startDate && (
                        <span className="mr-2">
                          {' • '}
                          {new Date(affiliation.startDate).toLocaleDateString('he-IL')}
                          {affiliation.finishDate && ` - ${new Date(affiliation.finishDate).toLocaleDateString('he-IL')}`}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Positions Summary */}
      <Card>
        <CardHeader>
          <CardTitle>תפקידים</CardTitle>
          <CardDescription>סיכום התפקידים שמילא</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {positions.slice(0, 10).map((position) => (
              <div key={position.PersonToPositionID} className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="font-medium">
                    {position.DutyDesc || position.CommitteeName || 'חבר כנסת'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    כנסת {position.KnessetNum}
                    {position.StartDate && (
                      <span className="mr-2">
                        {' • '}
                        {new Date(position.StartDate).toLocaleDateString('he-IL')}
                        {position.FinishDate && ` - ${new Date(position.FinishDate).toLocaleDateString('he-IL')}`}
                      </span>
                    )}
                  </p>
                </div>
                {position.IsCurrent && (
                  <Badge variant="default" className="text-xs">פעיל</Badge>
                )}
              </div>
            ))}
            {positions.length > 10 && (
              <p className="text-sm text-muted-foreground mt-4">
                ועוד {positions.length - 10} תפקידים...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

