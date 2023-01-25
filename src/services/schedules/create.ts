import { Schedules } from "../../entities/schedules";
import { SchedulesRepository } from "../../repositories/schedules-respository";

interface CreateScheduleRequest {
customer: string;
startsAt: Date;
endsAt: Date;
}

type CreateScheduleRespose = Schedules

export class CreateSchedules {
  constructor(private scheduleRepository: SchedulesRepository) {}

  async create({ customer, startsAt, endsAt }: CreateScheduleRequest): Promise<CreateScheduleRespose> {
    
    const overLappingSchedule = await this.scheduleRepository.find(startsAt, endsAt)

    if(overLappingSchedule) throw new Error('error porque já existe')

    const schedule = new Schedules({ customer, startsAt, endsAt })

    await this.scheduleRepository.create(schedule)

    return schedule
  }
}