package tk.mybatis.springboot.mapper;

import tk.mybatis.springboot.entity.AssessmentResultEntity;
import tk.mybatis.springboot.util.MyMapper;

public interface AssessmentResultMapper extends MyMapper<AssessmentResultEntity> {
	public int deleteByTraineeId(Integer trainee_id);
}
