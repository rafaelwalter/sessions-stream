export class GetSessionParams {

  constructor() {
    this.params = {};
  }

  private params: {
    company?: string,
    user?: string,
    date_start?: string,
    date_end?: string,
    active_interval?: string,
  };

  getParams() {
    return { ...this.params };
  }

  setCompany(company: string) {
    this.params.company = company;
  }

  setUser(user: string) {
    this.params.user = user;
  }

  setDateStart(date: Date) {
    this.params.date_start = date.toISOString();
  }

  setDateEnd(date: Date) {
    this.params.date_end = date.toISOString();
  }

  setInterval(interval: string) {
    this.params.active_interval = interval;
  }

}
