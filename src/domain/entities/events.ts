export enum EventStatus {
  Scheduled = 0,
  Ongoing = 1,
  Finished = 2,
  Cancelled = 3,
}

export class Event {
  constructor(
    public name: string,
    public description: string,
    public date: Date,
    public location: string,
    public capacity: number,
    public status: EventStatus,
    public id?: string,
  ) {}
}
