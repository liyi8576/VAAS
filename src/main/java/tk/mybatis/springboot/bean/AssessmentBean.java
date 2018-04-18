package tk.mybatis.springboot.bean;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AssessmentBean {
	private Integer traineeId;
	private String traineeName;
	private String assessor = "管理员";
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date assessDate = new Date();
	private Integer assessCount;
	private String currentAbility;
	private List<AssessmentRecordBean> assessResult;
    
	public Integer getTraineeId() {
		return traineeId;
	}
	public void setTraineeId(Integer traineeId) {
		this.traineeId = traineeId;
	}
	public String getTraineeName() {
		return traineeName;
	}
	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}
	public String getAssessor() {
		return assessor;
	}
	public void setAssessor(String assessor) {
		this.assessor = assessor;
	}
	public Date getAssessDate() {
		return assessDate;
	}
	public void setAssessDate(Date assessDate) {
		this.assessDate = assessDate;
	}
	public Integer getAssessCount() {
		return assessCount;
	}
	public void setAssessCount(Integer assessCount) {
		this.assessCount = assessCount;
	}
	public String getCurrentAbility() {
		return currentAbility;
	}
	public void setCurrentAbility(String currentAbility) {
		this.currentAbility = currentAbility;
	}
	public List<AssessmentRecordBean> getAssessResult() {
		return assessResult;
	}
	public void setAssessResult(List<AssessmentRecordBean> assessResult) {
		this.assessResult = assessResult;
	}
}
