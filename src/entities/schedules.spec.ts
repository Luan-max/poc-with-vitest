import { expect, test } from "vitest";
import { Schedules } from "./schedules";
import { getFutureDate } from "../tests/utils/get-future-date";

test("should be able to create schedule", () => {
  const startsAt = getFutureDate('2022-04-12')
  const endsAt = getFutureDate('2022-04-14')

  const schedule = new Schedules({
    customer: 'Vitest',
    startsAt,
    endsAt,
  });

  expect(schedule).toBeInstanceOf(Schedules);
  expect(schedule.customer).toEqual('Vitest');
});

test("should not be able to create a schedule with the date before the current one", () => {
  const startsAt = getFutureDate('2022-04-12')
  const endsAt = getFutureDate('2022-04-10')

  expect(() => {
    return new Schedules({
      customer: 'Vitest',
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("should not be able to create a schedule with the old current date", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 2)

  expect(() => {
    return new Schedules({
      customer: 'Vitest',
      startsAt,
      endsAt,
    });
  }).toThrow();
});
