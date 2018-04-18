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

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.bean.AssessResultBean;
import tk.mybatis.springboot.bean.AssessStatusFilterBean;
import tk.mybatis.springboot.bean.AssessmentBean;
import tk.mybatis.springboot.bean.AssessmentResultBean;
import tk.mybatis.springboot.bean.ConstrastBean;
import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.bean.TraineeAssessBean;
import tk.mybatis.springboot.bean.TraineeFilterBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.TraineeEntity;
import tk.mybatis.springboot.service.TraineeService;

@RestController
@RequestMapping("/api/trainees")
public class TraineeController {

    @Autowired
    private TraineeService traineeService;
    
    @RequestMapping(method = RequestMethod.POST)
    public ResultBean insertTrainee(@RequestBody TraineeEntity traineeEntity) {
    	ResultBean result = new ResultBean();
    	
        if (traineeService.insertTrainee(traineeEntity) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.PUT,value = "/{traineeId}")
    public ResultBean updateTrainee(@RequestBody TraineeEntity traineeEntity) {
    	ResultBean result = new ResultBean();
    	
        if (traineeService.updateTrainee(traineeEntity) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{id}")
    public ResultBean selectTraineeById(@PathVariable Integer id) {
    	ResultBean result = new ResultBean();
    	
        TraineeEntity traineeEntity = traineeService.selectTraineeById(id);
        if (traineeEntity != null) {
        	result.setData(traineeEntity);
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.DELETE,value = "/{traineeId}")
    public ResultBean deleteTrainee(@PathVariable String traineeId) {
    	ResultBean result = new ResultBean();
    	
        if (traineeService.deleteTraineeById(traineeId) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping
    public ResultBean selectTraineeList(TraineeFilterBean traineeFilterBean) {
    	ResultBean result = new ResultBean();
    	
    	String name = traineeFilterBean.getTraineeName();
    	int page = traineeFilterBean.getOffset();
		int rows = traineeFilterBean.getPageSize();

		Map<String, String> map = new HashMap<String, String>();
		if (name != null && !"".equals(name)) {
			map.put("name", name);
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
		
		List<TraineeEntity> listBean = traineeService.selectTraineeList(map);
		result.setData(new PageInfo<TraineeEntity>(listBean));
		result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
		return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/assessResult")
    public ResultBean selectAssessResult(AssessStatusFilterBean assessStatusFilterBean) {
    	ResultBean result = new ResultBean();
    	
    	if (assessStatusFilterBean.getAssessStatus() == null) {
    		int page = assessStatusFilterBean.getOffset();
    		int rows = assessStatusFilterBean.getPageSize();

    		Map<String, String> map = new HashMap<String, String>();
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
    		
    		List<AssessResultBean> listBean = traineeService.selectAllAssessResult(map);
    		result.setData(new PageInfo<AssessResultBean>(listBean));
    		result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
    	} else {
    		int assessStatus = assessStatusFilterBean.getAssessStatus();
        	int page = assessStatusFilterBean.getOffset();
    		int rows = assessStatusFilterBean.getPageSize();

    		Map<String, String> map = new HashMap<String, String>();
    		if (assessStatus != 0) {
    			map.put("assessStatus", String.valueOf(assessStatus));
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
    		
    		List<AssessResultBean> listBean = traineeService.selectAssessResult(map);
    		result.setData(new PageInfo<AssessResultBean>(listBean));
    		result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
    	}
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{traineeId}/assess")
    public ResultBean selectAssessRecord(@PathVariable String traineeId) {
    	ResultBean result = new ResultBean();
    	
    	AssessmentBean assessmentBean = traineeService.selectAssessRecord(Integer.parseInt(traineeId));
        if (assessmentBean != null) {
        	result.setData(assessmentBean);
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{traineeId}/assessResult")
    public ResultBean selectAssess(@PathVariable String traineeId) {
    	ResultBean result = new ResultBean();
    	
    	List<AssessmentResultBean> assessResult = traineeService.selectAssess(Integer.parseInt(traineeId));
        if (assessResult != null) {
        	result.setData(assessResult);
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/all")
    public ResultBean selectTraineeAll() {
    	ResultBean result = new ResultBean();
    	
    	List<TraineeEntity> listBean = traineeService.selectTraineeAll();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.POST,value = "/action/record")
    public ResultBean insertAssessment(@RequestBody AssessmentBean assessmentBean) {
    	ResultBean result = new ResultBean();
    	
        if (traineeService.insertAssessment(assessmentBean) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/action/checkRecod/{id}")
    public ResultBean selectAssessmentRecord(@PathVariable Integer id) {
    	ResultBean result = new ResultBean();
    	
    	List<AbilityBean> listBean = traineeService.selectAssessmentRecord(id);
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/result/{id}")
    public ResultBean selectAssessmentResult(@PathVariable Integer id) {
    	ResultBean result = new ResultBean();
    	
    	List<AbilityBean> listBean = traineeService.selectAssessmentRecord(id);
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{occupationsId}/occupations/{trainneeId}/constrast")
    public ResultBean constrastInfo(@PathVariable Integer trainneeId, @PathVariable Integer occupationsId) {
    	ResultBean result = new ResultBean();
    	
    	Map<String, Integer> map = new HashMap<String, Integer>();
    	map.put("trainneeId", trainneeId);
    	map.put("occupationsId", occupationsId);
    	
    	List<ConstrastBean> listBean = traineeService.constrastInfo(map);
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.PUT,value = "/{traineeId}/access")
    public ResultBean saveTraineeAssess(@PathVariable Integer traineeId, @RequestBody TraineeAssessBean traineeAssessBean) {
    	ResultBean result = new ResultBean();
    	
        if (traineeService.saveTraineeAssess(traineeId,traineeAssessBean.getAbilityId(),traineeAssessBean.getOption()) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
}
