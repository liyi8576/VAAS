import Mock from 'mockjs';

/**
 * 查询用户检核统计结果
 * URL：/api/assessments/{userId}
 * METHOD： GET
 */
Mock.mock(/\/api\/trainees\/\w+\/assess$/, {
  success: true,
  data: {
    traineeId: '@guid',
    traineeName: '@cname',
    assessor: '@cname',
    assessDate: '@date', //开始检核日期
    'assessCount|1-200': 1, //已检核数量
    currentAbility: 'A1', //当前已检核能力项
    assessResult: [
      //已检核项列表
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

/**
 * 查询用户检核结果列表
 * URL：/api/assessments/
 * METHOD: GET
 */
Mock.mock(/\/api\/trainees\/assessResult(\?\S*)*/, {
  success: true,
  data: {
    'list|10': [
      {
        traineeId: '@guid',
        traineeName: '@cname',
        assessBeginDate: '@date', //开始检核日期
        assessEndDate: '@date', //结束检核日期
        'assessStatus|1': [-1, 1, 2, 3], //-1:未开始检核，1：检核中, 2:检核完成，3:已生成检核报告
        'assessCount|1-200': 1, //已检核数量
      },
    ],
    total: 10,
  },
});
