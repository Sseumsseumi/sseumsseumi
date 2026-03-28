package com.inyeon.sseumsseumi.monitoring.config;

import org.hibernate.resource.jdbc.spi.StatementInspector;

public class QueryCountInspector implements StatementInspector {
    // 모든 SQL 실행마다 inspect() 메서드 자동으로 호출 (Hibernate 레벨)
    @Override
    public String inspect(String sql) {
        // HTTP 요청 컨텍스트
        RequestContext requestContext = RequestContextHolder.getContext();
        if (requestContext != null) {
            //쿼리 카운트
            requestContext.incrementQueryCount(sql);
        }

        return sql;
    }
}
