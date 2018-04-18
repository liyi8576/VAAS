package tk.mybatis.springboot.util;

import java.util.Random;

public class RandomId {
	public static int getFixLenthString(int strLength) {
		Random rm = new Random();
		// 获得随机数
		double pross = (1 + rm.nextDouble()) * Math.pow(10, strLength);
		// 将获得的获得随机数转化为字符串
		String fixLenthString = String.valueOf(pross);
		// 返回固定的长度的随机数
		return Integer.parseInt((fixLenthString.substring(2, strLength + 1)));
	}
}
