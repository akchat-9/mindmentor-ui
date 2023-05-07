export const sessions = [
  {
    id: 1,
    title: 'Maths tutoring',
    start_time: '2022-06-01T14:00:00Z',
    end_time: '2022-06-01T15:00:00Z',
    teacher: { id: 1, name: 'John Smith' },
    students: [
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'Bob Johnson' },
    ],
  },
  {
    id: 2,
    title: 'Physics tutoring',
    start_time: '2022-06-02T10:00:00Z',
    end_time: '2022-06-02T11:00:00Z',
    teacher: {
      id: 1,
      name: 'John Smith',
    },
    students: [
      {
        id: 4,
        name: 'Alex Lee',
      },
      {
        id: 5,
        name: 'Sara Johnson',
      },
    ],
  },
  {
    id: 3,
    title: 'English tutoring',
    start_time: '2022-06-03T15:00:00Z',
    end_time: '2022-06-03T16:00:00Z',
    teacher: {
      id: 2,
      name: 'Alice Brown',
    },
    students: [
      {
        id: 1,
        name: 'Tom Wilson',
      },
      {
        id: 6,
        name: 'Jessica Kim',
      },
    ],
  },
];
