package tk.mybatis.springboot.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "occupation_ability")
public class OccupationAbilityEntity {
	@Id
    @Column(name = "occupation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer occupation_id;
	private String ability_id;
    private Integer necessary_level;
    private String criterion_score;
    private String creator;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    private Date create_time;
    private String modifier;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    private Date modify_time;
    
    public Integer getOccupation_id() {
		return occupation_id;
	}
	public void setOccupation_id(Integer occupation_id) {
		this.occupation_id = occupation_id;
	}
	public String getAbility_id() {
		return ability_id;
	}
	public void setAbility_id(String ability_id) {
		this.ability_id = ability_id;
	}
	public Integer getNecessary_level() {
		return necessary_level;
	}
	public void setNecessary_level(Integer necessary_level) {
		this.necessary_level = necessary_level;
	}
	public String getCriterion_score() {
		return criterion_score;
	}
	public void setCriterion_score(String criterion_score) {
		this.criterion_score = criterion_score;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public String getModifier() {
		return modifier;
	}
	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	public Date getModify_time() {
		return modify_time;
	}
	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}
}
