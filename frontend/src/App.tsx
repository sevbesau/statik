import { useState } from "react";
import { VisitorForm } from "./components/app/VisitorForm";
import { Visitor } from "./schemas/visitor.schema";
import VisitorCard from "./components/app/VisitorCard";

import { Reservation } from "./schemas/reservation.schema";

import { createReservation } from "./lib/api";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import ReservationForm from "./components/app/ReservationFrom";

function App() {
  const { toast } = useToast();
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  async function submitReservation(reservation: Reservation) {
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
      <ReservationForm onSubmit={submitReservation} />

      <Toaster />
    </main>
  );
}

export default App;
