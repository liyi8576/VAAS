import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../../../style/Occupation.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const BasicInfo = ({
  occupation = {},
  setValidateFunc,
  setGetFieldValuesFunc,
  form: { getFieldDecorator, validateFields, getFieldsValue },
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
    <Form layout="horizontal" styleName="form">
      <FormItem
        label="职业名称"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
      >
        {getFieldDecorator('name', {
          initialValue: occupation.name,
          rules: [
            {
              required: true,
              message: '请输入职业名称',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="职业描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('desc', {
          initialValue: occupation.desc,
        })(
          <TextArea
            placeholder="请填写职业描述"
            autosize={{ minRows: 5, maxRows: 5 }}
          />,
        )}
      </FormItem>
    </Form>
  );
};

BasicInfo.propTypes = {
  occupation: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
};

export default Form.create()(CSSModules(BasicInfo, styles));
