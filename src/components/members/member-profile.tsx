'use client';

import type { Member } from '@/lib/api/types';
import {
  getFullNameHebrew,
  getKnessetTerms,
  getPartyAffiliations,
  getGovMinistries,
  isCurrentlyServing,
} from '@/lib/data/member-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MemberProfileProps {
  member: Member;
}

export default function MemberProfile({ member }: MemberProfileProps) {
  const knessetTerms = getKnessetTerms(member);
  const partyAffiliations = getPartyAffiliations(member);
  const govMinistries = getGovMinistries(member);
  const currentlyServing = isCurrentlyServing(member);

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

          {member.mk_individual_email && (
            <div>
              <h3 className="font-semibold mb-2">דוא"ל</h3>
              <p>{member.mk_individual_email}</p>
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

      {/* Government Ministry Roles */}
      {govMinistries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>תפקידי ממשלה</CardTitle>
            <CardDescription>תפקידים במשרדי ממשלה</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {govMinistries.map((gov, index) => (
                <div key={`${gov.govMinistryId}-${gov.knessetNum}-${index}`} className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium">
                      {gov.positionName} — {gov.govMinistryName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      כנסת {gov.knessetNum}
                      {gov.startDate && (
                        <span className="mr-2">
                          {' • '}
                          {new Date(gov.startDate).toLocaleDateString('he-IL')}
                          {gov.finishDate && ` - ${new Date(gov.finishDate).toLocaleDateString('he-IL')}`}
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
    </div>
  );
}
