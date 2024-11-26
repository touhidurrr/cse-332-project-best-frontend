import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const LinkedHoverCard: React.FC<{
  link: string;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ link, title, description, children }) => (
  <Link href={link}>
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-auto p-0 bg-transparent border-none">
        <Card>
          <CardHeader className="p-0 m-3 gap-1 items-center justify-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </HoverCardContent>
    </HoverCard>
  </Link>
);

export default LinkedHoverCard;
