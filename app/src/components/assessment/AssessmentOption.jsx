import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AssessmentOption = ({ option, body, checked = true, onclick }) => {
  return (
    <div
      styleName={'asm-item' + (checked ? ' checked' : '')}
      onClick={() => onclick(option)}
    >
      <div styleName={'asm-item-head'}>
        {checked && <div styleName="asm-checked-div"/>}
        {checked && <Icon type={'check'} styleName={'checked-ico'} />}
        <span>
          选项 {option}
        </span>
      </div>
      <div
        styleName={'asm-item-body'}
        dangerouslySetInnerHTML={{
          __html: body && body.replace(/(\d\.)/g, '<br/>$1&nbsp;&nbsp;'),
        }}
      />
    </div>
  );
};

AssessmentOption.propTypes = {
  checked: PropTypes.bool,
  option: PropTypes.string,
  body: PropTypes.string,
  onclick: PropTypes.func,
};
export default CSSModules(AssessmentOption, styles, { allowMultiple: true });
