import Mock from 'mockjs';

const abilityIds=['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','B6','C1','C2','C3','C4','C5','C6'];
Mock.mock(/\/api\/occupations\/\w+/, {
  success: true,
  data: {
    id: '@id',
    'name|1': ['程序员', '快递员', '服务员', '厨师', '保洁', '保姆', '家教'],
    desc: '@cparagraph',
    'necessaryAbility|5': [{'abilityId|1':abilityIds,'criterionScore|1':['A','B','C']}],
    'secondaryAbility|5': [{'abilityId|1':abilityIds,'criterionScore|1':['A','B','C']}],
  },
});
Mock.mock(/\/api\/occupations/, {
  success: true,
  data: {
    'list|10': [
      {
        id: '@id',
        'name|1': ['程序员', '快递员', '服务员', '厨师', '保洁', '保姆', '家教'],
        desc: '@cparagraph',
        'necessaryAbility': abilityIds.slice(0,5),
        'secondaryAbility': abilityIds.slice(0,8),
      },
    ],
    total: 20,
  },
});
