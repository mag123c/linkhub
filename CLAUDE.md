# LinkHub

Chrome Extension for advanced bookmark management with tags, search, and sharing.

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Test
pnpm test
```

## AI Context Index

### Knowledge (`.claude/ai-context/`)

| 문서 | 경로 | 로딩 | 설명 |
|------|------|------|------|
| 아키텍처 | `architecture.json` | **항상** | 레이어, 의존성, Chrome APIs |
| 컨벤션 | `conventions.json` | **항상** | 네이밍, 커밋, 코드 스타일 |
| 용어 | `domain/glossary.json` | **항상** | LinkHub 도메인 용어 |
| 엔터티 | `domain/entities.json` | 필요시 | Link, Tag, Settings 구조 |
| Chrome API | `integrations/chrome.json` | 필요시 | Storage, Tabs, ContextMenus |
| 테스팅 | `testing.json` | 테스트 시 | 테스트 명령어, 패턴 |

### Behavior (`.claude/skills/`)

**스킬 자동 호출 규칙** (필수 준수):

| 트리거 상황 | 필수 스킬 | 이유 |
|-------------|----------|------|
| 코드 변경 요청 시 | `/task` 먼저 호출 | 워크플로우 일관성 |
| Plan Mode 종료 후 구현 시작 | `/task` 호출 | 분석→구현→리뷰 체이닝 |
| 구현 완료 시 | `/reviewer` 자동 호출 | 품질 검증 |
| 커밋/PR 전 | `/verify` 실행 | 빌드/린트/테스트 검증 |

| 스킬 | 용도 |
|------|------|
| `/clarify` | 요구사항 명확화 → Plan Mode |
| `/task` | 전체 워크플로우 오케스트레이션 (분석→구현→리뷰→검증→커밋) |
| `/developer` | 타입 정의, Storage API, 비즈니스 로직 |
| `/frontend` | React 컴포넌트, 커스텀 훅, UI |
| `/reviewer` | 코드 리뷰 (버그/보안/성능/가독성) |
| `/verify` | 자체 검증 루프 (빌드/린트/테스트) |
| `/linkhub-wrap` | 세션 마무리 (문서 업데이트, 후속 작업 제안) |

### Hooks (`.claude/hooks/`)

| 훅 | 트리거 | 동작 |
|----|--------|------|
| `clarify-prompt.sh` | 첫 프롬프트 | `/clarify` 스킬 권장 |
| `pre-commit-verify.sh` | `git commit` 전 | 빌드/린트 검증 권장 |

### Selective Loading Rules

**기본 로딩** (모든 세션):
- `architecture.json` - 프로젝트 구조 이해
- `conventions.json` - 코딩 표준 준수
- `domain/glossary.json` - 도메인 용어

**도메인별 추가 로딩**:

| 작업 유형 | 추가 참조 |
|----------|----------|
| 데이터 구조 변경 | `domain/entities.json` |
| Chrome API 사용 | `integrations/chrome.json` |
| 테스트 작성 | `testing.json` |

---

## Commands

```bash
pnpm dev          # 개발 서버 (hot reload)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint 실행
pnpm lint --fix   # 자동 수정
pnpm test         # Vitest watch 모드
pnpm test:run     # 테스트 1회 실행
pnpm typecheck    # 타입 체크
```

---

## Architecture

```
Popup UI ←→ Storage Utils ←→ Chrome Storage API
             ↑
    Shared Types & Utils
```

### 주요 폴더 구조

```
src/
├── popup/              # Extension popup UI
│   ├── Popup.tsx       # 메인 엔트리
│   ├── components/     # UI 컴포넌트
│   └── hooks/          # 커스텀 훅
├── options/            # Options page
├── background/         # Service worker
├── shared/             # 공유 코드
│   ├── types/          # 타입 정의
│   ├── storage/        # Storage 유틸리티
│   └── utils/          # 유틸리티 함수
└── assets/             # 아이콘 등
```

### 데이터 모델

| 엔터티 | 설명 |
|--------|------|
| Link | 저장된 URL (태그, 메모 포함) |
| Tag | 링크 분류용 태그 |
| Settings | 사용자 설정 (테마, 뷰 모드) |

---

## Core Rules

1. **Storage 추상화**: `chrome.storage` 직접 호출 금지, Storage 유틸리티 사용
2. **타입 안전성**: 모든 데이터에 TypeScript 인터페이스 정의
3. **컴포넌트 분리**: 각 컴포넌트는 자체 상태 관리 또는 props로 수신
4. **공유 코드**: 공통 유틸리티는 `src/shared/`에 배치
5. **커밋**: Conventional Commits, Co-Author/Claude 마킹 금지
6. **디렉토리 문서화**: 새 디렉토리 생성 시 `CLAUDE.md` 작성

---

## Tech Stack

React 18 + TypeScript + Vite + Tailwind CSS + Chrome Extension Manifest V3 + Vitest

---

## Documentation

| 문서 | 용도 |
|------|------|
| `docs/requirements.md` | 요구사항 명세서 |
| `.claude/STRUCTURE.md` | AI Context 구조 규칙 |

---

## AI Context 업데이트 규칙

| 변경 사항 | 업데이트 대상 |
|----------|--------------|
| 데이터 구조 변경 | `domain/entities.json` |
| 새 도메인 용어 | `domain/glossary.json` |
| Chrome API 변경 | `integrations/chrome.json` |
| 레이어 추가/변경 | `architecture.json` |
