import React from 'react'
import {Card, Row, Col, Icon} from "antd";
import styles from './Trainee.scss';
import CSSModules from 'react-css-modules'

const TraineeInfo = ({}) => {
  return (
    <div className="content-inner" styleName="detail">
      <Card bordered={false} noHovering="false" >
        <div styleName="face">
          <img alt={'学生照片'} src={'/images/face.png'}/>
        </div>
        <div styleName="info">
          <p>张三</p>
          <ul>
            <li><Icon type="man" style={{color: '#108ee9'}}/>男</li>
            <li>28岁(2000年1月1日)</li>
            <li>监护人：张大(父子关系)</li>
          </ul>
          <ul>
            <li><span><Icon type="mobile"/><span>13991919191</span></span></li>
            <li><span><Icon type="mail"/><span>zhangsan@126.com</span></span></li>
          </ul>
        </div>
      </Card>
      <Card title="基础信息" bordered={false} noHovering="false" >
        <Row>
          <Col span="5">身高:</Col>
          <Col span="7">180cm</Col>
          <Col span="5">体重:</Col>
          <Col span="7">50kg</Col>
        </Row>
        <Row>
          <Col span="5">身份证号:</Col>
          <Col span="7">6111111111111111111</Col>
          <Col span="5">家庭地址:</Col>
          <Col span="7">陕西省西安市测试测试</Col>
        </Row>
      </Card>
      <Card title="障碍信息" bordered={false} noHovering="false" >
        <Row>
          <Col span="5">主要障碍类型:</Col>
          <Col span="7">测试</Col>
          <Col span="5">障碍等级:</Col>
          <Col span="7">三级</Col>
        </Row>
        <Row>
          <Col span="5">障碍原因:</Col>
          <Col span="19">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</Col>
        </Row>
        <Row>
          <Col span="5">其他障碍:</Col>
          <Col span="19">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</Col>
        </Row>
      </Card>
      <Card title="教育经历" bordered={false} noHovering="false" >
        <Row>
          <Col span="5">教育程度:</Col>
          <Col span="7">测试</Col>
          <Col span="5">教育水平:</Col>
          <Col span="7">测试</Col>
        </Row>
        <Row>
          <Col span="5">是否接受过职业训练:</Col>
          <Col span="19">是</Col>
        </Row>
        <Row>
          <Col span="5">职业训练说明:</Col>
          <Col span="19">测试</Col>
        </Row>
      </Card>
      <Card title="工作经历" bordered={false} noHovering="false" >
        <Row>
          <Col span="5">是否有工作经验:</Col>
          <Col span="19">有</Col>
        </Row>
        <Row>
          <Col span="5">工作经验描述:</Col>
          <Col span="19">测试</Col>
        </Row>
        <Row>
          <Col span="5">期望从事的工作:</Col>
          <Col span="19">测试</Col>
        </Row>
      </Card>
      <Card title="家庭背景" bordered={false} noHovering="false" >
        <Row>
          <Col span="3">父亲:</Col>
          <Col span="5">张大:</Col>
          <Col span="3">教育程度:</Col>
          <Col span="5">学士:</Col>
          <Col span="3">父亲职业:</Col>
          <Col span="5">工程师</Col>
        </Row>
        <Row>
          <Col span="3">母亲:</Col>
          <Col span="5">李四:</Col>
          <Col span="3">教育程度:</Col>
          <Col span="5">学士:</Col>
          <Col span="3">母亲职业:</Col>
          <Col span="5">工程师</Col>
        </Row>
      </Card>
      <Card title="其他" bordered={false} noHovering="false" >
        <Row>
          <Col span="5">创建人:</Col>
          <Col span="7">创建时间:</Col>
          <Col span="5">修改人:</Col>
          <Col span="7">修改时间:</Col>
        </Row>
      </Card>
    </div>
  )
};
export default CSSModules(TraineeInfo, styles);
