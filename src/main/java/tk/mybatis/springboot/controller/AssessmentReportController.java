package tk.mybatis.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;

import tk.mybatis.springboot.bean.AssessmentReportBean;
import tk.mybatis.springboot.bean.AssessmentReportFilterBean;
import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.service.AssessmentReportService;

@RestController
@RequestMapping("/api/reports")
public class AssessmentReportController {

    @Autowired
    private AssessmentReportService assessmentReportService;
    
    @RequestMapping(method = RequestMethod.POST)
    public ResultBean insertAssessmentReport(@RequestBody AssessmentReportBean assessmentReportBean) {
    	ResultBean result = new ResultBean();
    	
        if (assessmentReportService.insertAssessmentReport(assessmentReportBean) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{id}")
    public ResultBean selectAssessmentReportById(@PathVariable Integer id) {
    	ResultBean result = new ResultBean();
    	
    	AssessmentReportBean assessmentReportBean = assessmentReportService.selectAssessmentReportById(id);
        if (assessmentReportBean != null) {
        	result.setData(assessmentReportBean);
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping
    public ResultBean selectAssessmentReportList(AssessmentReportFilterBean assessmentReportFilterBean) {
    	ResultBean result = new ResultBean();
    	
    	String trainee_name = assessmentReportFilterBean.getTrainee_name();
    	String occupation_name = assessmentReportFilterBean.getOccupation_name();
    	String assessor_name = assessmentReportFilterBean.getAssessor_name();
        String startDate = assessmentReportFilterBean.getStartDate();
    	String endDate = assessmentReportFilterBean.getEndDate();
    	int page = assessmentReportFilterBean.getOffset();
		int rows = assessmentReportFilterBean.getPageSize();
		
		Map<String, String> map = new HashMap<String, String>();
		if (trainee_name != null && !"".equals(trainee_name)) {
			map.put("trainee_name", trainee_name);
		}
		if (occupation_name != null && !"".equals(occupation_name)) {
			map.put("occupation_name", occupation_name);
		}
		if (assessor_name != null && !"".equals(assessor_name)) {
			map.put("assessor_name", assessor_name);
		}
		if (startDate != null && !"".equals(startDate)) {
			map.put("startDate", startDate);
		}
		if (endDate != null && !"".equals(endDate)) {
			map.put("endDate", endDate);
		}
		if (page != 0) {
			map.put("page", String.valueOf(page));
		} else {
			map.put("page", String.valueOf(1));
		}
		if (rows != 0) {
			map.put("rows", String.valueOf(rows));
		} else {
			map.put("rows", String.valueOf(10));
		}
		
		List<AssessmentReportBean> listBean = assessmentReportService.selectAssessmentReportList(map);
		result.setData(new PageInfo<AssessmentReportBean>(listBean));
		result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
		return result;
    }
}
