import Mock from 'mockjs';
import { AbilityList } from './AbilityData';
Mock.mock(/\/api\/abilities/, {
  success: true,
  data: [
    { id: 'A1', name: '出席', domain: '101' },
    { id: 'A2', name: '准时', domain: '101' },
    { id: 'A3', name: '保持个人卫生的习惯', domain: '101' },
    { id: 'A4', name: '无习惯性动作或语言', domain: '101' },
    { id: 'A5', name: '礼貌', domain: '101' },
    { id: 'A6', name: '愉快', domain: '101' },
    { id: 'A7', name: '诚实', domain: '101' },
    { id: 'A8', name: '友善', domain: '101' },
    { id: 'A9', name: '动机', domain: '101' },
    { id: 'A10', name: '努力', domain: '101' },
    { id: 'A11', name: '创意', domain: '101' },
    { id: 'A12', name: '自信', domain: '101' },
    { id: 'A13', name: '谨慎', domain: '101' },
    { id: 'A14', name: '经济', domain: '101' },
    { id: 'A15', name: '竞争心', domain: '101' },
    { id: 'A16', name: '责任感', domain: '101' },
    { id: 'A17', name: '可靠性', domain: '101' },
    { id: 'A18', name: '专注力', domain: '101' },
    { id: 'A19', name: '洞察力', domain: '101' },
    { id: 'A20', name: '决断力', domain: '101' },
    { id: 'A21', name: '改变常规的能力', domain: '101' },
    { id: 'A22', name: '接受批评', domain: '101' },
    { id: 'A23', name: '挫折忍受力', domain: '101' },
    { id: 'A24', name: '克服压力', domain: '101' },
    { id: 'A25', name: '有始有终', domain: '101' },
    { id: 'A26', name: '独立作业', domain: '101' },
    { id: 'A27', name: '小组合作', domain: '101' },
    { id: 'A28', name: '与上司合作', domain: '101' },
    { id: 'A29', name: '工作品质', domain: '101' },
    { id: 'A30', name: '按时完成工作', domain: '101' },
    { id: 'A31', name: '自我批评', domain: '101' },
    { id: 'A32', name: '请求协助', domain: '101' },
    { id: 'A33', name: '安全习惯', domain: '101' },
    { id: 'A34', name: '收拾的习惯', domain: '101' },
    { id: 'B1', name: '工作姿势-站', domain: '102' },
    { id: 'B2', name: '工作姿势-走动', domain: '102' },
    { id: 'B3', name: '工作姿势-站跑', domain: '102' },
    { id: 'B4', name: '工作姿势-跨（跳）', domain: '102' },
    { id: 'B5', name: '工作姿势-蹲', domain: '102' },
    { id: 'B6', name: '工作姿势-跪', domain: '102' },
    { id: 'B7', name: '工作姿势-坐', domain: '102' },
    { id: 'B8', name: '工作姿势-爬', domain: '102' },
    { id: 'B9', name: '工作姿势-躺', domain: '102' },
    { id: 'B10', name: '工作姿势-弯腰', domain: '102' },
    { id: 'B11', name: '工作姿势-攀登', domain: '102' },
    { id: 'B12', name: '工作姿势-平衡', domain: '102' },
    { id: 'B13', name: '体力负担-攀', domain: '102' },
    { id: 'B14', name: '体力负担-携带', domain: '102' },
    { id: 'B15', name: '体力负担-推', domain: '102' },
    { id: 'B16', name: '体力负担-拉', domain: '102' },
    { id: 'B17', name: '体力负担-扛', domain: '102' },
    { id: 'B18', name: '上肢活动-伸（手）', domain: '102' },
    { id: 'B19', name: '上肢活动-握持', domain: '102' },
    { id: 'B20', name: '上肢活动-扭转', domain: '102' },
    { id: 'B21', name: '上肢活动-手指拨弄', domain: '102' },
    { id: 'B22', name: '感官知觉-光线的调适', domain: '102' },
    { id: 'B23', name: '感官知觉-视觉敏锐度、视野', domain: '102' },
    { id: 'B24', name: '感官知觉-形状感', domain: '102' },
    { id: 'B25', name: '感官知觉-大小辨别', domain: '102' },
    { id: 'B26', name: '感官知觉-色彩辨别', domain: '102' },
    { id: 'B27', name: '感官知觉-空间知觉', domain: '102' },
    { id: 'B28', name: '感官知觉-触觉', domain: '102' },
    { id: 'B29', name: '感官知觉-听辨力', domain: '102' },
    { id: 'B30', name: '感官知觉-听力', domain: '102' },
    { id: 'B31', name: '感官知觉-嗅味觉', domain: '102' },
    { id: 'B32', name: '协调能力-手眼协调', domain: '102' },
    { id: 'B33', name: '协调能力-手脚协调', domain: '102' },
    { id: 'B34', name: '协调能力-手眼脚协调', domain: '102' },
    { id: 'B35', name: '应付工作的足够体力', domain: '102' },
    { id: 'B36', name: '记住指示', domain: '102' },
    { id: 'B37', name: '简单的口语沟通能力', domain: '102' },
    { id: 'B38', name: '使用职业词汇', domain: '102' },
    { id: 'B39', name: '简单的阅读能力', domain: '102' },
    { id: 'B40', name: '简单的书写能力', domain: '102' },
    { id: 'B41', name: '填写求职表件', domain: '102' },
    { id: 'B42', name: '机械的操作与难度', domain: '102' },
    { id: 'B43', name: '工具使用-手工具的使用与难度', domain: '102' },
    { id: 'B44', name: '工具使用-长臂工具的使用与难度', domain: '102' },
    { id: 'B45', name: '工具使用-电动工具的使用与难度', domain: '102' },
    { id: 'B46', name: '工具使用-技术性工具的使用与难度', domain: '102' },
    { id: 'B47', name: '工具使用-测量工具的使用与难度', domain: '102' },
    { id: 'B48', name: '材料的运用', domain: '102' },
    { id: 'B49', name: '维持工作场所中安全的能力', domain: '102' },
    { id: 'B50', name: '基本计算能力', domain: '102' },
    { id: 'B51', name: '基本测量能力-重量、体积、容积的测量', domain: '102' },
    { id: 'B52', name: '基本测量能力-大小、长短的测量', domain: '102' },
    { id: 'B53', name: '时间的测量', domain: '102' },
    { id: 'B54', name: '工作程序-反复动作', domain: '102' },
    { id: 'B55', name: '工作程序-固定顺序', domain: '102' },
    { id: 'B56', name: '工作程序-变动、自主', domain: '102' },
    { id: 'B57', name: '工作程序-速度的适应', domain: '102' },
    { id: 'B58', name: '工作程序-组织工作的能力', domain: '102' },
    { id: 'B59', name: '应变能力', domain: '102' },
    { id: 'B60', name: '做决定的能力', domain: '102' },
    { id: 'B61', name: '工作环境-场所', domain: '102' },
    { id: 'B62', name: '工作环境-照明', domain: '102' },
    { id: 'B63', name: '工作环境-空气', domain: '102' },
    { id: 'B64', name: '工作环境-声音', domain: '102' },
    { id: 'B65', name: '工作环境-温湿度', domain: '102' },
    { id: 'B66', name: '工作环境-危险性', domain: '102' },
    { id: 'B67', name: '工作环境-防护装备', domain: '102' },
    { id: 'B68', name: '工作环境-职业伤害', domain: '102' },
    { id: 'C1', name: '家庭维持-烹饪的能力', domain: '103' },
    { id: 'C2', name: '家庭维持-家居的能力', domain: '103' },
    { id: 'C3', name: '家庭维持-家居安全', domain: '103' },
    { id: 'C4', name: '金钱的管理-收入的计算', domain: '103' },
    { id: 'C5', name: '金钱的管理-预算及支出', domain: '103' },
    { id: 'C6', name: '金钱的管理-借贷', domain: '103' },
    { id: 'C7', name: '金钱的管理-储蓄', domain: '103' },
    { id: 'C8', name: '金钱的管理-纳税', domain: '103' },
    { id: 'C9', name: '个人卫生与保健-涣洗与整饰', domain: '103' },
    { id: 'C10', name: '个人卫生与保健-身心保健', domain: '103' },
    { id: 'C11', name: '个人卫生与保健-疾病医疗', domain: '103' },
    { id: 'C12', name: '休闲生活-休闲资源的使用', domain: '103' },
    { id: 'C13', name: '休闲生活-参与社区活动', domain: '103' },
    { id: 'C14', name: '休闲生活-活动安排的能力', domain: '103' },
    { id: 'C15', name: '休闲生活-旅行能力', domain: '103' },
    { id: 'C16', name: '购物与消费-购物场所', domain: '103' },
    { id: 'C17', name: '购物与消费-购物物品', domain: '103' },
    { id: 'C18', name: '购物与消费-购物手续', domain: '103' },
    { id: 'C19', name: '社交能力-家居礼仪', domain: '103' },
    { id: 'C20', name: '社交能力-睦邻', domain: '103' },
    { id: 'C21', name: '社交能力-社交礼节', domain: '103' },
    { id: 'C22', name: '行的能力-独自行动的能力', domain: '103' },
    { id: 'C23', name: '参与公民活动-参与公民权利与义务', domain: '103' },
    { id: 'C24', name: '参与公民活动-了解基本的法律常识', domain: '103' },
    { id: 'C25', name: '地方意识及资源运用-地方意识', domain: '103' },
    { id: 'C26', name: '地方意识及资源运用-地方资源利用', domain: '103' },
    { id: 'C27', name: '时间意识及运用-时间观念', domain: '103' },
    { id: 'C28', name: '时间意识及运用-时间安排与应用', domain: '103' },
    { id: 'C29', name: '社区安全能力-社区安全', domain: '103' },
    { id: 'C30', name: '社区安全能力-天然灾害', domain: '103' },
  ],
});