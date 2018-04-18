package tk.mybatis.springboot.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AssessResultBean {
	private int traineeId;
	private String traineeName;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date assessBeginDate = new Date();
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date assessEndDate = new Date();
	private int assessStatus;
	private int assessCount;
    
	public int getTraineeId() {
		return traineeId;
	}
	public void setTraineeId(int traineeId) {
		this.traineeId = traineeId;
	}
	public String getTraineeName() {
		return traineeName;
	}
	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}
	public Date getAssessBeginDate() {
		return assessBeginDate;
	}
	public void setAssessBeginDate(Date assessBeginDate) {
		this.assessBeginDate = assessBeginDate;
	}
	public Date getAssessEndDate() {
		return assessEndDate;
	}
	public void setAssessEndDate(Date assessEndDate) {
		this.assessEndDate = assessEndDate;
	}
	public int getAssessStatus() {
		return assessStatus;
	}
	public void setAssessStatus(int assessStatus) {
		this.assessStatus = assessStatus;
	}
	public int getAssessCount() {
		return assessCount;
	}
	public void setAssessCount(int assessCount) {
		this.assessCount = assessCount;
	}
}
