import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Alert } from 'antd';
import AssessmentItem from './AssessmentItem';
import AbilitySelect from './AbilitySelect';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const ButtonGroup = Button.Group;

const Assessment = () => {
  const render_head = () => {
    return (
      <div styleName={'asm-head'}>
        <ul>
          <li>张三</li>
          <li>检核人: 李四</li>
          <li>开始时间: 2017年08月01日</li>
          <li>
            检核进度:<span styleName={'percent'}>50%</span>
          </li>
        </ul>
      </div>
    );
  };
  const render_footer = () => {
    return (
      <div styleName={'asm-footer'}>
        <div>
          <ButtonGroup>
            <Button type="primary">
              <Icon type="left" />上一项
            </Button>
            <Button type="primary">
              下一项<Icon type="right" />
            </Button>
          </ButtonGroup>
        </div>
        <Button type="primary">保 存</Button>
      </div>
    );
  };
  return (
    <div styleName={'assessment'}>
      {render_head()}
      <div styleName={'asm-content'}>
        <div styleName={'asm-title'}>
          <div styleName={'title'}>
            <Icon type="menu-unfold" /> 工作人格 / 出行
          </div>
        </div>
        <AbilitySelect/>
        <Card
          title={null}
          bordered={false}
          noHovering="false"
          loading={false}
          bodyStyle={{ padding: '0' }}
        >
          <Alert
            message="在工作过程中，能够机智地表现出创造性的能力，促使工作的品质、速度、产品获得若干程度的改善，并为工作单位所认同与乐见"
            type="warning"
          />
          <h4>检核方式: 从日常生活中观察评量之</h4>
          <div styleName={'asm-options-box'}>
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
          </div>
        </Card>
      </div>
      {render_footer()}
    </div>
  );
};
Assessment.propTypes = {};
export default CSSModules(Assessment, styles, { allowMultiple: true });
