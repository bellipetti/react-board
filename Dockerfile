# 1단계 : 빌드 컨테이너

# Node.js를 이용해 React 빌드
FROM node:18-alpine AS build

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./

RUN npm install

# 실행 권한 부여 (Vite 문제 해결)
RUN chmod +x node_modules/.bin/vite


# 소스 코드 복사후 빌드
COPY . .

RUN npm run build


# 2단계 : 실행 컨테이너

FROM nginx:alpine


# React 빌드 파일을 Nginx 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html


# Nginx 설정 변경 (필요시)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
