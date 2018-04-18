package tk.mybatis.springboot.bean;

import javax.persistence.*;

public class BaseEntity {
    @Transient
    private Integer offset = 0;

    @Transient
    private Integer pageSize = 0;

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
