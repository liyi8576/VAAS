package tk.mybatis.springboot.bean;

public class OccupationAbilityBean {
	private String abilityId;
	private String necessaryLevel;
	private String criterionScore;
    
	public String getAbilityId() {
		return abilityId;
	}
	public void setAbilityId(String abilityId) {
		this.abilityId = abilityId;
	}
	public String getNecessaryLevel() {
		return necessaryLevel;
	}
	public void setNecessaryLevel(String necessaryLevel) {
		this.necessaryLevel = necessaryLevel;
	}
	public String getCriterionScore() {
		return criterionScore;
	}
	public void setCriterionScore(String criterionScore) {
		this.criterionScore = criterionScore;
	}
}
