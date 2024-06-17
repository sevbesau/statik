import { z } from "zod";

export const visitorSchema = z.object({
  first_name: z.string().min(1, "Voornaam is verplicht"),
  last_name: z.string().min(1, "Achternaam is verplicht"),
  subscription_nr: z
    .string()
    .min(1, "Abonnementsnummer is verplicht")
    .regex(
      /\d{4}-?\d{4}-?\d{2}/,
      "Ongeldig formaat. Abennementsnummer moet er als volgt uitzien: 0000-0000-00"
    )
    .refine((val) => {
      const [part1, part2, expectedChecksum] = val.split("-");
      const numberToCheck = parseInt(part1 + part2);
      const checksum = numberToCheck % 98;
      return checksum == parseInt(expectedChecksum);
    }, "Ongeldig abonnementsnummer."),
});

export type Visitor = z.infer<typeof visitorSchema>;
