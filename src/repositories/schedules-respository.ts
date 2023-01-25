import { Schedules } from "../entities/schedules";

export interface SchedulesRepository {
  create(schedule: Schedules): Promise<void>;
  find(startsAt: Date, endsAt: Date): Promise<Schedules | null>
}