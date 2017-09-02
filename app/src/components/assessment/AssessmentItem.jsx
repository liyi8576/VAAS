import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AssessmentItem = ({ title, body }) => {
  return (
    <div styleName={'asm-item'}>
      <div styleName={'asm-item-head'}>
        <Checkbox />
        <span>选项 A: 具有下列行为之一者属之</span>
      </div>
      <div styleName={'asm-item-body'}>
        1.经常未请假无故缺席<br />
        2.经常请假（非必要的<br />
        3.在加班的非常情况下，缺席率增高<br />
        4.需要一再地提醒才能正常出席<br />
      </div>
    </div>
  );
};

AssessmentItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};
export default CSSModules(AssessmentItem, styles);
