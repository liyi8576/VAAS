import Mock from 'mockjs';

/**
 * 获取学员详细信息
 * URL: /api/trainees/{traineeId}
 * METHOD:GET
 */
Mock.mock(/\/api\/trainees\/\S+$/, {
  success: true,
  data: {
    id: '@guid',
    name: '@cname',
    'sex|1': ['M', 'F'],
    'age|20-50':1,
    birthday: '@date',
    idCard: '@id',
    guardian: '@name',
    'relationship|1': ['1', '2'],
    address: '@county',
    'phone|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
    'mail':'@email',
    'disabledType|1': ['1', '2', '3'],
    'disabledLevel|1': ['1', '2', '3'],
    disabledReason: '@cparagraph',
    otherDisabled: '@cparagraph',
    'degree|1': ['1', '2', '3'],
    'educationLevel|1': ['1', '2', '3'],
    'haveTrained|1': [-1, 1],
    'trainedIntro|1': '@cparagraph',
    'isWorked|1': [-1, 1],
    workedIntro: '@cparagraph',
    expectWork: '@cparagraph',
    father: '@name',
    'fatherDegree|1': ['1', '2', '3'],
    'fatherJob|1': ['1', '2', '3'],
    mother: '@name',
    'motherDegree|1': ['1', '2', '3'],
    'motherJob|1': ['1', '2', '3'],
    parentExpect: '@cparagraph',
    creator: '@cname',
    createTime: '@datetime',
    modifier: '@cname',
    modifyTime: '@datetime',
  },
});

/**
 * 获取学员列表
 * URL: /api/trainees
 * PARAMS: offset,pageSize、traineeName
 * METHOD:GET
 */
Mock.mock(/\/api\/trainees(\?\S*)*$/, {
  success: true,
  data: {
    'list|10': [
      {
        id: '@guid',
        name: '@cname',
        'sex|1': ['M', 'F'],
        age: '@integer(22, 60)',
        guardian: '@name',
        'phone|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
        address: '@city',
      },
    ],
    total: 135,
  },
});
