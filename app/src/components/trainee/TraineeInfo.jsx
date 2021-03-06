import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Icon } from 'antd';
import styles from 'style/Trainee.scss';
import CSSModules from 'react-css-modules';

const TraineeInfo = ({ trainee, dicHelper: { getDicName } }) => {
  return (
    <div className="content-inner" styleName="detail">
      <Card bordered={false} noHovering="false">
        <div styleName="face">
          <img alt={'学生照片'} src={'/vaas/images/face.png'} />
        </div>
        <div styleName="info">
          <p>{trainee.name}</p>
          <ul>
            <li>
              <Icon type={trainee.sex ? 'man' : 'woman'} style={{ color: '#108ee9' }} />
              {trainee.sex ? '男' : '女'}
            </li>
            <li>
              {trainee.age}岁 ({trainee.birthday})
            </li>
            <li>
              监护人：{trainee.guardian}({getDicName('RELATION_SHIP', trainee.relationship)})
            </li>
          </ul>
          <ul>
            <li>
              <span>
                <Icon type="mobile" /> {trainee.phone}
              </span>
            </li>
            <li>
              <span>
                <Icon type="mail" /> {trainee.mail}
              </span>
            </li>
          </ul>
        </div>
      </Card>
      <Card title="基础信息" bordered={false} noHovering="false">
        <Row>
          <Col span="5">身份证号:</Col>
          <Col>{trainee.idCard}</Col>
        </Row>
        <Row>
          <Col span="5">家庭地址:</Col>
          <Col>{trainee.address}</Col>
        </Row>
      </Card>
      <Card title="障碍信息" bordered={false} noHovering="false">
        <Row>
          <Col span="5">主要障碍类型:</Col>
          <Col span="7">{getDicName('DISABLED_TYPE', trainee.disabledType)}</Col>
          <Col span="5">障碍等级:</Col>
          <Col span="7">{getDicName('DISABLED_LEVEL', trainee.disabledLevel)}</Col>
        </Row>
        <Row>
          <Col span="5">障碍原因:</Col>
          <Col span="19">{trainee.disabledReason}</Col>
        </Row>
        <Row>
          <Col span="5">其他障碍:</Col>
          <Col span="19">{trainee.otherDisabled}</Col>
        </Row>
      </Card>
      <Card title="教育经历" bordered={false} noHovering="false">
        <Row>
          <Col span="5">教育程度:</Col>
          <Col span="7">{getDicName('DEGREE_TYPE', trainee.degree)}</Col>
          <Col span="5">教育水平:</Col>
          <Col span="7">{getDicName('EDUCATION_LEVEL', trainee.educationLevel)}</Col>
        </Row>
        <Row>
          <Col span="5">是否接受过职业训练:</Col>
          <Col span="19">{trainee.haveTrained === 1 ? '是' : '否'}</Col>
        </Row>
        <Row>
          <Col span="5">职业训练说明:</Col>
          <Col span="19">{trainee.trainedIntro}</Col>
        </Row>
      </Card>
      <Card title="工作经历" bordered={false} noHovering="false">
        <Row>
          <Col span="5">是否有工作经验:</Col>
          <Col span="19">{trainee.isWorked === 1 ? '是' : '否'}</Col>
        </Row>
        <Row>
          <Col span="5">工作经验描述:</Col>
          <Col span="19">{trainee.workedIntro}</Col>
        </Row>
        <Row>
          <Col span="5">期望从事的工作:</Col>
          <Col span="19">{trainee.expectWork}</Col>
        </Row>
      </Card>
      <Card title="家庭背景" bordered={false} noHovering="false">
        <Row>
          <Col span="3">父亲:</Col>
          <Col span="5">{trainee.father}</Col>
          <Col span="3">教育程度:</Col>
          <Col span="5">{getDicName('DEGREE_TYPE', trainee.fatherDegree)}</Col>
          <Col span="3">父亲职业:</Col>
          <Col span="5">{getDicName('JOB_TYPE', trainee.fatherJob)}</Col>
        </Row>
        <Row>
          <Col span="3">母亲:</Col>
          <Col span="5">{trainee.mother}</Col>
          <Col span="3">教育程度:</Col>
          <Col span="5">{getDicName('DEGREE_TYPE', trainee.motherDegree)}</Col>
          <Col span="3">母亲职业:</Col>
          <Col span="5">{getDicName('JOB_TYPE', trainee.motherJob)}</Col>
        </Row>
      </Card>
      <Card title="其他" bordered={false} noHovering="false">
        <Row>
          <Col span="3">创建人:</Col>
          <Col span="8">{trainee.creator}</Col>
          <Col span="3">创建时间:</Col>
          <Col span="8">{trainee.createTime}</Col>
        </Row>
        <Row>
          <Col span="3">修改人:</Col>
          <Col span="8">{trainee.modifier}</Col>
          <Col span="3">修改时间:</Col>
          <Col span="8">{trainee.modifyTime}</Col>
        </Row>
      </Card>
    </div>
  );
};
TraineeInfo.propTypes = {
  trainee: PropTypes.object.isRequired,
};

export default CSSModules(TraineeInfo, styles);
