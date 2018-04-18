package tk.mybatis.springboot.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import tk.mybatis.springboot.bean.OccupationAbilityBean;
import tk.mybatis.springboot.bean.OccupationBean;
import tk.mybatis.springboot.bean.OccupationListBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.OccupationAbilityEntity;
import tk.mybatis.springboot.entity.OccupationEntity;
import tk.mybatis.springboot.mapper.OccupationAbilityMapper;
import tk.mybatis.springboot.mapper.OccupationMapper;
import tk.mybatis.springboot.util.RandomId;

@Service
public class OccupationService {

    @Autowired
    private OccupationMapper occupationMapper;
    
    @Autowired
    private OccupationAbilityMapper occupationAbilityMapper;
    
    public int insertOccupation(OccupationBean occupationBean) {
    	int i = 0;
    	
    	int id = RandomId.getFixLenthString(10);
    	
    	OccupationEntity occupationEntity = new OccupationEntity();
    	occupationEntity.setId(id);
    	occupationEntity.setName(occupationBean.getName());
    	occupationEntity.setDescription(occupationBean.getDesc());
    	occupationEntity.setCreator(occupationBean.getCreator());
    	occupationEntity.setModifier(occupationBean.getModifier());
    	i = occupationMapper.insert(occupationEntity);
    	
    	if (occupationBean.getNecessaryAbility() != null) {
    		for (OccupationAbilityBean OccupationAbilityBean : occupationBean.getNecessaryAbility()) {
    			OccupationAbilityEntity occupationAbilityEntity = new OccupationAbilityEntity();
    			occupationAbilityEntity.setOccupation_id(id);
    			occupationAbilityEntity.setAbility_id(OccupationAbilityBean.getAbilityId());
    			occupationAbilityEntity.setNecessary_level(ConstantFactory.NECESSARY);
    			occupationAbilityEntity.setCriterion_score(OccupationAbilityBean.getCriterionScore());
    			occupationAbilityEntity.setCreator(occupationBean.getCreator());
    			occupationAbilityEntity.setModifier(occupationBean.getModifier());
    			occupationAbilityMapper.insert(occupationAbilityEntity);
        	}
    	}
    	
    	if (occupationBean.getSecondaryAbility() != null) {
    		for (OccupationAbilityBean OccupationAbilityBean : occupationBean.getSecondaryAbility()) {
    			OccupationAbilityEntity occupationAbilityEntity = new OccupationAbilityEntity();
    			occupationAbilityEntity.setOccupation_id(id);
    			occupationAbilityEntity.setAbility_id(OccupationAbilityBean.getAbilityId());
    			occupationAbilityEntity.setNecessary_level(ConstantFactory.SECONDARY);
    			occupationAbilityEntity.setCriterion_score(OccupationAbilityBean.getCriterionScore());
    			occupationAbilityEntity.setCreator(occupationBean.getCreator());
    			occupationAbilityEntity.setModifier(occupationBean.getModifier());
    			occupationAbilityMapper.insert(occupationAbilityEntity);
        	}
    	}
    	
    	return i;
    }
    
