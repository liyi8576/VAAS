package tk.mybatis.springboot.bean;

public class AssessmentResultBean {
	private String id;
	private String name;
	private String domain;
	private String assessOption;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getAssessOption() {
		return assessOption;
	}
	public void setAssessOption(String assessOption) {
		this.assessOption = assessOption;
	}
}
