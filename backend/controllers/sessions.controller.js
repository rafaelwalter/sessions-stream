const SessionsService = require('../services/sessions.service');

module.exports = class SessionsController {

  static getParams(req, res) {
    const companies = new Set();
    const users = new Set();

    return SessionsService.readSessions((log) => {
      companies.add(log.companyId);
      users.add(log.userId);
    }, () => res.json({
      data: {
        users: Array.from(users),
        companies: Array.from(companies),
      },
    }));
  }

  static getSessions(req, res) {
    const { company, user, date_start, date_end, active_interval } = req.query;
    const activeInterval = parseInt(active_interval || 15);
  
    const lastSessionByUser = new Map();
    const sessionsCountByDay = new Map();
    const filters = [];
  
    if (company) {
      filters.push(data => data.companyId === company);
    }
  
    if (user) {
      filters.push(data => data.userId === user);
    }

    if (date_start && date_end) {
      const start = new Date(date_start).getTime();
      const end = new Date(date_end).getTime();
      filters.push((data) => {
        const date = new Date(data.date).getTime();
        return date < end && date > start;
      });
    } else if (date_start) {
      const start = new Date(date_start).getTime();
      filters.push(data => new Date(data.date).getTime() > start);
    } else if (date_end) {
      const end = new Date(date_end).getTime();
      filters.push(data => new Date(data.date).getTime() < end);
    }

    return SessionsService.readSessions((log) => {
      if (!filters.every(f => f(log))) {
        return;
      }

      const last = lastSessionByUser.get(log.userId);
      const current = new Date(log.date);

      const diff = Math.abs(last - current);
      const minutes = Math.floor((diff / 1000) / 60);
  
      if (!last || minutes > activeInterval) {
        // update last session
        lastSessionByUser.set(log.userId, current);

        // day in ISO format
        const groupKey = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

        // bump session count by month
        const sessionsCount = sessionsCountByDay.get(groupKey) || 0;
        sessionsCountByDay.set(groupKey, sessionsCount + 1);
      }
    }, () => {
      res.json({
        data: Array.from(sessionsCountByDay.entries()),
      });
    });
  }
}
