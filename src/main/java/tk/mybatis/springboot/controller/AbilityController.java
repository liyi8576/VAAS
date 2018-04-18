package tk.mybatis.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.bean.DomainBean;
import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.AbilityEntity;
import tk.mybatis.springboot.service.AbilityService;

@RestController
@RequestMapping("/api/abilities")
public class AbilityController {

    @Autowired
    private AbilityService abilityService;
    
    @RequestMapping(method = RequestMethod.GET,value = "/options")
    public ResultBean selectAbilityInfo() {
    	ResultBean result = new ResultBean();
    	
    	List<AbilityBean> listBean = abilityService.selectAbilityInfo();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/details")
    public ResultBean selectAbilityDetails() {
    	ResultBean result = new ResultBean();
    	
    	List<DomainBean> listBean = abilityService.selectAbilityDetails();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public ResultBean selectAbility() {
    	ResultBean result = new ResultBean();
    	
    	List<AbilityEntity> listBean = abilityService.selectAbility();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET,value = "/{id}")
    public ResultBean getAbilityById(@PathVariable String id) {
    	ResultBean result = new ResultBean();
    	
    	AbilityBean abilityBean = abilityService.getAbilityById(id);
    	result.setData(abilityBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
}
