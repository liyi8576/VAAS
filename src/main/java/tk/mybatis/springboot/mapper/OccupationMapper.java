package tk.mybatis.springboot.mapper;

import java.util.List;
import java.util.Map;

import tk.mybatis.springboot.bean.OccupationBean;
import tk.mybatis.springboot.bean.OccupationListBean;
import tk.mybatis.springboot.entity.OccupationEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface OccupationMapper extends MyMapper<OccupationEntity> {
	public OccupationBean selectByKey(Integer id);  
	
	public List<OccupationListBean> selectOccupationList(Map<String,String> map);  
}
