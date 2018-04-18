package tk.mybatis.springboot.bean;

import java.util.List;

public class OccupationListBean {
	private String id;
	private String name;
	private String desc;
	private String creator = "管理员";
	private String modifier = "管理员";
	private List<String> necessaryAbility;
	private List<String> secondaryAbility;
    
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
	public List<String> getNecessaryAbility() {
		return necessaryAbility;
	}
	public void setNecessaryAbility(List<String> necessaryAbility) {
		this.necessaryAbility = necessaryAbility;
	}
	public List<String> getSecondaryAbility() {
		return secondaryAbility;
	}
	public void setSecondaryAbility(List<String> secondaryAbility) {
		this.secondaryAbility = secondaryAbility;
	}
}
