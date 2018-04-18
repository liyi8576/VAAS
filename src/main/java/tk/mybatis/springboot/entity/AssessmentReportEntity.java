package tk.mybatis.springboot.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "assessment_report")
public class AssessmentReportEntity {
	@Id
    @Column(name = "assess_report_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assess_report_id;
	private Integer trainee_id;
    private Integer occupation_id;
    private String potential;
    private String limits;
	private String work_context;
    private String personal_will;
    private String parent_will;
	private String other;
    private String place_advice;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    private Date track_date;
    private String tracker;
    private String track_result;
    private String designer;
    private String designer_title;
    private String institution;
    private String institution_phone;
    private String executor;
    private String executor_title;
    private String institution_address;
    private String generator;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    private Date generate_time;
    
    public Integer getAssess_report_id() {
		return assess_report_id;
	}
	public void setAssess_report_id(Integer assess_report_id) {
		this.assess_report_id = assess_report_id;
	}
	public Integer getTrainee_id() {
		return trainee_id;
	}
	public void setTrainee_id(Integer trainee_id) {
		this.trainee_id = trainee_id;
	}
	public Integer getOccupation_id() {
		return occupation_id;
	}
	public void setOccupation_id(Integer occupation_id) {
		this.occupation_id = occupation_id;
	}
	public String getPotential() {
		return potential;
	}
	public void setPotential(String potential) {
		this.potential = potential;
	}
	public String getLimits() {
		return limits;
	}
	public void setLimits(String limits) {
		this.limits = limits;
	}
	public String getWork_context() {
		return work_context;
	}
	public void setWork_context(String work_context) {
		this.work_context = work_context;
	}
	public String getPersonal_will() {
		return personal_will;
	}
	public void setPersonal_will(String personal_will) {
		this.personal_will = personal_will;
	}
	public String getParent_will() {
		return parent_will;
	}
	public void setParent_will(String parent_will) {
		this.parent_will = parent_will;
	}
	public String getOther() {
		return other;
	}
	public void setOther(String other) {
		this.other = other;
	}
	public String getPlace_advice() {
		return place_advice;
	}
	public void setPlace_advice(String place_advice) {
		this.place_advice = place_advice;
	}
	public Date getTrack_date() {
		return track_date;
	}
	public void setTrack_date(Date track_date) {
		this.track_date = track_date;
	}
	public String getTracker() {
		return tracker;
	}
	public void setTracker(String tracker) {
		this.tracker = tracker;
	}
	public String getTrack_result() {
		return track_result;
	}
	public void setTrack_result(String track_result) {
		this.track_result = track_result;
	}
	public String getDesigner() {
		return designer;
	}
	public void setDesigner(String designer) {
		this.designer = designer;
	}
	public String getDesigner_title() {
		return designer_title;
	}
	public void setDesigner_title(String designer_title) {
		this.designer_title = designer_title;
	}
	public String getInstitution() {
		return institution;
	}
	public void setInstitution(String institution) {
		this.institution = institution;
	}
	public String getInstitution_phone() {
		return institution_phone;
	}
	public void setInstitution_phone(String institution_phone) {
		this.institution_phone = institution_phone;
	}
	public String getExecutor() {
		return executor;
	}
	public void setExecutor(String executor) {
		this.executor = executor;
	}
	public String getExecutor_title() {
		return executor_title;
	}
	public void setExecutor_title(String executor_title) {
		this.executor_title = executor_title;
	}
	public String getInstitution_address() {
		return institution_address;
	}
	public void setInstitution_address(String institution_address) {
		this.institution_address = institution_address;
	}
	public String getGenerator() {
		return generator;
	}
	public void setGenerator(String generator) {
		this.generator = generator;
	}
	public Date getGenerate_time() {
		return generate_time;
	}
	public void setGenerate_time(Date generate_time) {
		this.generate_time = generate_time;
	}
}
