import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import AbilitySelect from './AbilitySelect';
import AssessmentItemPage from 'containers/assessment/AssessmentItemPage';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const ButtonGroup = Button.Group;

const Assessment = ({ ability = {}, traineeAssess = {} }) => {
  const render_head = () => {
    const abilityCount = Object.keys(ability.abilities).length;
    const percent =
      abilityCount === 0
        ? 'N/A'
        : (traineeAssess.assessCount / abilityCount).toFixed(0);
    return (
      <div styleName={'asm-head'}>
        <ul>
          <li>
            {traineeAssess.traineeName}
          </li>
          <li>
            检核人: {traineeAssess.assessor}
          </li>
          <li>
            开始日期: {traineeAssess.assessDate}
          </li>
          <li>
            检核进度:<span styleName={'percent'}>{percent}%</span>
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
        <AbilitySelect
          ability={ability}
          assessResult={traineeAssess.assessResult || {}}
        />
        <AssessmentItemPage />
      </div>
      {render_footer()}
    </div>
  );
};
Assessment.propTypes = {
  ability: PropTypes.object,
  traineeAssess: PropTypes.object,
};
export default CSSModules(Assessment, styles);
