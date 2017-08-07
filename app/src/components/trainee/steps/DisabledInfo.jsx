import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, DatePicker, Radio, Col, Row, Select} from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const DisabledInfo = ({
                        form: {
                          getFieldDecorator,
                          validateFields,
                          getFieldsValue,
                        }
                      }) => {
  return (
    <Form layout="horizontal" styleName="form-card">
      <FormItem label="主要障碍类型" hasFeedback labelCol={{span: 6}}
                wrapperCol={{span: 6}}>
        {getFieldDecorator('disabled_type', {
          rules: [
            {
              required: true,
              message: '请选择障碍类型'
            },
          ],
        })(
          <Select style={{marginLeft: '5px'}}
                  placeholder="请选择障碍类型"
          >
          </Select>
        )}
      </FormItem>
      <FormItem label="障碍等级" hasFeedback labelCol={{span: 6}}
                wrapperCol={{span: 6}}>
        {getFieldDecorator('disabled_level', {
          rules: [
            {
              required: true,
              message: '请选择障碍等级'
            },
          ],
        })(
          <Select style={{marginLeft: '5px'}}
                  placeholder="请选择障碍等级"
          >
          </Select>
        )}
      </FormItem>
      <FormItem label="障碍原因" labelCol={{span: 6}}
                wrapperCol={{span: 12}}>
        {getFieldDecorator('disabled_level', {})(
          <TextArea style={{marginLeft: '5px'}}
                    placeholder="请填写障碍原因" autosize={{minRows: 3, maxRows: 3}}
          />
        )}
      </FormItem>
      <FormItem label="其他障碍" labelCol={{span: 6}}
                wrapperCol={{span: 12}}>
        {getFieldDecorator('disabled_level', {})(
          <TextArea style={{marginLeft: '5px'}}
                    placeholder="如有其他障碍，请填写" autosize={{minRows: 3, maxRows: 3}}
          />
        )}
      </FormItem>
    </Form>
  );
};

DisabledInfo.propTypes = {};

export default Form.create()(CSSModules(DisabledInfo, styles));
