package tk.mybatis.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.mybatis.springboot.entity.SysUserEntity;
import tk.mybatis.springboot.mapper.SysUserMapper;

@Service
public class SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;
    
    public List<SysUserEntity> selectSysUserAll() {
    	return sysUserMapper.selectAll();
    }
}
