import { describe, expect, it } from "vitest";
import { Schedules } from "../../entities/schedules";
import { InMemorySchedulesRepository } from "../../repositories/in-memory/in-memory-schedules-respository";
import { getFutureDate } from "../../tests/utils/get-future-date";
import { CreateSchedules } from "./create";

describe("create schedule", () => {
  it("should be able to create schedule", () => {
    const scheduleRepository = new InMemorySchedulesRepository();
    const createSchedule = new CreateSchedules(scheduleRepository);

    const startsAt = getFutureDate("2022-04-12");
    const endsAt = getFutureDate("2022-04-15");

    expect(
      createSchedule.create({
        customer: "Luan",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Schedules);
  });

  it("should not be able to create schedule because another schedule already exists", async () => {
    const scheduleRepository = new InMemorySchedulesRepository();
    const createSchedule = new CreateSchedules(scheduleRepository);

    const startsAt = getFutureDate("2022-04-12");
    const endsAt = getFutureDate("2022-04-15");

    await createSchedule.create({
      customer: "Luan",
      startsAt,
      endsAt,
    });

    expect(
      createSchedule.create({
        customer: "Luan",
        startsAt: getFutureDate("2022-04-15"),
        endsAt: getFutureDate("2022-04-17"),
      })
    ).rejects.toBeInstanceOf(Error);
    expect(
      createSchedule.create({
        customer: "Luan",
        startsAt: getFutureDate("2022-04-13"),
        endsAt: getFutureDate("2022-04-14"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
