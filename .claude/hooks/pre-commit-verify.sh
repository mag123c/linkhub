#!/bin/bash
# PreToolUse Hook - git commit 전 빌드/린트 검증 권장
# LinkHub 프로젝트용

set -e
INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input // ""')

# Bash 도구가 아니면 스킵
if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

# git commit 명령이 아니면 스킵
if ! echo "$TOOL_INPUT" | grep -q "git commit"; then
  exit 0
fi

# 이미 verify 마커가 있으면 스킵 (같은 세션에서 이미 검증됨)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
MARKER_DIR="/tmp/linkhub-verify-markers"
MARKER_FILE="$MARKER_DIR/$SESSION_ID"

mkdir -p "$MARKER_DIR"

if [ -f "$MARKER_FILE" ]; then
  # 마지막 검증 후 5분 이내면 스킵
  LAST_VERIFY=$(cat "$MARKER_FILE" 2>/dev/null || echo "0")
  NOW=$(date +%s)
  DIFF=$((NOW - LAST_VERIFY))
  if [ "$DIFF" -lt 300 ]; then
    exit 0
  fi
fi

cat << 'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "## Pre-Commit Verification\n\n**WARNING**: 커밋 전 검증이 권장됩니다.\n\n**CHECKLIST**:\n1. `pnpm build` - 빌드 성공 확인\n2. `pnpm lint` - 린트 통과 확인\n3. `pnpm typecheck` - 타입 체크 통과\n\n**TIP**: `/verify` 스킬을 사용하면 자동으로 검증합니다.\n\n검증 없이 진행하려면 이 메시지를 무시하고 커밋하세요."
  }
}
EOF

# 마커 갱신
date +%s > "$MARKER_FILE"
