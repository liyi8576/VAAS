package tk.mybatis.springboot.mapper;

import java.util.List;
import java.util.Map;

import tk.mybatis.springboot.bean.AssessmentReportBean;
import tk.mybatis.springboot.entity.AssessmentReportEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface AssessmentReportMapper extends MyMapper<AssessmentReportEntity> {
	public AssessmentReportBean selectAssessmentReportById(Integer id);  
	
	public List<AssessmentReportBean> selectAssessmentReportList(Map<String,String> map);  
}
