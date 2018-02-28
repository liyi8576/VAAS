import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, DatePicker, Radio, Col, Row, Select } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Trainee.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const BasicInfo = ({
  trainee = {},
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
      <FormItem label="姓  名" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 4 }}>
        {getFieldDecorator('name', {
          initialValue: trainee.name,
          rules: [{ required: true, message: '请输入学生姓名' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="性  别" labelCol={{ span: 6 }} wrapperCol={{ span: 6 }}>
        {getFieldDecorator('sex', {
          initialValue: trainee.sex,
          rules: [{ required: true, message: '请选择性别' }],
        })(
          <Radio.Group>
            <Radio value="M">男</Radio>
            <Radio value="F">女</Radio>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem label="身份证号" labelCol={{ span: 6 }} wrapperCol={{ span: 9 }} hasFeedback>
        {getFieldDecorator('idCard', {
          initialValue: trainee.idCard,
          rules: [
            {
              required: true,
              //pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '请输入身份证号码',
            },
          ],
        })(<Input placeholder="请填写有效身份证件编号" />)}
      </FormItem>
      <FormItem label="出生日期" labelCol={{ span: 6 }} wrapperCol={{ span: 6 }}>
        {getFieldDecorator('birthday', {
          initialValue: trainee.birthday && moment(trainee.birthday),
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
          <FormItem label="监护人" hasFeedback labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            {getFieldDecorator('guardian', {
              initialValue: trainee.guardian,
              rules: [{ required: true, message: '请输入监护人' }],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem wrapperCol={{ span: 12 }}>
            {getFieldDecorator('relationship', {
              initialValue: trainee.relationship,
              rules: [{ required: true, message: '请选择与本人关系' }],
            })(
              <Select placeholder="请选择与本人关系" style={{ marginLeft: '5px' }}>
                {getDicsByGroup('RELATION_SHIP').map(dic => (
                  <Option value={dic.value} key={`rsd-${dic.value}`}>
                    {dic.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <FormItem label="联系方式" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 9 }}>
        {getFieldDecorator('phone', {
          initialValue: trainee.phone,
          rules: [{ required: true, message: '请输入联系方式' }],
        })(<Input placeholder="请选择联系电话" />)}
      </FormItem>
      <FormItem label="住  址" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        {getFieldDecorator('address', {
          initialValue: trainee.address,
          rules: [{ required: true, message: '请输入家庭地址' }],
        })(<TextArea autosize={{ minRows: 2, maxRows: 2 }} placeholder="请填写家庭地址" />)}
      </FormItem>
    </Form>
  );
};

BasicInfo.propTypes = {
  trainee: PropTypes.object,
  enumDics: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
};

export default Form.create()(CSSModules(BasicInfo, styles));
