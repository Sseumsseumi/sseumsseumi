FROM redis:alpine

# Redis 데이터 디렉토리
VOLUME ["/data"]

# 비밀번호 없으면 즉시 실패
CMD ["sh", "-c", "\
if [ -z \"$REDIS_PASSWORD\" ]; then \
  echo '❌ REDIS_PASSWORD is not set. Redis will not start.' >&2; \
  exit 1; \
fi && \
redis-server --requirepass \"$REDIS_PASSWORD\" \
"]
