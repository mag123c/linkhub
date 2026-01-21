# Popup Components

Popup UI를 구성하는 React 컴포넌트 모음.

## 파일 구조

| 파일 | 역할 |
|------|------|
| `index.ts` | 컴포넌트 export |
| `TagInput.tsx` | 태그 입력 (자동완성, Enter 추가) |
| `TagFilter.tsx` | 태그 필터 바 |
| `LinkCard.tsx` | 링크 카드 (편집, 삭제) |
| `SaveLinkModal.tsx` | 링크 저장 모달 |

## 사용 패턴

```tsx
import { TagInput, TagFilter, LinkCard, SaveLinkModal } from './components';
```

## 컴포넌트 Props

### TagInput
- `tags`: 현재 태그 배열
- `onChange`: 태그 변경 콜백
- `suggestions`: 자동완성 제안 목록

### TagFilter
- `tags`: 전체 태그 목록
- `selectedTag`: 선택된 태그 (null = All)
- `onSelect`: 태그 선택 콜백

### LinkCard
- `link`: Link 객체
- `existingTags`: 편집 시 자동완성용
- `onUpdate`: 수정 콜백
- `onDelete`: 삭제 콜백
- `onTagClick`: 태그 클릭 시 필터링

### SaveLinkModal
- `tab`: 현재 탭 정보
- `existingTags`: 자동완성용
- `onSave`: 저장 콜백
- `onClose`: 닫기 콜백

---
최종 수정: 2026-01-21
