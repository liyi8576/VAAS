package tk.mybatis.springboot.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.bean.AssessResultBean;
import tk.mybatis.springboot.bean.AssessmentBean;
import tk.mybatis.springboot.bean.AssessmentRecordBean;
import tk.mybatis.springboot.bean.AssessmentResultBean;
import tk.mybatis.springboot.bean.ConstrastBean;
import tk.mybatis.springboot.bean.SortTraineeBean;
import tk.mybatis.springboot.entity.AbilityEntity;
import tk.mybatis.springboot.entity.AssessmentResultEntity;
import tk.mybatis.springboot.entity.OccupationAbilityEntity;
import tk.mybatis.springboot.entity.TraineeEntity;
import tk.mybatis.springboot.entity.TraineeSysuserRelationshipEntity;
import tk.mybatis.springboot.mapper.AbilityMapper;
import tk.mybatis.springboot.mapper.AssessmentResultMapper;
import tk.mybatis.springboot.mapper.TraineeMapper;
import tk.mybatis.springboot.mapper.TraineeSysuserRelationshipMapper;
import tk.mybatis.springboot.util.RandomId;

@Service
public class TraineeService {

    @Autowired
    private TraineeMapper traineeMapper;
    
    @Autowired
    private AbilityMapper abilityMapper;
    
    @Autowired
    private AssessmentResultMapper assessmentResultMapper;
    
    @Autowired
    private TraineeSysuserRelationshipMapper traineeSysuserRelationshipMapper;
    
    public int insertTrainee(TraineeEntity traineeEntity) {
    	int id = RandomId.getFixLenthString(10);
    	traineeEntity.setId(id);
    	return traineeMapper.insert(traineeEntity);
    }
    
    public int updateTrainee(TraineeEntity traineeEntity) {
    	return traineeMapper.updateByPrimaryKey(traineeEntity);
    }
    
    public TraineeEntity selectTraineeById(Integer id) {
        return traineeMapper.selectByPrimaryKey(id);
    }
    
    public int deleteTraineeById(String ids) {
    	int i = 1;
    	String[] idArray = ids.split(",");
    	for (String id : idArray) {
    		AssessmentResultEntity assessmentResultEntity = new AssessmentResultEntity();
    		assessmentResultEntity.setTrainee_id(Integer.parseInt(id));
    		assessmentResultMapper.delete(assessmentResultEntity);
    		if (traineeMapper.deleteByPrimaryKey(Integer.parseInt(id)) == 0) {
    			i = 0;
    		}
    	}
    	return i;
    }
    
    public List<TraineeEntity> selectTraineeList(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
		return traineeMapper.selectTraineeList(map);
    }
    
    public List<AssessResultBean> selectAllAssessResult(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
    	return traineeMapper.selectAllAssessResult(map);
    }
    
    public List<AssessResultBean> selectAssessResult(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
    	return traineeMapper.selectAssessResult(map);
    }
    
    public AssessmentBean selectAssessRecord(Integer traineeId) {
    	TraineeEntity traineeEntity = traineeMapper.selectByPrimaryKey(traineeId);
    	List<AssessmentRecordBean> assessResult = traineeMapper.selectAssessRecord(traineeId);
    	List<AbilityEntity> abilityResult = abilityMapper.selectAll();
    	int count = compareAbility(abilityResult, assessResult);
    	AssessmentBean assessmentBean = new AssessmentBean();
    	assessmentBean.setTraineeId(traineeEntity.getId());
    	assessmentBean.setTraineeName(traineeEntity.getName());
    	assessmentBean.setAssessCount(count);
    	assessmentBean.setAssessResult(assessResult);
        return assessmentBean;
    }
    
    public List<AssessmentResultBean> selectAssess(Integer traineeId) {
    	List<AssessmentResultBean> assessResult = traineeMapper.selectAssess(traineeId);
        return assessResult;
    }
    
    public List<TraineeEntity> selectTraineeAll() {
    	return traineeMapper.selectAll();
    }
    
    public int insertAssessment(AssessmentBean assessmentBean) {
    	int i = 0;
    	
    	TraineeSysuserRelationshipEntity traineeSysuserRelationshipEntity = new TraineeSysuserRelationshipEntity();
    	traineeSysuserRelationshipEntity.setStudent(assessmentBean.getTraineeId());
    	traineeSysuserRelationshipEntity.setAssessor(assessmentBean.getAssessor());
    	traineeSysuserRelationshipEntity.setAssess_date(assessmentBean.getAssessDate());
    	traineeSysuserRelationshipEntity.setFlag(1);
    	traineeSysuserRelationshipMapper.delete(traineeSysuserRelationshipEntity);
    	i = traineeSysuserRelationshipMapper.insert(traineeSysuserRelationshipEntity);
    	assessmentResultMapper.deleteByTraineeId(assessmentBean.getTraineeId());
    	if (assessmentBean.getAssessResult() != null) {
    		for (AssessmentRecordBean assessmentRecordBean : assessmentBean.getAssessResult()) {
    			AssessmentResultEntity assessmentResultEntity = new AssessmentResultEntity();
        		assessmentResultEntity.setTrainee_id(assessmentBean.getTraineeId());
        		assessmentResultEntity.setAbility_id(assessmentRecordBean.getAbilityId());
        		assessmentResultEntity.setAssess_option(assessmentRecordBean.getAssessOption());
        		assessmentResultMapper.insert(assessmentResultEntity);
    		}
    	}
    	
    	return i;
    }
    
    public List<AbilityBean> selectAssessmentRecord(Integer id) {
    	return traineeMapper.selectAssessmentRecord(id);
    }
    
    public List<ConstrastBean> constrastInfo(Map<String,Integer> map) {
    	return traineeMapper.constrastInfo(map);
    }
    
    public List<SortTraineeBean> sortTrainee(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
    	return traineeMapper.sortTrainee(Integer.parseInt(map.get("occupationId")));
    }
    
    public int saveTraineeAssess(Integer traineeId, String abilityId, String option) {
    	int i = 0;
    	AssessmentResultEntity assessmentResultEntity = new AssessmentResultEntity();
    	assessmentResultEntity.setTrainee_id(traineeId);
    	assessmentResultEntity.setAbility_id(abilityId);
    	assessmentResultMapper.delete(assessmentResultEntity);
    	assessmentResultEntity.setAssess_option(option);
    	assessmentResultEntity.setAssess_task_id(RandomId.getFixLenthString(10));
    	i = assessmentResultMapper.insert(assessmentResultEntity);    	
    	return i;
    }
    
    public int compareAbility(List<AbilityEntity> abilityResult, List<AssessmentRecordBean> assessResult) {
    	int count = 0;
    	for (int i = 0; i < assessResult.size(); i++) {
    		if (!(abilityResult.get(i).getId()).equals(assessResult.get(i).getAbilityId())) {
    			count = i;
    			break;
    		} else if ((abilityResult.get(i).getId()).equals(assessResult.get(i).getAbilityId()) && i == assessResult.size()-1) {
    			count = i+1;
    			break;
    		}
    	}
    	return count;
    }
}
