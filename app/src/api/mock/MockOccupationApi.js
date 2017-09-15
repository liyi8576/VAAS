import Mock from 'mockjs';

const abilityIds=['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','B6','C1','C2','C3','C4','C5','C6'];

/**
 * 获取职业详细信息
 * URL: /api/occupations/{occupationId}
 * METHOD:GET
 * RETURN: {success:true,data:{list:[id:'',name:'',desc:'',necessaryAbility:[{abilityId:'',criterionScore:''}],secondaryAbility:[]],total:10}
 */
Mock.mock(/\/api\/occupations\/\w+$/, {
  success: true,
  data: {
    id: '@id',
    'name|1': ['程序员', '快递员', '服务员', '厨师', '保洁', '保姆', '家教'],
    desc: '@cparagraph',
    'necessaryAbility|5': [{'abilityId|1':abilityIds,'criterionScore|1':['A','B','C']}], //必要能力ID数组
    'secondaryAbility|5': [{'abilityId|1':abilityIds,'criterionScore|1':['A','B','C']}], // 次要能力ID数组
  },
});

/**
 * 获取职业列表
 * URL: /api/occupations/
 * PARAMS: offset,pageSize、occupationName
 * METHOD:GET
 * RETURN: {success:true,data:{list:[id:'',name:'',desc:'',necessaryAbility:'A1,A2',secondaryAbility:'C1,C3'],total:10}
 */
Mock.mock(/\/api\/occupations(\?\S*)*$/, {
  success: true,
  data: {
    'list|10': [
      {
        id: '@id',
        'name|1': ['程序员', '快递员', '服务员', '厨师', '保洁', '保姆', '家教'],
        desc: '@cparagraph',
        'necessaryAbility': abilityIds.slice(0,5), //必要能力ID逗号分隔
        'secondaryAbility': abilityIds.slice(0,8), //次要能力ID逗号分隔
      },
    ],
    total: 20,
  },
});
