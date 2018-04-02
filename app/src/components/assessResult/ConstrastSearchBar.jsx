import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Row, Select, Button, Alert, message } from 'antd';
import TraineeSelector from 'containers/trainee/TraineeSelector';

const Option = Select.Option;
const ConstrastSearchBar = ({
                              occupationDesc = '',
                              traineeList = [],
                              occupationList = [],
                              onQuery = _.noop,
                              onChange = _.noop,
                              form: { getFieldDecorator, validateFields, getFieldsValue },
                            }) => {
  const query = () => {
    const formVals = getFieldsValue();
    if (!formVals.traineeId) {
      message.error('请选择要检核对照的学员！');
      return;
    }
    if (!formVals.occupationId) {
      message.error('请选择要检核对照的职业！');
      return;
    }
    onQuery(formVals.traineeId, formVals.occupationId);
  };
  const changeOccupation = val => {
    onChange('OCCUPATION', val);
  };
  const changeTrainee = val => {
    onChange('TRAINEE', val);
  };
  return (
    <Row style={{ marginBottom: '10px' }}>
      <Form layout={'inline'}>
        <Form.Item label="职业">
          {getFieldDecorator('occupationId', {})(
            <Select
              placeholder={'请选择职业'}
              notFoundContent=""
              style={{ width: '200px' }}
              defaultActiveFirstOption={false}
              onChange={changeOccupation}
              filterOption={false}
            >
              {occupationList.map(item => (
                <Option value={item.id} key={`opt-${item.id}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="学生">
          {getFieldDecorator('traineeId', {})(<TraineeSelector onChange={changeTrainee} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={query}>
            查询
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
ConstrastSearchBar.PropTypes = {
  occupationList: PropTypes.array,
  traineeList: PropTypes.array,
  onQuery: PropTypes.func,
  onChangeOccupation: PropTypes.func,
};
export default Form.create()(ConstrastSearchBar);