package tk.mybatis.springboot.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "trainee_sysuser_relationship")
public class TraineeSysuserRelationshipEntity {
	@Id
    @Column(name = "student")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer student;
	private String assessor;
	@JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    private Date assess_date;
	private Integer flag;
    
	public Integer getStudent() {
		return student;
	}
	public void setStudent(Integer student) {
		this.student = student;
	}
	public String getAssessor() {
		return assessor;
	}
	public void setAssessor(String assessor) {
		this.assessor = assessor;
	}
	public Date getAssess_date() {
		return assess_date;
	}
	public void setAssess_date(Date assess_date) {
		this.assess_date = assess_date;
	}
	public Integer getFlag() {
		return flag;
	}
	public void setFlag(Integer flag) {
		this.flag = flag;
	}
}
