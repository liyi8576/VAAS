import React, {Component} from 'react'
import PropTypes from 'prop-types'
import OccupationFilter from './OccupationFilter'
import OccupationList from './OccupationList'
import OccupationInfo from './OccupationInfo'
import CreateOccupationSteps from './steps'
import {Modal} from 'antd';

class Occupation extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      modalMode: 'CLOSE',
    };
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showModifyModal = this.showModifyModal.bind(this);
    this.showDetailModal = this.showDetailModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * 展示新增职业弹出框
   */
  showCreateModal() {
    this.setState({
      modalMode: 'CREATE',
    });
  }

  /**
   * 展示修改职业弹出框
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
   * 展示职业详情弹出框
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
        name: '程序员',
        desc: '简称码农，是从事程序开发、维护的专业人员。一般将程序员分为程序设计人员和程序编码人员',
      },
      {
        id: '1002',
        name: '快递员',
        desc:
          '是使用快递专用工具、设备和应用软件系统，从事国内、国际及港澳台地区的快件揽收、分拣、封发、转运、投送、信息录入、查询、市场开发、疑难快件处理等工作的人员',
      },
    ];
    return (
      <div className="content-inner">
        <OccupationFilter showCreateModal={this.showCreateModal}/>
        <OccupationList
          dataSource={dataSource}
          showDetailModal={this.showDetailModal}
          showModifyModal={this.showModifyModal}
        />
        {(this.state.modalMode === 'CREATE' || this.state.modalMode === 'MODIFY') &&
        <Modal
          width={800}
          visible
          maskClosable={false}
          onCancel={this.closeModal}
          footer={null}
          title={(this.state.modalMode === 'CREATE' ? "创建" : "修改") + "职业"}
        >
          <CreateOccupationSteps isCreate={this.state.modalMode === 'CREATE'} closeCreateModal={this.closeModal}/>
        </Modal>}
        {this.state.modalMode === 'DETAIL' &&
        <Modal
          width={630}
          visible
          maskClosable
          footer={null}
          onCancel={this.closeModal}
          title="职业详细信息"
        >
          <OccupationInfo/>
        </Modal>}
      </div>
    );
  }
}

export default Occupation;
