DROP TABLE IF EXISTS `trainee`;
CREATE TABLE `trainee` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学生编码',
  `name` varchar(30) DEFAULT NULL COMMENT '姓名',
  `sex` varchar(1) DEFAULT NULL COMMENT '性别',
  `birthday` varchar(30) DEFAULT NULL COMMENT '出生日期',
  `id_card` varchar(30) DEFAULT NULL COMMENT '身份证号',
  `qq` varchar(30) DEFAULT NULL COMMENT 'QQ号码',
  `weixin` varchar(30) DEFAULT NULL COMMENT '微信号码',
  `e_mail` varchar(30) DEFAULT NULL COMMENT '电子邮件',
  `guardian` varchar(30) DEFAULT NULL COMMENT '监护人',
  `relationship` varchar(30) DEFAULT NULL COMMENT '与本人关系',
  `address` varchar(100) DEFAULT NULL COMMENT '住址',
  `phone` varchar(30) DEFAULT NULL COMMENT '联系方式',
  `disabled_type` varchar(30) DEFAULT NULL COMMENT '主要障碍类型',
  `disabled_level` varchar(30) DEFAULT NULL COMMENT '障碍等级',
  `disabled_reason` varchar(100) DEFAULT NULL COMMENT '障碍原因',
  `other_disabled` varchar(100) DEFAULT NULL COMMENT '其他障碍',
  `degree` varchar(30) DEFAULT NULL COMMENT '教育程度',
  `education_level` varchar(50) DEFAULT NULL COMMENT '教育水平',
  `have_trained` smallint(1) DEFAULT NULL COMMENT '是否接受过职业训练',
  `trained_intro` varchar(300) DEFAULT NULL COMMENT '职业训练说明',
  `is_worked` smallint(1) DEFAULT NULL COMMENT '是否有工作经验',
  `worked_intro` varchar(300) DEFAULT NULL COMMENT '工作经验说明',
  `expect_work` varchar(100) DEFAULT NULL COMMENT '希望从事的工作',
  `father` varchar(30) DEFAULT NULL COMMENT '父亲',
  `father_degree` varchar(30) DEFAULT NULL COMMENT '教育程度',
  `father_job` varchar(30) DEFAULT NULL COMMENT '职业',
  `mother` varchar(30) DEFAULT NULL COMMENT '母亲',
  `monther_degree` varchar(30) DEFAULT NULL COMMENT '教育程度',
  `mother_job` varchar(30) DEFAULT NULL COMMENT '职业',
  `parent_expect` varchar(100) DEFAULT NULL COMMENT '父母期望',
  `status` smallint(1) DEFAULT NULL COMMENT '状态',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `modify_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生（残障儿童）信息表';



DROP TABLE IF EXISTS `occupation`;
CREATE TABLE `occupation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '职业编码',
  `name` varchar(50) DEFAULT NULL COMMENT '职业名称',
  `description` varchar(300) DEFAULT NULL COMMENT '职业描述',
  `status` smallint(1) DEFAULT NULL COMMENT '状态',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `modify_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='职业信息表';



DROP TABLE IF EXISTS `ability`;
CREATE TABLE `ability` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '能力项编码',
  `name` varchar(30) DEFAULT NULL COMMENT '能力项名称',
  `domain` varchar(30) DEFAULT NULL COMMENT '能力项所属领域',
  `description` varchar(300) DEFAULT NULL COMMENT '能力项描述',
  `assess_method` varchar(100) DEFAULT NULL COMMENT '检核方式',
  `option_a` varchar(500) DEFAULT NULL COMMENT '检核标准-A',
  `option_b` varchar(500) DEFAULT NULL COMMENT '检核标准-B',
  `option_c` varchar(500) DEFAULT NULL COMMENT '检核标准-C',
  `option_d` varchar(500) DEFAULT NULL COMMENT '检核标准-D',
  `sort_index` smallint(6) DEFAULT NULL COMMENT '排序索引',
  `status` smallint(1) DEFAULT NULL COMMENT '状态',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `modify_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='能力项检核信息表';



