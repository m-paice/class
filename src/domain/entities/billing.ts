export class Billing {
  constructor(
    public user: string,
    public ip: string,
    public route: string,
    public method: string,
    public content: string,
    public createdAt?: Date,
    public id?: number,
  ) {}
}
