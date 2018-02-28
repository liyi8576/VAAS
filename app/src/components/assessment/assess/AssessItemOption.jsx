import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

/**
 * 检核项选项选取组件子组件 - 检核项选项
 * @param option  选项
 * @param content 选项内容
 * @param checked 是否选中
 * @param onSelect 选中选项回调函数
 * @return {*}
 */
const AssessItemOption = ({ option, content, checked = false, onSelect }) => {
  return (
    <div styleName={'asm-item' + (checked ? ' checked' : '')} onClick={() => onSelect(option)}>
      <div styleName={'asm-item-head'}>
        {checked && <div styleName="asm-checked-div" />}
        {checked && <Icon type={'check'} styleName={'checked-ico'} />}
        <span>选项 {option}</span>
      </div>
      <div
        styleName={'asm-item-body'}
        dangerouslySetInnerHTML={{
          __html: content && content.replace(/(\d\.)/g, '<br/>$1&nbsp;&nbsp;'),
        }}
      />
    </div>
  );
};

AssessItemOption.propTypes = {
  option: PropTypes.string,
  content: PropTypes.string,
  checked: PropTypes.bool,
  onSelect: PropTypes.func,
};
export default CSSModules(AssessItemOption, styles, { allowMultiple: true });