    public int updateOccupation(OccupationBean occupationBean) {
    	int i = 0;
    	
    	OccupationEntity occupationEntity = new OccupationEntity();
    	occupationEntity.setId(Integer.parseInt(occupationBean.getId()));
    	occupationEntity.setName(occupationBean.getName());
    	occupationEntity.setDescription(occupationBean.getDesc());
    	occupationEntity.setCreator(occupationBean.getCreator());
    	occupationEntity.setModifier(occupationBean.getModifier());
    	i = occupationMapper.updateByPrimaryKey(occupationEntity);
    	
    	OccupationAbilityEntity occupationAbility = new OccupationAbilityEntity();
		occupationAbility.setOccupation_id(Integer.parseInt(occupationBean.getId()));
		occupationAbilityMapper.delete(occupationAbility);
    	
    	if (occupationBean.getNecessaryAbility() != null) {
    		for (OccupationAbilityBean OccupationAbilityBean : occupationBean.getNecessaryAbility()) {
    			OccupationAbilityEntity occupationAbilityEntity = new OccupationAbilityEntity();
    			occupationAbilityEntity.setOccupation_id(Integer.parseInt(occupationBean.getId()));
    			occupationAbilityEntity.setAbility_id(OccupationAbilityBean.getAbilityId());
    			occupationAbilityEntity.setNecessary_level(ConstantFactory.NECESSARY);
    			occupationAbilityEntity.setCriterion_score(OccupationAbilityBean.getCriterionScore());
    			occupationAbilityEntity.setCreator(occupationBean.getCreator());
    			occupationAbilityEntity.setModifier(occupationBean.getModifier());
    			occupationAbilityMapper.insert(occupationAbilityEntity);
        	}
    	}
    	
    	if (occupationBean.getSecondaryAbility() != null) {
    		for (OccupationAbilityBean OccupationAbilityBean : occupationBean.getSecondaryAbility()) {
    			OccupationAbilityEntity occupationAbilityEntity = new OccupationAbilityEntity();
    			occupationAbilityEntity.setOccupation_id(Integer.parseInt(occupationBean.getId()));
    			occupationAbilityEntity.setAbility_id(OccupationAbilityBean.getAbilityId());
    			occupationAbilityEntity.setNecessary_level(ConstantFactory.SECONDARY);
    			occupationAbilityEntity.setCriterion_score(OccupationAbilityBean.getCriterionScore());
    			occupationAbilityEntity.setCreator(occupationBean.getCreator());
    			occupationAbilityEntity.setModifier(occupationBean.getModifier());
    			occupationAbilityMapper.insert(occupationAbilityEntity);
        	}
    	}
    	
    	return i;
    }
    
    public OccupationBean selectOccupationById(Integer id) {
    	List<OccupationAbilityBean> necessaryList = occupationAbilityMapper.selectNecessaryByKey(id);
    	List<OccupationAbilityBean> secondaryList = occupationAbilityMapper.selectSecondaryByKey(id);
    	OccupationBean occupationBean = occupationMapper.selectByKey(id);
    	occupationBean.setNecessaryAbility(necessaryList);
    	occupationBean.setSecondaryAbility(secondaryList);
        return occupationBean;
    }
    
    public int deleteOccupationById(String ids) {
    	int i = 1;
    	String[] idArray = ids.split(",");
    	for (String id : idArray) {
    		OccupationAbilityEntity occupationAbilityEntity = new OccupationAbilityEntity();
    		occupationAbilityEntity.setOccupation_id(Integer.parseInt(id));
    		occupationAbilityMapper.delete(occupationAbilityEntity);
    		if (occupationMapper.deleteByPrimaryKey(Integer.parseInt(id)) == 0) {
    			i = 0;
    		}
    	}
    	return i;
    }
    
    public List<OccupationListBean> selectAllOccupationList() {
    	Map<String, String> map = new HashMap<String, String>();
    	List<OccupationListBean> occupationList = occupationMapper.selectOccupationList(map);
		return occupationList;
    }
    
    public List<OccupationListBean> selectOccupationList(Map<String, String> map) {
    	if (map.get("page") != null && map.get("rows") != null) {
			PageHelper.startPage(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("rows")));
		}
    	List<OccupationListBean> occupationList = occupationMapper.selectOccupationList(map);
    	for (int i = 0; i < occupationList.size(); i++) {
    		List<OccupationAbilityBean> necessaryList = occupationAbilityMapper.selectNecessaryByKey(Integer.parseInt(occupationList.get(i).getId()));
    		List<OccupationAbilityBean> secondaryList = occupationAbilityMapper.selectSecondaryByKey(Integer.parseInt(occupationList.get(i).getId()));
    		List<String> necessaryAbility = new ArrayList<String>();
    		for (OccupationAbilityBean necessaryBean : necessaryList) {
    			necessaryAbility.add(necessaryBean.getAbilityId());
    		}
    		List<String> secondaryAbility = new ArrayList<String>();
    		for (OccupationAbilityBean secondaryBean : secondaryList) {
    			secondaryAbility.add(secondaryBean.getAbilityId());
    		}
    		occupationList.get(i).setNecessaryAbility(necessaryAbility);
    		occupationList.get(i).setSecondaryAbility(secondaryAbility);
    	}
		return occupationList;
    }
    
    public List<OccupationEntity> selectOccupationAll() {
    	return occupationMapper.selectAll();
    }
}
