import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const AssessHead = ({ assessData = {} }) => {
  return (
    <div styleName={'asm-head'}>
      <ul>
        <li>{assessData.traineeName || 'N/A'}</li>
        <li>检核人: {assessData.assessor || 'N/A'}</li>
        <li>开始日期: {assessData.assessDate || 'N/A'}</li>
        <li>
          检核进度:<span styleName={'percent'}>{`${assessData.percent || 'N/A'}%`} </span>
          <span style={{ opacity: 0.5 }}>{`( ${assessData.progress || 'N/A'} )`}</span>
        </li>
      </ul>
    </div>
  );
};
AssessHead.propTypes = {
  traineeId: PropTypes.string, //检核学员编码
  assessData: PropTypes.object,
};
export default CSSModules(AssessHead, styles);
