package tk.mybatis.springboot.bean;

public class AssessmentReportFilterBean extends BaseEntity {
	private String trainee_name;
	private String occupation_name;
    private String assessor_name;
	private String startDate;
	private String endDate;
    
	public String getTrainee_name() {
		return trainee_name;
	}
	public void setTrainee_name(String trainee_name) {
		this.trainee_name = trainee_name;
	}
	public String getOccupation_name() {
		return occupation_name;
	}
	public void setOccupation_name(String occupation_name) {
		this.occupation_name = occupation_name;
	}
	public String getAssessor_name() {
		return assessor_name;
	}
	public void setAssessor_name(String assessor_name) {
		this.assessor_name = assessor_name;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}
