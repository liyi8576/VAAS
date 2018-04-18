package tk.mybatis.springboot.bean;

import java.util.List;

public class DomainBean {
	private String domain;
	private String domain_name;
	private int quality;
	private List<AbilityBean> abilityList;
    
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getDomain_name() {
		return domain_name;
	}
	public void setDomain_name(String domain_name) {
		this.domain_name = domain_name;
	}
	public int getQuality() {
		return quality;
	}
	public void setQuality(int quality) {
		this.quality = quality;
	}
	public List<AbilityBean> getAbilityList() {
		return abilityList;
	}
	public void setAbilityList(List<AbilityBean> abilityList) {
		this.abilityList = abilityList;
	}
}
