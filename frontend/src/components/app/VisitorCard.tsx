import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

export interface VisitorCardProps {
  first_name: string;
  last_name: string;
  subscription_nr: string;
  onRemove: () => void;
}

export default function VisitorCard({
  first_name,
  last_name,
  subscription_nr,
  onRemove,
}: VisitorCardProps) {
  return (
    <div className="relative bg-white rounded-md shadow-md p-4 pt-2 space-y-2 hover:bg-gray-50">
      <Button
        className="absolute top-2 right-2 w-6 h-6"
        variant={"ghost"}
        size={"icon"}
        onClick={onRemove}
      >
        <XIcon className=" text-black " />
      </Button>
      <p className="font-semibold">
        {first_name} {last_name}
      </p>
      <p className="text-gray-600">{subscription_nr}</p>
    </div>
  );
}
