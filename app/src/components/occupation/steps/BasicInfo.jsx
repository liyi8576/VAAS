import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Occupation.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const BasicInfo = ({ form: { getFieldDecorator } }) => {
  return (
    <Form layout="horizontal" styleName="form">
      <FormItem
        label="职业名称"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
      >
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入职业名称',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="职业描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('description', {})(
          <TextArea
            placeholder="请填写职业描述"
            autosize={{ minRows: 3, maxRows: 4 }}
          />,
        )}
      </FormItem>
    </Form>
  );
};

BasicInfo.PropTypes = {
  isCreate: PropTypes.func,
};

export default Form.create()(CSSModules(BasicInfo, styles));
