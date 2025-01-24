// 存储特别的日期，国家调休的节假日。
// 比如2025-01-01是周三，但是这天是元旦放假了，加入到 holiday 中；
// 同理2025-01-26周六，但是这天调休上班，加入到workday中

const data = {
  2024: {
    workday: [
      '2024-02-04',
      '2024-02-18',
      '2024-04-07',
      '2024-04-28',
      '2024-05-11',
      '2024-09-14',
      '2024-09-29',
      '2024-10-12',
    ],
    holiday: [
      '2024-01-01',
      '2024-02-12',
      '2024-02-13',
      '2024-02-14',
      '2024-02-15',
      '2024-02-16',
      '2024-04-04',
      '2024-04-05',
      '2024-05-01',
      '2024-05-02',
      '2024-05-03',
      '2024-06-10',
      '2024-09-16',
      '2024-09-17',
      '2024-10-01',
      '2024-10-02',
      '2024-10-03',
      '2024-10-04',
      '2024-10-07',

    ],
  },
  2025: {
    workday: [
      '2025-01-26',
      '2025-02-08',
      '2025-04-27',
      '2025-09-28',
      '2025-10-11',
    ],
    holiday: [
      '2025-01-01',
      '2025-01-28',
      '2025-01-29',
      '2025-01-30',
      '2025-01-31',
      '2025-02-03',
      '2025-02-04',
      '2025-04-04',
      '2025-05-01',
      '2025-05-02',
      '2025-06-02',
      '2025-10-01',
      '2025-10-02',
      '2025-10-03',
      '2025-10-06',
      '2025-10-07',
      '2025-10-08',
    ],
  },
};
