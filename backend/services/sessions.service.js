const csv = require('csv-parser')
const fs = require('fs');

module.exports = class SessionsService {
  static readSessions(onData, onEnd) {
    console.log('Reading...');

    const start = Date.now();
    let readCount = 0;
    let last = 0;
    let step = 1000000;
    console.time(readCount);

    return fs
      .createReadStream('data.csv')
      .pipe(csv(['companyId', 'userId', 'method', 'time', 'date', 'source']))
      .on('data', (data) => {
        readCount += 1;

        if (readCount % step === 0) {
          console.timeEnd(last);
          console.time(readCount);
          last = readCount;
        }

        onData(data);
      })
      .on('end', () => {
        console.timeEnd(last);
        onEnd();
      });
  }
}
