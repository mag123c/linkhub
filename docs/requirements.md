# 링크허브 (LinkHub) - 요구사항 명세서

## Original Requirement
"나는 지금 크롬 확장도구? 같은걸 만들고싶어, 링크허브라는 이름으로. 근데 이게 그냥 북마크랑 다를바가 없으려나?"

---

## 프로젝트 개요

**Goal**: 기존 크롬 북마크의 한계를 해결하는 **링크허브** Chrome 확장 프로그램 개발

### 북마크와의 핵심 차별점

| 기존 북마크 문제 | 링크허브 해결책 |
|-----------------|----------------|
| 검색/찾기 어려움 | 제목+URL+태그+메모 전문 검색 |
| 공유 기능 부족 | URL 내보내기 + 공유 링크 + QR코드 |
| 시각적 관리 부족 | 카드형 레이아웃으로 직관적 UI |
| 단순 폴더 구조 | 유연한 태그 기반 분류 |

---

## Scope (범위)

### 포함
- 링크 저장/정리
- 태그 기반 분류
- 전문 검색 (제목/URL/태그/메모)
- 공유 기능 (내보내기, 공유 링크, QR코드)
- 임시 저장 (Read-later)

### 제외 (1차 버전)
- 클라우드 동기화
- 다기기 연동
- AI 추천
- 소셜 기능

---

## 기술적 결정

| 항목 | 결정 | 이유 |
|------|------|------|
| 데이터 저장 | Chrome Storage API (로컬) | 서버 없이 간단하게 시작 |
| 정리 방식 | 태그 기반 | 폴더보다 유연한 분류 가능 |
| UI | 카드형 레이아웃 | 시각적 직관성 |
| 검색 | 전문 검색 | 제목/URL/태그/메모 모두 검색 |
| 공유 | JSON + 공유 링크 + QR | 다양한 공유 방식 지원 |

---

## MVP 기능 (1차 릴리즈)

### 핵심 기능
1. **원클릭 저장**: 현재 탭을 버튼 하나로 저장
2. **태그 관리**: 링크에 태그 추가/수정/삭제
3. **카드형 목록**: 링크를 시각적으로 보기 좋게 표시
4. **전문 검색**: 제목, URL, 태그, 메모 통합 검색
5. **JSON 내보내기**: 링크 목록을 JSON으로 내보내기

### MVP 성공 기준
- [ ] 링크 저장/삭제가 정상 동작
- [ ] 태그 추가/필터링이 정상 동작
- [ ] 검색 결과가 정확하게 표시
- [ ] 내보내기 파일이 올바른 형식

---

## 2차 확장 예정

- 공유 링크 생성 (웹페이지 URL)
- QR코드 생성
- 임시 저장 (Read-later) 마킹 및 필터
- 링크 메모/설명 추가
- 다크 모드

---

## 데이터 구조 (예상)

```typescript
interface Link {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  tags: string[];
  memo?: string;
  isReadLater?: boolean;
  createdAt: number;
  updatedAt: number;
}

interface LinkHubData {
  links: Link[];
  tags: string[];  // 모든 태그 목록
  settings: {
    theme: 'light' | 'dark';
    defaultView: 'card' | 'list';
  };
}
```

---

## 기술 스택 (예상)

- **프레임워크**: React + TypeScript
- **빌드**: Vite (Chrome Extension 플러그인)
- **스타일**: Tailwind CSS
- **저장소**: Chrome Storage API
- **아이콘**: Lucide React

---

## 참고

- Chrome Extension Manifest V3 사용
- 팝업 UI + 옵션 페이지 구성
