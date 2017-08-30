import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const DisabledInfo = ({
  trainee,
  disabledTypeDic = [],
  disabledLevelDic = [],
  setValidateFunc,
  setGetFieldValuesFunc,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  dicHelper: { getDicName, getDicsByGroup },
}) => {
  setValidateFunc(() => {
    let vals = null;
    validateFields(null, { first: true, force: true }, (errors, values) => {
      if (errors === null) {
        vals = values;
      }
    });
    return vals;
  });
  setGetFieldValuesFunc(() => {
    return getFieldsValue();
  });
  return (
    <Form layout="horizontal" styleName="form-card">
      <FormItem
        label="主要障碍类型"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6 }}
      >
        {getFieldDecorator('disabledType', {
          initialValue: trainee.disabledType,
          rules: [{ required: true, message: '请选择障碍类型' }],
        })(
          <Select style={{ marginLeft: '5px' }} placeholder="请选择障碍类型">
            {getDicsByGroup('DISABLED_TYPE').map(dic =>
              <Option value={dic.value} key={`dtd-${dic.value}`}>
                {dic.name}
              </Option>,
            )}
          </Select>,
        )}
      </FormItem>
      <FormItem
        label="障碍等级"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6 }}
      >
        {getFieldDecorator('disabledLevel', {
          initialValue: trainee.disabledLevel,
          rules: [{ required: true, message: '请选择障碍等级' }],
        })(
          <Select style={{ marginLeft: '5px' }} placeholder="请选择障碍等级">
            {getDicsByGroup('DISABLED_LEVEL').map(dic =>
              <Option value={dic.value} key={`dld-${dic.value}`}>
                {dic.name}
              </Option>,
            )}
          </Select>,
        )}
      </FormItem>
      <FormItem label="障碍原因" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        {getFieldDecorator('disabledReason', {
          initialValue: trainee.disabledReason,
          rules: [{ required: true, message: '请输入障碍原因' }],
        })(
          <TextArea
            style={{ marginLeft: '5px' }}
            placeholder="请填写障碍原因"
            autosize={{ minRows: 3, maxRows: 3 }}
          />,
        )}
      </FormItem>
      <FormItem label="其他障碍" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        {getFieldDecorator('otherDisabled', {
          initialValue: trainee.otherDisabled,
        })(
          <TextArea
            style={{ marginLeft: '5px' }}
            placeholder="如有其他障碍，请填写"
            autosize={{ minRows: 3, maxRows: 3 }}
          />,
        )}
      </FormItem>
    </Form>
  );
};

DisabledInfo.propTypes = {
  trainee: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
  disabledTypeDic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  ),
  disabledLevelDic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  ),
};

export default Form.create()(CSSModules(DisabledInfo, styles));
