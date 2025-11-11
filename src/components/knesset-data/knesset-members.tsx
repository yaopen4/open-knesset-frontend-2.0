"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface Member {
  name: string;
  position: string | null;
  contact: string | null;
  image_url: string | null;
  additional_info: {
    profile_url: string;
  };
}

interface Party {
  party_name: string;
  members: Member[];
}

interface KnessetData {
  knesset_number: number;
  parties: Party[];
}

interface KnessetMembersProps {
  knessetData: KnessetData;
}

const partyColors = [
  'bg-sky-200', 'bg-red-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200',
  'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200', 'bg-lime-200'
];

const getPartyColor = (index: number) => {
  return partyColors[index % partyColors.length];
};

export default function KnessetMembers({ knessetData }: KnessetMembersProps) {
  const { knesset_number, parties } = knessetData;

  const sortedParties = [...parties].sort((a, b) => b.members.length - a.members.length);

  return (
    <AccordionItem value={`knesset-${knesset_number}`} className="border rounded-lg bg-card">
      <AccordionTrigger className="px-6 py-4 text-xl font-headline">
        הכנסת ה-{knesset_number}
      </AccordionTrigger>
      <AccordionContent className="px-6">
        <Accordion type="multiple" className="space-y-2">
          {sortedParties.map((party, index) => (
            <AccordionItem value={party.party_name} key={`${knesset_number}-${party.party_name}-${index}`} className="border rounded-md">
              <AccordionTrigger className={`px-4 py-3 text-base ${getPartyColor(index)}`}>
                <span>{party.party_name} ({party.members.length} חברים)</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {party.members.map((member, memberIndex) => (
                  <div key={`${member.name}-${memberIndex}`} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.image_url ?? undefined} alt={member.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <a
                      href={member.additional_info.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {member.name}
                    </a>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}
