import { useState } from "react";
import { VisitorForm } from "./components/app/VisitorForm";
import { Visitor } from "./schemas/visitor.schema";
import VisitorCard from "./components/app/VisitorCard";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./components/ui/select";
import { useForm } from "react-hook-form";
import { Reservation, reservationSchema } from "./schemas/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { format } from "date-fns";
import { cn } from "./lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { nlBE } from "date-fns/locale/nl-BE";
import { createReservation } from "./lib/api";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

const ZOO_OPENING_TIME_H = 10;
const ZOO_CLOSING_TIME_H = 20;
const TIMESLOT_DURATION_H = 2;

const timeslots: string[] = [];

for (
  let timeslotStart = ZOO_OPENING_TIME_H;
  timeslotStart < ZOO_CLOSING_TIME_H - TIMESLOT_DURATION_H;
  timeslotStart += TIMESLOT_DURATION_H
) {
  timeslots.push(
    `${timeslotStart}:00 - ${timeslotStart + TIMESLOT_DURATION_H}:00`
  );
}

function App() {
  const { toast } = useToast();
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const form = useForm<Reservation>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  async function onSubmit(reservation: Reservation) {
    if (!visitors || visitors.length <= 0) {
      toast({
        title: "Geen bezoekers",
        description: "U moet minstens 1 bezoeker toevoegen",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReservation({ ...reservation, visitors });
      toast({
        title: "Reservatie succesvol",
        description: "Uw reservatie is gelukt, veel plezier!",
      });
    } catch (error) {
      toast({
        title: "Oeps...",
        description: "Er liep iets mis, probeer later opnieuw.",
        variant: "destructive",
      });
    }
  }

  function addVisitor(newVisitor: Visitor) {
    setVisitors([...visitors, newVisitor]);
  }

  return (
    <main className="max-w-2xl mx-auto my-16 space-y-8">
      <h1 className="font-semibold text-4xl">
        Reserveer je bezoek aan de Zoo!
      </h1>

      <h2 className="text-xl">Bezoekers:</h2>

      <VisitorForm onSubmit={addVisitor} />
      <ul className="grid grid-cols-2 gap-4">
        {visitors.map((visitor, visitorIndex) => (
          <li>
            <VisitorCard
              {...visitor}
              onRemove={() =>
                setVisitors(
                  visitors.filter((_, index) => index !== visitorIndex)
                )
              }
            />
          </li>
        ))}
      </ul>

      <h2 className="text-xl">Reservatie details:</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies een tijdslot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeslots.map((timeslot) => (
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
      <Toaster />
    </main>
  );
}

export default App;