DROP TABLE IF EXISTS `occupation_ability`;
CREATE TABLE `occupation_ability` (
  `occupation_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '职业编码',
  `ability_id` int(11) NOT NULL COMMENT '能力项编码',
  `necessary_level` smallint(1) DEFAULT NULL COMMENT '是否必要',
  `criterion_score` varchar(1) DEFAULT NULL COMMENT '检核标准',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `modify_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '修改日期',
  PRIMARY KEY (`occupation_id`,`ability_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='职业能力检核标准配置表';



DROP TABLE IF EXISTS `assessment_result`;
CREATE TABLE `assessment_result` (
  `assess_task_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '检核任务编码',
  `trainee_id` int(11) NOT NULL COMMENT '学生编码',
  `ability_id` int(11) NOT NULL COMMENT '检核能力编码',
  `assess_option` varchar(1) DEFAULT NULL COMMENT '检核能力打分',
  PRIMARY KEY (`assess_task_id`,`trainee_id`,`ability_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='职业能力检核结果表';



DROP TABLE IF EXISTS `assessment_report`;
CREATE TABLE `assessment_report` (
  `assess_report_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '检核评估报告编码',
  `trainee_id` int(11) NOT NULL COMMENT '学生编码',
  `occupation_id` int(11) NOT NULL COMMENT '职业编码',
  `potential` varchar(200) DEFAULT NULL COMMENT '职业潜能',
  `limit` varchar(200) DEFAULT NULL COMMENT '职业限制',
  `work_context` varchar(200) DEFAULT NULL COMMENT '工作背景',
  `personal_will` varchar(200) DEFAULT NULL COMMENT '个人意愿',
  `parent_will` varchar(200) DEFAULT NULL COMMENT '家长意愿',
  `other` varchar(200) DEFAULT NULL COMMENT '其他',
  `place_advice` varchar(200) DEFAULT NULL COMMENT '综合安置建议',
  `track_date` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '安置追踪日期',
  `tracker` varchar(30) DEFAULT NULL COMMENT '安置追踪者',
  `track_result` varchar(200) DEFAULT NULL COMMENT '安置追踪结果',
  `designer` varchar(30) DEFAULT NULL COMMENT '设计者',
  `designer_title` varchar(30) DEFAULT NULL COMMENT '设计者职称',
  `institution` varchar(50) DEFAULT NULL COMMENT '评测单位',
  `institution_phone` varchar(30) DEFAULT NULL COMMENT '电话',
  `executor` varchar(30) DEFAULT NULL COMMENT '执行者',
  `executor_title` varchar(30) DEFAULT NULL COMMENT '执行者职称',
  `institution_address` varchar(50) DEFAULT NULL COMMENT '单位地址',
  `generator` varchar(30) DEFAULT NULL COMMENT '检核报告处理人',
  `generate_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '检核报告生成时间',
  PRIMARY KEY (`assess_report_id`,`trainee_id`,`occupation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='职业能力检核评估报告';



DROP TABLE IF EXISTS `enum_dic`;
CREATE TABLE `enum_dic` (
  `code` int(11) NOT NULL AUTO_INCREMENT COMMENT '编码',
  `name` varchar(30) DEFAULT NULL COMMENT '名称',
  `value` varchar(30) DEFAULT NULL COMMENT '值',
  `group` varchar(30) DEFAULT NULL COMMENT '枚举分组',
  `sort_index` smallint(6) DEFAULT NULL COMMENT '排序索引',
  `description` varchar(300) DEFAULT NULL COMMENT '描述',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='枚举字典表';



DROP TABLE IF EXISTS `sysuser`;
CREATE TABLE `sysuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编码',
  `sex` varchar(1) DEFAULT NULL COMMENT '性别',
  `birthday` varchar(30) DEFAULT NULL COMMENT '出生日期',
  `name` varchar(30) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(50) DEFAULT NULL COMMENT '登录密码',
  `status` smallint(1) DEFAULT NULL COMMENT '状态',
  `creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `modify_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';



DROP TABLE IF EXISTS `trainee_sysuser_relationship`;
CREATE TABLE `trainee_sysuser_relationship` (
  `student` int(11) NOT NULL AUTO_INCREMENT COMMENT '学生编码',
  `assessor` int(11) NOT NULL COMMENT '检核人',
  `assess_date` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '检核时间',
  PRIMARY KEY (`student`,`assessor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生检核人关系表';