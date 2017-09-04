import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AssessmentOption = ({ title, body }) => {
  return (
    <div styleName={'asm-item'}>
      <div styleName={'asm-item-head'}>
        <Radio />
        <span>
          选项 {title}
        </span>
      </div>
      <div
        styleName={'asm-item-body'}
        dangerouslySetInnerHTML={{ __html: body && body.replace(/(\d\.)/g, '<br/>$1&nbsp;&nbsp;') }}
      />
    </div>
  );
};

AssessmentOption.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};
export default CSSModules(AssessmentOption, styles);
