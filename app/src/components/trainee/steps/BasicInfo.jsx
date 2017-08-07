import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Radio, Col, Row, Select } from 'antd';
import CSSModules from 'react-css-modules';
import styles from '../Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const BasicInfo = ({
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  return (
    <Form layout="horizontal" styleName="form-card">
      <FormItem
        label="姓  名"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 4 }}
      >
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入学生姓名',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="性  别" labelCol={{ span: 6 }} wrapperCol={{ span: 6 }}>
        {getFieldDecorator('sex', {
          initialValue: 'M',
        })(
          <Radio.Group>
            <Radio value="M">男</Radio>
            <Radio value="F">女</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem
        label="身份证号"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 9 }}
        hasFeedback
      >
        {getFieldDecorator('id_card', {
          rules: [
            {
              required: true,
              message: '请输入身份证号码',
            },
          ],
        })(<Input placeholder="请填写有效身份证件编号" />)}
      </FormItem>
      <FormItem label="出生日期" labelCol={{ span: 6 }} wrapperCol={{ span: 6 }}>
        {getFieldDecorator('birthday', {
          rules: [
            {
              required: true,
              message: '请选择出生日期',
            },
          ],
        })(<DatePicker />)}
      </FormItem>
      <Row>
        <Col span={6} offset={4}>
          <FormItem
            label="监护人"
            hasFeedback
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {getFieldDecorator('guardian', {
              rules: [
                {
                  required: true,
                  message: '请输入监护人',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem wrapperCol={{ span: 12 }}>
            {getFieldDecorator('relationship', {})(
              <Select placeholder="请选择与本人关系" style={{marginLeft:'5px'}}>
                <Option value="male">父子</Option>
                <Option value="female">母子</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
      </Row>
      <FormItem
        label="联系方式"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 9 }}
      >
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入联系方式',
            },
          ],
        })(<Input placeholder="请选择联系电话" />)}
      </FormItem>
      <FormItem
        label="住  址"
        hasFeedback
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('address', {})(
          <TextArea
            autosize={{ minRows: 2, maxRows: 2 }}
            placeholder="请填写家庭地址"
          />,
        )}
      </FormItem>
    </Form>
  );
};

BasicInfo.propTypes = {};

export default Form.create()(CSSModules(BasicInfo, styles));
