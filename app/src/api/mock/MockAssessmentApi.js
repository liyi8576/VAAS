import Mock from 'mockjs';
Mock.mock(/\/api\/assessment\/\w+/, {
  success: true,
  data: {
    traineeId: '@guid',
    traineeName: '@cname',
    assessor: '@cname',
    assessDate: '@date',
    abilityItems: [
      { abilityId: 'A1', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'A2', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'A4', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'A6', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'B2', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'B3', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'B4', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'B1', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'C14', 'assessOption|1': ['A', 'B', 'C', 'D'] },
      { abilityId: 'C11', 'assessOption|1': ['A', 'B', 'C', 'D'] },
    ],
  },
});
