import { z } from "zod";

export const reservationSchema = z.object({
  date: z.date(),
  timeslot: z.string(),
});

export type Reservation = z.infer<typeof reservationSchema>;
