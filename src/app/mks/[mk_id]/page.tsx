import { notFound } from 'next/navigation';
import { membersApi } from '@/lib/api/endpoints';
import { getFullNameHebrew, getKnessetTerms, getPartyAffiliations, getCommitteeMemberships, getServicePeriod } from '@/lib/data/member-utils';
import MemberProfile from '@/components/members/member-profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import type { Person, PersonToPosition } from '@/lib/api/types';

interface MemberPageParams {
  params: {
    mk_id: string;
  };
}

export default async function MemberPage({ params }: MemberPageParams) {
  const personId = parseInt(params.mk_id, 10);

  if (isNaN(personId)) {
    notFound();
  }

  // Fetch member data with positions
  let member: Person;
  let positions: PersonToPosition[];

  try {
    const memberResponse = await membersApi.getById(personId);
    const positionsResponse = await membersApi.getPositions(personId);
    
    const memberData = Array.isArray(memberResponse.data) ? memberResponse.data[0] : memberResponse.data;
    const positionsData = positionsResponse.data;
    positions = Array.isArray(positionsData) ? positionsData : positionsData ? [positionsData] : [];
    
    if (!memberData) {
      notFound();
    }
    
    member = memberData;
  } catch (error) {
    console.error('Error fetching member data:', error);
    notFound();
  }

  const knessetTerms = getKnessetTerms(positions);
  const partyAffiliations = getPartyAffiliations(positions);
  const committeeMemberships = getCommitteeMemberships(positions);
  const servicePeriod = getServicePeriod(positions);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={undefined} alt={getFullNameHebrew(member)} />
            <AvatarFallback className="text-2xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold mb-2">{getFullNameHebrew(member)}</h1>
            {member.Email && <p className="text-muted-foreground">{member.Email}</p>}
            {servicePeriod.startDate && (
              <p className="text-sm text-muted-foreground mt-1">
                שירות: {new Date(servicePeriod.startDate).getFullYear()} - {servicePeriod.finishDate ? new Date(servicePeriod.finishDate).getFullYear() : 'היום'}
              </p>
            )}
          </div>
        </div>
        {member.IsCurrent && <Badge variant="default" className="mb-4">מכהן כעת</Badge>}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="terms">כנסות</TabsTrigger>
          <TabsTrigger value="committees">ועדות</TabsTrigger>
          <TabsTrigger value="activity">פעילות</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <MemberProfile member={member} positions={positions || []} />
        </TabsContent>

        <TabsContent value="terms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>כנסות</CardTitle>
              <CardDescription>רשימת הכנסות בהן כיהן החבר</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knessetTerms.map((term) => {
                  const termPositions = positions.filter((p) => p.KnessetNum === term);
                  const termParties = partyAffiliations.filter((p) => p.knessetNum === term);
                  
                  return (
                    <Card key={term}>
                      <CardHeader>
                        <CardTitle className="text-xl">כנסת {term}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {termParties.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">סיעות:</h4>
                            <div className="flex flex-wrap gap-2">
                              {termParties.map((party) => (
                                <Badge key={party.factionId} variant="secondary">
                                  {party.factionName}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold mb-2">תפקידים:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {termPositions.map((pos) => (
                              <li key={pos.PersonToPositionID}>
                                {pos.DutyDesc || pos.CommitteeName || 'חבר כנסת'}
                                {pos.StartDate && (
                                  <span className="text-muted-foreground text-sm mr-2">
                                    ({new Date(pos.StartDate).toLocaleDateString('he-IL')}
                                    {pos.FinishDate && ` - ${new Date(pos.FinishDate).toLocaleDateString('he-IL')}`})
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="committees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ועדות</CardTitle>
              <CardDescription>רשימת הוועדות בהן השתתף החבר</CardDescription>
            </CardHeader>
            <CardContent>
              {committeeMemberships.length > 0 ? (
                <div className="space-y-4">
                  {committeeMemberships.map((membership) => (
                    <Card key={`${membership.committeeId}-${membership.knessetNum}`}>
                      <CardHeader>
                        <CardTitle className="text-lg">{membership.committeeName}</CardTitle>
                        <CardDescription>כנסת {membership.knessetNum}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {membership.startDate && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(membership.startDate).toLocaleDateString('he-IL')}
                            {membership.finishDate && ` - ${new Date(membership.finishDate).toLocaleDateString('he-IL')}`}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">לא נמצאו חברויות בוועדות</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>פעילות</CardTitle>
              <CardDescription>הצעות חוק, הצבעות ופעילות פרלמנטרית</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">תוכן זה יושלם בעתיד עם נתונים מהממשק</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

