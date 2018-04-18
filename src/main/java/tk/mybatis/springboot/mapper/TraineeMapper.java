package tk.mybatis.springboot.mapper;

import java.util.List;
import java.util.Map;

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.bean.AssessResultBean;
import tk.mybatis.springboot.bean.AssessmentRecordBean;
import tk.mybatis.springboot.bean.AssessmentResultBean;
import tk.mybatis.springboot.bean.ConstrastBean;
import tk.mybatis.springboot.bean.SortTraineeBean;
import tk.mybatis.springboot.entity.TraineeEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface TraineeMapper extends MyMapper<TraineeEntity> {
	
	public List<TraineeEntity> selectTraineeList(Map<String,String> map);  
	
	public List<AssessResultBean> selectAllAssessResult(Map<String,String> map);  
	
	public List<AssessResultBean> selectAssessResult(Map<String,String> map);  
	
	public List<AssessmentRecordBean> selectAssessRecord(Integer traineeId);  
	
	public List<AssessmentResultBean> selectAssess(Integer traineeId);  
	
	public List<AbilityBean> selectAssessmentRecord(Integer id);  
	
	public List<ConstrastBean> constrastInfo(Map<String,Integer> map);  
	
	public List<SortTraineeBean> sortTrainee(Integer occupationId);  
}
