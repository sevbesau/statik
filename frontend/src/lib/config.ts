export const API_URL = "http://localhost:3000";

export const ZOO_OPENING_TIME_H = 10;
export const ZOO_CLOSING_TIME_H = 20;
export const TIMESLOT_DURATION_H = 2;

export const TIMESLOTS: string[] = [];

for (
  let timeslotStart = ZOO_OPENING_TIME_H;
  timeslotStart < ZOO_CLOSING_TIME_H - TIMESLOT_DURATION_H;
  timeslotStart += TIMESLOT_DURATION_H
) {
  TIMESLOTS.push(
    `${timeslotStart}:00 - ${timeslotStart + TIMESLOT_DURATION_H}:00`
  );
}
