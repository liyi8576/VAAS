package tk.mybatis.springboot.bean;

public class AssessmentRecordBean {
	private String abilityId;
	private String assessOption;
    
	public String getAbilityId() {
		return abilityId;
	}
	public void setAbilityId(String abilityId) {
		this.abilityId = abilityId;
	}
	public String getAssessOption() {
		return assessOption;
	}
	public void setAssessOption(String assessOption) {
		this.assessOption = assessOption;
	}
}
