import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Select, Button, Alert } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const ConstrastSearchBar = ({
  traineeId,
  occupationId,
  occupationDesc = '',
  traineeList = [],
  occupationList = [],
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  return (
    <Row style={{ marginBottom: '10px' }}>
      <Form layout={'inline'}>
        <FormItem label="职业">
          {getFieldDecorator('occupationId', {
            initialValue: occupationId,
          })(
            <Select
              placeholder={'请选择职业'}
              notFoundContent=""
              style={{ width: '200px' }}
              defaultActiveFirstOption={false}
              showSearch
              filterOption={false}
              onChange={() => {}}
            >
              {occupationList.map(item =>
                <Option value={item.id} key={`opt-${item.id}`}>
                  item.name
                </Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem label="学生">
          {getFieldDecorator('traineeId', {
            initialValue: traineeId,
          })(
            <Select
              placeholder={'请选择学生'}
              notFoundContent=""
              style={{ width: '200px' }}
              defaultActiveFirstOption={false}
              showSearch
              filterOption={false}
              onChange={() => {}}
            >
              {traineeList.map(item =>
                <Option value={item.id} key={`opt-${item.id}`}>
                  item.name
                </Option>,
              )}
            </Select>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
        </FormItem>
      </Form>
      {occupationDesc &&
        occupationDesc !== '' &&
        <Row style={{ marginTop: '10px' }}>
          <Alert message="职业简介" type="warning" closable />
        </Row>}
    </Row>
  );
};
ConstrastSearchBar.PropTypes = {
  traineeId: PropTypes.string,
  occupationId: PropTypes.string,
  occupationDesc: PropTypes.string,
  occupationList: PropTypes.array,
  traineeList: PropTypes.array,
};
export default Form.create()(ConstrastSearchBar);
