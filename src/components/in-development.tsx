import Image from "next/image";

interface InDevelopmentProps {
  title?: string;
}

export default function InDevelopment({ title }: InDevelopmentProps) {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div className="space-y-2 text-right">
        <h1 className="font-headline text-3xl font-bold">
          {title || "בפיתוח"}
        </h1>
        <p className="text-muted-foreground">
          עמוד זה נמצא כעת בפיתוח. נשמח לחזור בקרוב עם תוכן מעודכן.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-[768px] aspect-[1536/672]">
          <Image
            src="/construction.png"
            alt="בפיתוח"
            width={1536}
            height={672}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

