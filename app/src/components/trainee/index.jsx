import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TraineeList from './TraineeList';
import TraineeFilter from './TraineeFilter';
import TraineeInfo from './TraineeInfo';
import {Modal} from 'antd';
import TraineeCreateSteps from './steps';

class Trainee extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      modalMode: 'CLOSE'
    };
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showModifyModal = this.showModifyModal.bind(this);
    this.showDetailModal = this.showDetailModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * 展示新增学生弹出框
   */
  showCreateModal() {
    this.setState({
      modalMode: 'CREATE',
    });
  }

  /**
   * 展示修改学生弹出框
   */
  showModifyModal() {
    this.setState({
      modalMode: 'MODIFY',
    });
  }

  /**
   * 关闭弹出框
   */
  closeModal() {
    this.setState({
      modalMode: 'CLOSE',
    });
  }

  /**
   * 展示学生详情弹出框
   */
  showDetailModal(record) {
    this.setState({
      modalMode: 'DETAIL',
    });
  }

  render() {
    const dataSource = [
      {
        id: '1001',
        name: '张三',
        sex: 'M',
        age: '10',
        guardian: '张大',
        phone: '13990909090',
        address: '中国',
      },
      {
        id: '1002',
        name: '李四',
        sex: 'F',
        age: '12',
        guardian: '李大',
        phone: '13980808080',
        address: '中国',
      },
    ];
    return (
      <div className="content-inner">
        <TraineeFilter showCreateModal={this.showCreateModal}/>
        <TraineeList
          dataSource={dataSource}
          showModifyModal={this.showModifyModal}
          showDetailModal={this.showDetailModal}
        />
        {(this.state.modalMode === 'CREATE' || this.state.modalMode === 'MODIFY') &&
        <Modal
          width={800}
          visible
          onCancel={this.closeModal}
          maskClosable={false}
          footer={null}
          title={this.props.isCreate ? "新增学生信息" : "修改学生信息"}
        >
          <TraineeCreateSteps isCreate={this.state.modalMode === 'CREATE'}/>
        </Modal>}
        {this.state.modalMode === 'DETAIL' &&
        <Modal
          width={630}
          visible
          maskClosable
          footer={null}
          onCancel={this.closeModal}
          title="学生详细信息"
        >
          <TraineeInfo/>
        </Modal>}
      </div>
    );
  }
}

export default Trainee;
