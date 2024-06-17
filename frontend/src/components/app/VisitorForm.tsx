import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Visitor, visitorSchema } from "@/schemas/visitor.schema";

interface VisitorFormProps {
  onSubmit: (visitor: Visitor) => void;
}

export function VisitorForm({ onSubmit }: VisitorFormProps) {
  const form = useForm<Visitor>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      subscription_nr: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voornaam</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Achternaam</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscription_nr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abonnementsnummer</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"}>
          Voeg bezoeker toe
        </Button>
      </form>
    </Form>
  );
}
