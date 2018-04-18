package tk.mybatis.springboot.bean;

import java.io.Serializable;

public class ResultBean implements Serializable {
	private static final long serialVersionUID = -1089805776812706046L;

	private Object data;
	private boolean success;
	private String message;
	
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
