package tk.mybatis.springboot.bean;

public class AssessStatusFilterBean extends BaseEntity {
	private Integer assessStatus;

	public Integer getAssessStatus() {
		return assessStatus;
	}

	public void setAssessStatus(Integer assessStatus) {
		this.assessStatus = assessStatus;
	}
}
