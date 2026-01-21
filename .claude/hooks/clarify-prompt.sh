#!/bin/bash
# UserPromptSubmit Hook - 세션당 첫 프롬프트에만 /clarify 권장
# LinkHub 프로젝트용

set -e
INPUT=$(cat)

SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
PROMPT=$(echo "$INPUT" | jq -r '.prompt // ""')
MARKER_DIR="/tmp/linkhub-clarify-markers"
MARKER_FILE="$MARKER_DIR/$SESSION_ID"

mkdir -p "$MARKER_DIR"

# 이미 이 세션에서 평가했으면 스킵
if [ -f "$MARKER_FILE" ]; then
  exit 0
fi

touch "$MARKER_FILE"

# 모든 프롬프트에 clarify 권장 (길이 제한 제거)

# 특정 키워드가 있으면 clarify 스킵 (명확한 요청)
if echo "$PROMPT" | grep -qiE "^(commit|build|test|lint|fix typo|버그|오류)"; then
  exit 0
fi

cat << 'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "## Clarify Recommendation\n\n**INFO**: 새 세션의 첫 작업 요청입니다.\n\n**SUGGESTION**:\n- 요구사항이 복잡하거나 모호하면 `/clarify` 스킬 실행 권장\n- 명확한 단순 작업이면 바로 진행 가능\n\n**LinkHub MVP 체크리스트 참고**: docs/requirements.md"
  }
}
EOF
