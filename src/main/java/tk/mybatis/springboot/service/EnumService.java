package tk.mybatis.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.mybatis.springboot.entity.EnumEntity;
import tk.mybatis.springboot.mapper.EnumMapper;

@Service
public class EnumService {

    @Autowired
    private EnumMapper enumMapper;
    
    public List<EnumEntity> selectEnum() {
    	return enumMapper.selectEnum();
    }
}
