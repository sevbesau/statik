import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { nlBE } from "date-fns/locale/nl-BE";
import { useForm } from "react-hook-form";
import { Reservation, reservationSchema } from "@/schemas/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIMESLOTS } from "@/lib/config";

interface ReservationFormProps {
  onSubmit: (reservation: Reservation) => void;
}

export default function ReservationForm({ onSubmit }: ReservationFormProps) {
  const form = useForm<Reservation>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3">
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Kies een datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={[
                      (date) => date < new Date(),
                      { dayOfWeek: [1, 2] },
                    ]}
                    initialFocus
                    locale={nlBE}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeslot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tijdslot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kies een tijdslot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMESLOTS.map((timeslot) => (
                    <SelectItem key={timeslot} value={timeslot}>
                      {timeslot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Maak reservatie!</Button>
      </form>
    </Form>
  );
}
