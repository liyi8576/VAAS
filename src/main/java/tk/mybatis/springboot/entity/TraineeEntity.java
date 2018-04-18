package tk.mybatis.springboot.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "trainee")
public class TraineeEntity {
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	private String name;
    private String sex;
	private String birthday;
    @Column(name = "id_card")
    private String idCard;
    private String qq;
    private String weixin;
    @Column(name = "e_mail")
    private String mail;
	private String guardian;
    private String relationship;
    private String address;
    private String phone;
    @Column(name = "disabled_type")
    private String disabledType;
    @Column(name = "disabled_level")
    private String disabledLevel;
    @Column(name = "disabled_reason")
    private String disabledReason;
    @Column(name = "other_disabled")
    private String otherDisabled;
    private String degree;
    @Column(name = "education_level")
    private String educationLevel;
    @Column(name = "have_trained")
    private Integer haveTrained;
    @Column(name = "trained_intro")
    private String trainedIntro;
    @Column(name = "is_worked")
    private Integer isWorked;
    @Column(name = "worked_intro")
    private String workedIntro;
    @Column(name = "expect_work")
    private String expectWork;
    private String father;
    @Column(name = "father_degree")
    private String fatherDegree;
    @Column(name = "father_job")
    private String fatherJob;
    private String mother;
    @Column(name = "monther_degree")
    private String motherDegree;
    @Column(name = "mother_job")
    private String motherJob;
    @Column(name = "parent_expect")
    private String parentExpect;
    private Integer status;
    private String creator;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    @Column(name = "create_time")
    private Date createTime;
    private String modifier;
    @JsonFormat(pattern = "yyyy-MM-dd HH:MM:SS")
    @Column(name = "modify_time")
    private Date modifyTime;
    
    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getWeixin() {
		return weixin;
	}
	public void setWeixin(String weixin) {
		this.weixin = weixin;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getGuardian() {
		return guardian;
	}
	public void setGuardian(String guardian) {
		this.guardian = guardian;
	}
	public String getRelationship() {
		return relationship;
	}
	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getDisabledType() {
		return disabledType;
	}
	public void setDisabledType(String disabledType) {
		this.disabledType = disabledType;
	}
	public String getDisabledLevel() {
		return disabledLevel;
	}
	public void setDisabledLevel(String disabledLevel) {
		this.disabledLevel = disabledLevel;
	}
	public String getDisabledReason() {
		return disabledReason;
	}
	public void setDisabledReason(String disabledReason) {
		this.disabledReason = disabledReason;
	}
	public String getOtherDisabled() {
		return otherDisabled;
	}
	public void setOtherDisabled(String otherDisabled) {
		this.otherDisabled = otherDisabled;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getEducationLevel() {
		return educationLevel;
	}
	public void setEducationLevel(String educationLevel) {
		this.educationLevel = educationLevel;
	}
	public Integer getHaveTrained() {
		return haveTrained;
	}
	public void setHaveTrained(Integer haveTrained) {
		this.haveTrained = haveTrained;
	}
	public String getTrainedIntro() {
		return trainedIntro;
	}
	public void setTrainedIntro(String trainedIntro) {
		this.trainedIntro = trainedIntro;
	}
	public Integer getIsWorked() {
		return isWorked;
	}
	public void setIsWorked(Integer isWorked) {
		this.isWorked = isWorked;
	}
	public String getWorkedIntro() {
		return workedIntro;
	}
	public void setWorkedIntro(String workedIntro) {
		this.workedIntro = workedIntro;
	}
	public String getExpectWork() {
		return expectWork;
	}
	public void setExpectWork(String expectWork) {
		this.expectWork = expectWork;
	}
	public String getFather() {
		return father;
	}
	public void setFather(String father) {
		this.father = father;
	}
	public String getFatherDegree() {
		return fatherDegree;
	}
	public void setFatherDegree(String fatherDegree) {
		this.fatherDegree = fatherDegree;
	}
	public String getFatherJob() {
		return fatherJob;
	}
	public void setFatherJob(String fatherJob) {
		this.fatherJob = fatherJob;
	}
	public String getMother() {
		return mother;
	}
	public void setMother(String mother) {
		this.mother = mother;
	}
	public String getMotherDegree() {
		return motherDegree;
	}
	public void setMotherDegree(String motherDegree) {
		this.motherDegree = motherDegree;
	}
	public String getMotherJob() {
		return motherJob;
	}
	public void setMotherJob(String motherJob) {
		this.motherJob = motherJob;
	}
	public String getParentExpect() {
		return parentExpect;
	}
	public void setParentExpect(String parentExpect) {
		this.parentExpect = parentExpect;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getModifier() {
		return modifier;
	}
	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	public Date getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}
}
