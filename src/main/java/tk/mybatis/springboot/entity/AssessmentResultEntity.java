package tk.mybatis.springboot.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "assessment_result")
public class AssessmentResultEntity {
	@Id
    @Column(name = "assess_task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assess_task_id;
	private Integer trainee_id;
    private String ability_id;
    private String assess_option;
    
    public Integer getAssess_task_id() {
		return assess_task_id;
	}
	public void setAssess_task_id(Integer assess_task_id) {
		this.assess_task_id = assess_task_id;
	}
	public Integer getTrainee_id() {
		return trainee_id;
	}
	public void setTrainee_id(Integer trainee_id) {
		this.trainee_id = trainee_id;
	}
	public String getAbility_id() {
		return ability_id;
	}
	public void setAbility_id(String ability_id) {
		this.ability_id = ability_id;
	}
	public String getAssess_option() {
		return assess_option;
	}
	public void setAssess_option(String assess_option) {
		this.assess_option = assess_option;
	}
}
