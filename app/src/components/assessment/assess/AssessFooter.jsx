import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Button, Icon, Spin } from 'antd';
import _ from 'lodash';
import styles from 'style/Assessment.scss';

const AssessFooter = ({
  loading = true,
  saving = false,
  prevItem = null,
  nextItem = null,
  handleNav = _.noop,
  handleBack = _.noop,
}) => {
  return (
    <div styleName={'asm-footer'}>
      <Button icon={'left-circle-o'} onClick={handleBack} size="large" loading={saving}>
        返回列表
      </Button>
      <Spin spinning={saving} tip="保存中..." size={'small'}>
        <Button.Group>
          <Button
            type="primary"
            size="large"
            disabled={loading || prevItem == null}
            onClick={() => {
              handleNav(prevItem);
            }}
          >
            <Icon type="left" />上一项
          </Button>
          <Button
            type="primary"
            size="large"
            disabled={loading || nextItem == null}
            onClick={() => {
              handleNav(nextItem);
            }}
          >
            下一项<Icon type="right" />
          </Button>
        </Button.Group>
      </Spin>
    </div>
  );
};
AssessFooter.propTypes = {
  loading: PropTypes.bool,
  prevItem: PropTypes.string,
  nextItem: PropTypes.string,
  handleBack: PropTypes.func,
};
export default CSSModules(AssessFooter, styles);
