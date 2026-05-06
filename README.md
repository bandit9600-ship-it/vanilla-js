# Momentum - Hoon Assignment

바닐라 JavaScript만 사용한 Momentum 클론 과제입니다.

## 포함 기능

- 실시간 시계
- localStorage를 사용한 로그인
- localStorage를 사용한 투두리스트
- 랜덤 배경 이미지
- 위치 API 기반 날씨 출력
- CSS 스타일링
- 외부 라이브러리 사용 없음

## 로그인 테스트 방법

처음 접속하면 로그인 화면만 먼저 나옵니다. 투두리스트 입력창은 로그인 후에만 표시됩니다.

1. 이름 입력칸에 `hoon` 입력
2. 로그인
3. 새로고침
4. `Hello, hoon`이 유지되면 localStorage 로그인 성공

로그인 상태를 다시 초기화하려면 브라우저 개발자도구 Console에서 아래 코드를 실행하세요.

```js
localStorage.removeItem("username");
```

전체 데이터를 초기화하려면 아래 코드를 실행하세요.

```js
localStorage.clear();
```

## 날씨 API 설정

`js/app.js` 파일에서 아래 부분에 OpenWeather API Key를 넣으면 됩니다.

```js
const API_KEY = "";
```

API 키가 비어 있어도 위치 권한 확인까지는 작동하고, 화면에는 `날씨 API 키 필요`라고 표시됩니다.

## GitHub Pages 업로드

1. 이 폴더 안의 파일 전체를 GitHub 저장소에 업로드
2. Settings → Pages
3. Branch를 `main`, Folder를 `/root`로 설정
4. 배포 주소 접속
