import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { ServiceDTO } from "@/types/courses";

export const ServiceCard = ({ service }: { service: ServiceDTO }) => {
  return (
    <Card className="p-4 w-full max-w-4xl">
      <CardContent className="flex flex-col gap-3 ">
        <CardTitle>{service.title}</CardTitle>
        <Typography className="text-sm">{`${service.author.name}, ${service.author.age} y.o.`}</Typography>
        <Typography className="text-sm">
          {service.author.personal_info}
        </Typography>
        <CardDescription>{service.description}</CardDescription>
      </CardContent>

      {/* <Separator />

      <CardFooter className="flex flex-col items-start gap-2 py-2">
        <span>Categories</span>

        <div className="flex gap-4">
          <div className="border p-2 px-6 rounded-full">Tag 1</div>
          <div className="border p-2 px-6 rounded-full">Tag 2</div>
          <div className="border p-2 px-6 rounded-full">Tag 3</div>
        </div>
      </CardFooter> */}
    </Card>
  );
};
