package tk.mybatis.springboot.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import tk.mybatis.springboot.bean.AssessmentReportBean;
import tk.mybatis.springboot.entity.AssessmentReportEntity;
import tk.mybatis.springboot.entity.TraineeSysuserRelationshipEntity;
import tk.mybatis.springboot.mapper.AssessmentReportMapper;
import tk.mybatis.springboot.mapper.TraineeSysuserRelationshipMapper;

@Service
public class AssessmentReportService {

    @Autowired
    private AssessmentReportMapper assessmentReportMapper;
    
    @Autowired
    private TraineeSysuserRelationshipMapper traineeSysuserRelationshipMapper;
    
    public int insertAssessmentReport(AssessmentReportBean assessmentReportBean) {
    	int i = 0;

    	TraineeSysuserRelationshipEntity traineeSysuserRelationshipEntity = new TraineeSysuserRelationshipEntity();
    	traineeSysuserRelationshipEntity.setStudent(assessmentReportBean.getTrainee_id());
    	traineeSysuserRelationshipEntity.setAssessor(assessmentReportBean.getAssessor());
    	traineeSysuserRelationshipEntity.setAssess_date(assessmentReportBean.getAssess_date());
    	traineeSysuserRelationshipEntity.setFlag(2);
    	traineeSysuserRelationshipMapper.delete(traineeSysuserRelationshipEntity);
    	traineeSysuserRelationshipMapper.insert(traineeSysuserRelationshipEntity);
    	AssessmentReportEntity assessmentReportEntity = new AssessmentReportEntity();
    	assessmentReportEntity.setTrainee_id(assessmentReportBean.getTrainee_id());
    	assessmentReportEntity.setOccupation_id(assessmentReportBean.getOccupation_id());
    	assessmentReportEntity.setPotential(assessmentReportBean.getPotential());
    	assessmentReportEntity.setLimits(assessmentReportBean.getLimit());
    	assessmentReportEntity.setWork_context(assessmentReportBean.getWork_context());
    	assessmentReportEntity.setPersonal_will(assessmentReportBean.getPersonal_will());
    	assessmentReportEntity.setParent_will(assessmentReportBean.getParent_will());
    	assessmentReportEntity.setOther(assessmentReportBean.getOther());
    	assessmentReportEntity.setPlace_advice(assessmentReportBean.getPlace_advice());
    	assessmentReportEntity.setTrack_date(assessmentReportBean.getTrack_date());
    	assessmentReportEntity.setTracker(assessmentReportBean.getTracker());
    	assessmentReportEntity.setTrack_result(assessmentReportBean.getTrack_result());
    	assessmentReportEntity.setDesigner(assessmentReportBean.getDesigner());
    	assessmentReportEntity.setDesigner_title(assessmentReportBean.getDesigner_title());
    	assessmentReportEntity.setInstitution(assessmentReportBean.getInstitution());
    	assessmentReportEntity.setInstitution_phone(assessmentReportBean.getInstitution_phone());
    	assessmentReportEntity.setExecutor(assessmentReportBean.getExecutor());
    	assessmentReportEntity.setExecutor_title(assessmentReportBean.getExecutor_title());
    	assessmentReportEntity.setInstitution_address(assessmentReportBean.getInstitution_address());
    	assessmentReportEntity.setGenerator(assessmentReportBean.getGenerator());
    	i = assessmentReportMapper.insert(assessmentReportEntity);
    	
    	return i;
    }
    
    public AssessmentReportBean selectAssessmentReportById(Integer id) {
        return assessmentReportMapper.selectAssessmentReportById(id);
    }
    
    public List<AssessmentReportBean> selectAssessmentReportList(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
		return assessmentReportMapper.selectAssessmentReportList(map);
    }
}
