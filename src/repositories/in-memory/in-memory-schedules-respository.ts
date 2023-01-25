import { areIntervalsOverlapping } from "date-fns";
import { Schedules } from "../../entities/schedules";
import { SchedulesRepository } from "../schedules-respository";

export class InMemorySchedulesRepository implements SchedulesRepository {
  public schedules: Schedules[] = [];

  async create(schedule: Schedules): Promise<void> {
    this.schedules.push(schedule);
  }

  async find(startsAt: Date, endsAt: Date): Promise<Schedules | null> {
    const overLappingSchedule = this.schedules.find((schedule) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: schedule.startsAt, end: schedule.endsAt },
        { inclusive: true }
      );
    });

    if (!overLappingSchedule) return null;

    return overLappingSchedule;
  }
}
