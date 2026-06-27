# 방T의 역사 사이트

한국 역사 교육을 위한 통합 플랫폼입니다. 선생님과 학생이 분리된 환경에서 한국 역사를 배우고 가르칠 수 있습니다.

## 🎯 주요 기능

### 👨‍🏫 선생님 기능
- **로그인/회원가입**: 선생님 계정 관리
- **자동 문제 생성**: AI 기반 한국 역사 문제 자동 생성
- **자료 관리**: PDF, 이미지, 동영상 등 자료 업로드 및 수정
- **커스텀 문제**: 직접 작성한 문제 추가 (객관식, 단답형, 서술형)
- **과제 할당**: 학생에게 문제/과제 할당
- **성적 관리**: 학생 성적 조회 및 분석
- **대시보드**: 전체 현황 파악

### 👨‍🎓 학생 기능
- **로그인/회원가입**: 학생 계정 관리
- **과제 조회**: 할당된 과제 확인
- **문제 풀이**: 다양한 유형의 문제 풀기
- **성적 확인**: 개인 성적 및 피드백 확인
- **자료 열람**: 선생님이 올린 자료 학습
- **대시보드**: 나의 학습 현황

## 📚 한국 역사 주제

- **삼국시대**: 고구려, 백제, 신라
- **통일신라 및 발해**
- **고려**: 건국부터 멸망까지
- **조선**: 건국부터 근현대까지
- **근현대**: 일제강점기, 해방, 한국전쟁, 현대사

## 🛠️ 기술 스택

- **Frontend**: Next.js + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **File Upload**: Multer

## 📁 프로젝트 구조

```
bangT-history/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── auth/              # 인증 페이지
│   ├── teacher/           # 선생님 대시보드
│   └── student/           # 학생 대시보드
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 함수
├── public/                # 정적 파일
├── styles/                # CSS/Tailwind
├── types/                 # TypeScript 타입
└── prisma/                # 데이터베이스 스키마
```

## 🚀 시작하기

### 1. 설치
```bash
git clone https://github.com/pliuy2013/bangT-history.git
cd bangT-history
npm install
```

### 2. 환경설정
`.env.local` 파일 생성:
```
DATABASE_URL="postgresql://user:password@localhost:5432/bangT_history"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. 데이터베이스 설정
```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 👤 테스트 계정

### 선생님
- 이메일: `teacher@example.com`
- 비밀번호: `password123`

### 학생
- 이메일: `student@example.com`
- 비밀번호: `password123`

## 📝 라이선스

MIT

## 👨‍💻 개발자

방T의 역사 사이트 팀
