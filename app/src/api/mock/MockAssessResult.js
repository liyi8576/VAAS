import Mock from 'mockjs';
import _ from 'lodash';
import { AbilityList } from './AbilityData';

/**
 * 查询学生检核结果
 * URL：/api/trainees/{traineeId}/assessResult
 * METHOD： GET
 * RETURN： {success:true, data:[{id:'',name:'',domain:'',assessOption:''}]}
 */
Mock.mock(/\/api\/trainees\/\w+\/assessResult/, {
  success: true,
  data: function() {
    return AbilityList.reduce((resultAry, ability) => {
      resultAry.push({
        id: ability.id,
        name: ability.name,
        domain: ability.domain,
        assessOption: _.sample(['A', 'B', 'C', 'D'], 1),
      });
      return resultAry;
    }, []);
  },
});


/**
 * 查询学生职业检核比对结果
 * URL：/api/trainees/{trainneeId}/occupations\{occupationsId}/constrast/
 * METHOD： GET
 * RETURN： {success:true, data:[{domain:'',abilityId:'',criterionScore:'',necessaryLevel:'',assessOption:''}]}
 */
Mock.mock(/\/api\/trainees\/\w+\/occupations\/\w+\/constrast/, {
  success: true,
  'data|40': [
    {
      'domain|+1': [
        '101',
        '101',
        '103',
        '101',
        '102',
        '102',
        '101',
        '101',
        '103',
        '103',
        '102',
        '101',
        '101',
        '101',
        '102',
        '102',
        '102',
        '102',
        '102',
        '103',
        '103',
        '103',
        '102',
        '102',
        '103',
        '103',
        '103',
        '103',
        '103',
        '103',
        '103',
        '103',
        '102',
        '102',
        '102',
        '102',
        '102',
        '102',
        '102',
        '102',
      ],
      'abilityId|+1': [
        'A1',
        'A2',
        'C6',
        'A3',
        'B2',
        'B3',
        'A4',
        'A5',
        'C4',
        'C5',
        'B7',
        'A6',
        'A7',
        'A8',
        'B1',
        'B4',
        'B8',
        'B5',
        'B6',
        'C1',
        'C2',
        'C3',
        'B9',
        'B10',
        'C8',
        'C7',
        'C11',
        'C12',
        'C13',
        'C14',
        'C15',
        'C16',
        'B15',
        'B16',
        'B17',
        'B18',
        'B19',
        'B20',
        'B21',
        'B22',
      ],
      'criterionScore|1': ['A', 'B', 'C'],
      'necessaryLevel|1': [-1, 1],
      'assessOption|1': ['A', 'B', 'C'],
    },
  ],
});
