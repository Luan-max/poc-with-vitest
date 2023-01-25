export interface SchedulesProps {
  customer: string
  startsAt: Date
  endsAt: Date
}

export class Schedules {
  private props: SchedulesProps;


  get customer() {
    return this.props.customer
  }

  get startsAt() {
    return this.props.startsAt
  }

  get endsAt() {
    return this.props.endsAt
  }

  constructor(props: SchedulesProps) {

    const { startsAt, endsAt } = props

    if(startsAt < new Date()) {
      throw new Error('Invalid date')
    }

    if(endsAt <= startsAt) {
      throw new Error('Invalid date')
    }

    this.props = props
  }
}