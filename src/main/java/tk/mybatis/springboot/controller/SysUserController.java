package tk.mybatis.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tk.mybatis.springboot.bean.ResultBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.SysUserEntity;
import tk.mybatis.springboot.service.SysUserService;

@RestController
@RequestMapping("/api/sysusers")
public class SysUserController {

    @Autowired
    private SysUserService sysUserService;
    
    @RequestMapping(method = RequestMethod.GET,value = "/all")
    public ResultBean selectSysUserAll() {
    	ResultBean result = new ResultBean();
    	
    	List<SysUserEntity> listBean = sysUserService.selectSysUserAll();
    	result.setData(listBean);
    	result.setSuccess(ConstantFactory.T);
        result.setMessage(ConstantFactory.MESSAGE_SUCCESS);
        
        return result;
    }
}
