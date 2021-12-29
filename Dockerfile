FROM golang:1.17 as builder
WORKDIR /go/src/gomanual
COPY . .
ENV GO111MODULE=on
RUN CGO_ENABLED=0 go build --trimpath -ldflags="-s -w -X main.version=docker" -o gomanual main.go
RUN cp gomanual /go/bin/gomanual

FROM alpine:latest as builder2
RUN apk add --no-cache upx
COPY --from=builder /go/bin/gomanual /go/bin/gomanual
WORKDIR /go/bin
RUN upx gomanual
RUN apk del --no-cache upx
RUN apk del --no-cache tzdata

FROM scratch
COPY --from=builder2 /go/bin/gomanual /
EXPOSE 8080
ENTRYPOINT ["/gomanual"]
