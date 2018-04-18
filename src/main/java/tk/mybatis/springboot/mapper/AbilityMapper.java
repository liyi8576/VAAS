package tk.mybatis.springboot.mapper;

import java.util.List;

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.entity.AbilityEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface AbilityMapper extends MyMapper<AbilityEntity> {
	public List<AbilityBean> selectAbilityInfo();  
}
