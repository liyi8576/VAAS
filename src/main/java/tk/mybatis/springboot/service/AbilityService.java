package tk.mybatis.springboot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.mybatis.springboot.bean.AbilityBean;
import tk.mybatis.springboot.bean.DomainBean;
import tk.mybatis.springboot.constants.ConstantFactory;
import tk.mybatis.springboot.entity.AbilityEntity;
import tk.mybatis.springboot.mapper.AbilityMapper;

@Service
public class AbilityService {

    @Autowired
    private AbilityMapper abilityMapper;
    
    public List<AbilityBean> selectAbilityInfo() {
    	return abilityMapper.selectAbilityInfo();
    }
    
    public List<DomainBean> selectAbilityDetails() {
    	List<DomainBean> domainList = new ArrayList<DomainBean>();
    	
    	List<AbilityEntity> abilityList = abilityMapper.selectAll();
    	
    	List<AbilityBean> abilityListA = new ArrayList<AbilityBean>();
    	List<AbilityBean> abilityListB = new ArrayList<AbilityBean>();
    	List<AbilityBean> abilityListC = new ArrayList<AbilityBean>();
    	
    	for (AbilityEntity abilityEntity : abilityList) {
    		AbilityBean abilityBean = new AbilityBean();
    		abilityBean.setId(abilityEntity.getId());
    		abilityBean.setName(abilityEntity.getName());
    		abilityBean.setAssessMethod(abilityEntity.getAssess_method());
    		abilityBean.setDescription(abilityEntity.getDescription());
    		abilityBean.setOptionA(abilityEntity.getOption_a());
    		abilityBean.setOptionB(abilityEntity.getOption_b());
    		abilityBean.setOptionC(abilityEntity.getOption_c());
    		abilityBean.setOptionD(abilityEntity.getOption_d());
    		if (ConstantFactory.DOMAIN_A.equals(abilityEntity.getDomain())) {
    			abilityListA.add(abilityBean);
    		} else if (ConstantFactory.DOMAIN_B.equals(abilityEntity.getDomain())) {
    			abilityListB.add(abilityBean);
    		} else if (ConstantFactory.DOMAIN_C.equals(abilityEntity.getDomain())) {
    			abilityListC.add(abilityBean);
    		}
    	}
    	
    	DomainBean domainA = new DomainBean();
    	domainA.setDomain(ConstantFactory.DOMAIN_A);
    	domainA.setDomain_name(ConstantFactory.DOMAIN_NAME_A);
    	domainA.setAbilityList(abilityListA);
    	
    	DomainBean domainB = new DomainBean();
    	domainB.setDomain(ConstantFactory.DOMAIN_B);
    	domainB.setDomain_name(ConstantFactory.DOMAIN_NAME_B);
    	domainB.setAbilityList(abilityListB);
    	
    	DomainBean domainC = new DomainBean();
    	domainC.setDomain(ConstantFactory.DOMAIN_C);
    	domainC.setDomain_name(ConstantFactory.DOMAIN_NAME_C);
    	domainC.setAbilityList(abilityListC);
    	
    	domainList.add(domainA);
    	domainList.add(domainB);
    	domainList.add(domainC);
    	
    	return domainList;

    }
    
    public List<AbilityEntity> selectAbility() {
    	return abilityMapper.selectAll();

    }
    
    public AbilityBean getAbilityById(String id) {
    	AbilityBean abilityBean = new AbilityBean();
    	if (!id.equals("null")) {
    		AbilityEntity abilityEntity = abilityMapper.selectByPrimaryKey(id);
        	abilityBean.setId(abilityEntity.getId());
        	abilityBean.setName(abilityEntity.getName());
        	abilityBean.setDomain(abilityEntity.getDomain());
        	abilityBean.setAssessMethod(abilityEntity.getAssess_method());
        	abilityBean.setDescription(abilityEntity.getDescription());
        	abilityBean.setOptionA(abilityEntity.getOption_a());
        	abilityBean.setOptionB(abilityEntity.getOption_b());
        	abilityBean.setOptionC(abilityEntity.getOption_c());
        	abilityBean.setOptionD(abilityEntity.getOption_d());
    	}
    	return abilityBean;

    }
}
