package tk.mybatis.springboot.bean;

public class ConstrastBean {
	private String domain;
	private String abilityId;
	private int necessaryLevel;
	private String criterionScore;
	private String assessOption;
    
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getAbilityId() {
		return abilityId;
	}
	public void setAbilityId(String abilityId) {
		this.abilityId = abilityId;
	}
	public int getNecessaryLevel() {
		return necessaryLevel;
	}
	public void setNecessaryLevel(int necessaryLevel) {
		this.necessaryLevel = necessaryLevel;
	}
	public String getCriterionScore() {
		return criterionScore;
	}
	public void setCriterionScore(String criterionScore) {
		this.criterionScore = criterionScore;
	}
	public String getAssessOption() {
		return assessOption;
	}
	public void setAssessOption(String assessOption) {
		this.assessOption = assessOption;
	}
}
