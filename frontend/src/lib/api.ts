import { Reservation } from "@/schemas/reservation.schema";
import { Visitor } from "@/schemas/visitor.schema";

import axios from "axios";
import { API_URL } from "./config";

export async function createReservation(
  reservation: Reservation & { visitors: Visitor[] }
) {
  return axios.post(`${API_URL}/reservations`, reservation);
}
