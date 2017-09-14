import _ from 'lodash';
export default {
  DOMAIN_INDEPENDENT_LIFE: '103', //独立生活技能ID
  DOMAIN_CONFIG: {
    '101': { name: '工作人格', icon: 'heart-o' },
    '102': { name: '职业能力', icon: 'tool' },
    '103': { name: '社区独立能力', icon: 'team' },
  },
  OCCUPATION_ABILITY_REQUIRE: [
    {
      name: '需自行处理交通',
      id: 'traffic',
      necessaryAbility: ['C22'],
    },
    {
      name: '需自行处理吃饭',
      id: 'eat',
      necessaryAbility: ['C1', 'C16', 'C17', 'C18'],
    },
    {
      name: '需自行处理住宿',
      id: 'lodge',
      necessaryAbility: ['C2', 'C3', 'C11', 'C16', 'C17', 'C18', 'C29'],
    },
  ],
};
