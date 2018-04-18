package tk.mybatis.springboot.bean;

public class OccupationFilterBean extends BaseEntity {
	private String occupationName;

	public String getOccupationName() {
		return occupationName;
	}

	public void setOccupationName(String occupationName) {
		this.occupationName = occupationName;
	}
	
}
