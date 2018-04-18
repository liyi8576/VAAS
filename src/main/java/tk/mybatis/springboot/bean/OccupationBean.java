package tk.mybatis.springboot.bean;

import java.util.List;

public class OccupationBean {
	private String id;
	private String name;
	private String desc;
	private String creator = "管理员";
	private String modifier = "管理员";
	private List<OccupationAbilityBean> necessaryAbility;
	private List<OccupationAbilityBean> secondaryAbility;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getModifier() {
		return modifier;
	}
	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	public List<OccupationAbilityBean> getNecessaryAbility() {
		return necessaryAbility;
	}
	public void setNecessaryAbility(List<OccupationAbilityBean> necessaryAbility) {
		this.necessaryAbility = necessaryAbility;
	}
	public List<OccupationAbilityBean> getSecondaryAbility() {
		return secondaryAbility;
	}
	public void setSecondaryAbility(List<OccupationAbilityBean> secondaryAbility) {
		this.secondaryAbility = secondaryAbility;
	}
}
