import { Reservation } from "@/schemas/reservation.schema";
import { Visitor } from "@/schemas/visitor.schema";

import axios from "axios";

const API_URL = "http://localhost:3000";

export async function createReservation(
  reservation: Reservation & { visitors: Visitor[] }
) {
  return axios.post(`${API_URL}/reservations`, reservation);
}
