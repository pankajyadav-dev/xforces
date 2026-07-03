FROM alpine:latest

RUN apk add --no-cache g++ openjdk25
RUN HEADER_PATH=$(find /usr/include -name "stdc++.h" | grep "bits/stdc++.h") && \
    g++ -x c++-header $HEADER_PATH -o ${HEADER_PATH}.gch
COPY --from=oven/bun:alpine /usr/local/bin/bun /usr/local/bin/bun

RUN adduser -D -g '' runner

WORKDIR /app
RUN chown runner:runner /app
USER runner

CMD ["/bin/sh"]