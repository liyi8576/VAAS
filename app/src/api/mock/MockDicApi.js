import Mock from 'mockjs';
Mock.mock(/\/api\/dics/, {
  success: true,
  data: [
    { group: 'RELATION_SHIP', name: '父子', value: '1' },
    { group: 'RELATION_SHIP', name: '母子', value: '2' },
    { group: 'DISABLED_TYPE', name: '听力残疾', value: '1' },
    { group: 'DISABLED_TYPE', name: '肢体残疾', value: '2' },
    { group: 'DISABLED_TYPE', name: '智力残疾', value: '3' },
    { group: 'DISABLED_LEVEL', name: '一级', value: '1' },
    { group: 'DISABLED_LEVEL', name: '二级', value: '2' },
    { group: 'DISABLED_LEVEL', name: '三级', value: '3' },
    { group: 'DEGREE_TYPE', name: '学士', value: '1' },
    { group: 'DEGREE_TYPE', name: '硕士', value: '2' },
    { group: 'DEGREE_TYPE', name: '博士', value: '3' },
    { group: 'EDUCATION_LEVEL', name: '初中', value: '1' },
    { group: 'EDUCATION_LEVEL', name: '高中', value: '2' },
    { group: 'EDUCATION_LEVEL', name: '中专', value: '3' },
    { group: 'JOB_TYPE', name: '公务员', value: '1' },
    { group: 'JOB_TYPE', name: '教师', value: '2' },
    { group: 'JOB_TYPE', name: '医生', value: '3' },
  ],
});
