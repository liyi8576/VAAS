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

import tk.mybatis.springboot.bean.BaseEntity;
import tk.mybatis.springboot.bean.OccupationBean;
import tk.mybatis.springboot.bean.OccupationFilterBean;
import tk.mybatis.springboot.bean.OccupationListBean;
import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.bean.SortTraineeBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.OccupationEntity;
import tk.mybatis.springboot.service.OccupationService;
import tk.mybatis.springboot.service.TraineeService;

@RestController
@RequestMapping("/api/occupations")
public class OccupationController {

    @Autowired
    private OccupationService occupationService;
    
    @Autowired
    private TraineeService traineeService;
    
    @RequestMapping(method = RequestMethod.POST)
    public ResultBean insertOccupation(@RequestBody OccupationBean occupationBean) {
    	ResultBean result = new ResultBean();
    	
        if (occupationService.insertOccupation(occupationBean) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.PUT,value = "/{id}")
    public ResultBean updateOccupation(@RequestBody OccupationBean occupationBean) {
    	ResultBean result = new ResultBean();
    	
        if (occupationService.updateOccupation(occupationBean) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{id}")
    public ResultBean selectOccupationById(@PathVariable Integer id) {
    	ResultBean result = new ResultBean();
    	
    	OccupationBean occupationBean = occupationService.selectOccupationById(id);
        if (occupationBean != null) {
        	result.setData(occupationBean);
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.DELETE,value = "/{ids}")
    public ResultBean deleteOccupation(@PathVariable String ids) {
    	ResultBean result = new ResultBean();
    	
        if (occupationService.deleteOccupationById(ids) != 0) {
        	result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        } else {
        	result.setSuccess(ConstantFactory.F);
            result.setMessage(ConstantFactory.MESSAGE_ERROR);
        }
        
        return result;
    }
    
    @RequestMapping
    public ResultBean selectOccupationList(OccupationFilterBean occupationFilterBean) {
    	ResultBean result = new ResultBean();
    	
    	if (occupationFilterBean.getOffset() == 0 && occupationFilterBean.getPageSize() == 0) {
    		List<OccupationListBean> listBean = occupationService.selectAllOccupationList();
    		result.setData(new PageInfo<OccupationListBean>(listBean));
    		result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
    	} else {
    		String name = occupationFilterBean.getOccupationName();
        	int page = occupationFilterBean.getOffset();
    		int rows = occupationFilterBean.getPageSize();

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
    		
    		List<OccupationListBean> listBean = occupationService.selectOccupationList(map);
    		result.setData(new PageInfo<OccupationListBean>(listBean));
    		result.setSuccess(ConstantFactory.T);
            result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
    	}
        
		return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/all")
    public ResultBean selectOccupationAll() {
    	ResultBean result = new ResultBean();
    	
    	List<OccupationEntity> listBean = occupationService.selectOccupationAll();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{occupationId}/recommand")
    public ResultBean sortTrainee(@PathVariable Integer occupationId, BaseEntity baseEntity) {
    	ResultBean result = new ResultBean();
    	
    	int page = baseEntity.getOffset();
		int rows = baseEntity.getPageSize();

		Map<String, String> map = new HashMap<String, String>();
		if (occupationId != 0) {
			map.put("occupationId", String.valueOf(occupationId));
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
    	
    	List<SortTraineeBean> listBean = traineeService.sortTrainee(map);
    	result.setData(new PageInfo<SortTraineeBean>(listBean));
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
}
