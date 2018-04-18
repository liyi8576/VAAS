package tk.mybatis.springboot.bean;

public class TraineeFilterBean extends BaseEntity {
	private String traineeName;
    
	public String getTraineeName() {
		return traineeName;
	}
	public void setTraineeName(String traineeName) {
		this.traineeName = traineeName;
	}
}
