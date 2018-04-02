import Mock from 'mockjs';

/**
 * 获取全量枚举字典数据
 * URL: /api/dics
 * METHOD:GET
 */
Mock.mock(/\/api\/dics$/, {
  success: true,
  data: [
    { groups: 'RELATION_SHIP', name: '父子', value: '1' },
    { groups: 'RELATION_SHIP', name: '母子', value: '2' },
    { groups: 'DISABLED_TYPE', name: '听力残疾', value: '1' },
    { groups: 'DISABLED_TYPE', name: '肢体残疾', value: '2' },
    { groups: 'DISABLED_TYPE', name: '智力残疾', value: '3' },
    { groups: 'DISABLED_LEVEL', name: '一级', value: '1' },
    { groups: 'DISABLED_LEVEL', name: '二级', value: '2' },
    { groups: 'DISABLED_LEVEL', name: '三级', value: '3' },
    { groups: 'DEGREE_TYPE', name: '学士', value: '1' },
    { groups: 'DEGREE_TYPE', name: '硕士', value: '2' },
    { groups: 'DEGREE_TYPE', name: '博士', value: '3' },
    { groups: 'EDUCATION_LEVEL', name: '初中', value: '1' },
    { groups: 'EDUCATION_LEVEL', name: '高中', value: '2' },
    { groups: 'EDUCATION_LEVEL', name: '中专', value: '3' },
    { groups: 'JOB_TYPE', name: '公务员', value: '1' },
    { groups: 'JOB_TYPE', name: '教师', value: '2' },
    { groups: 'JOB_TYPE', name: '医生', value: '3' },
    { groups: 'ABILITY_DOMAIN', name: '工作人格', value: '101' },
    { groups: 'ABILITY_DOMAIN', name: '职业能力', value: '102' },
    { groups: 'ABILITY_DOMAIN', name: '社区独立能力', value: '103' },
  ],
});
