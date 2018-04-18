package tk.mybatis.springboot.mapper;

import java.util.List;

import tk.mybatis.springboot.bean.OccupationAbilityBean;
import tk.mybatis.springboot.entity.OccupationAbilityEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface OccupationAbilityMapper extends MyMapper<OccupationAbilityEntity> {
	public List<OccupationAbilityBean> selectByKey(Integer id);  
	
	public List<OccupationAbilityBean> selectNecessaryByKey(Integer id);  
	
	public List<OccupationAbilityBean> selectSecondaryByKey(Integer id);  
}
