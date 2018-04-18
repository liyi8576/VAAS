package tk.mybatis.springboot.mapper;

import java.util.List;

import tk.mybatis.springboot.entity.EnumEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface EnumMapper extends MyMapper<EnumEntity> {

	public List<EnumEntity> selectEnum();  
}
