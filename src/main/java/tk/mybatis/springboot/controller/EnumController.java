package tk.mybatis.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.EnumEntity;
import tk.mybatis.springboot.service.EnumService;

@RestController
@RequestMapping("/api/dics")
public class EnumController {

    @Autowired
    private EnumService enumService;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResultBean selectEnum() {
    	ResultBean result = new ResultBean();
    	
    	List<EnumEntity> listBean = enumService.selectEnum();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
}
