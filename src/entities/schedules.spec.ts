import { expect, test } from "vitest";
import { Schedules } from "./schedules";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create schedule", () => {
  const startsAt = getFutureDate('2022-04-12')
  const endsAt = getFutureDate('2022-04-14')

  const schedule = new Schedules({
    customer: "Luan",
    startsAt,
    endsAt,
  });

  expect(schedule).toBeInstanceOf(Schedules);
  expect(schedule.customer).toEqual("Luan");
});

test("cannot create schedule with end date before starts date", () => {
  const startDate = getFutureDate('2022-04-12')
  const endDate = getFutureDate('2022-04-10')

  expect(() => {
    return new Schedules({
      customer: "Luan",
      startsAt: startDate,
      endsAt: endDate,
    });
  }).toThrow();
});

test("it is not possible to create a schedule with the old current date", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 2)

  expect(() => {
    return new Schedules({
      customer: "Luan",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
