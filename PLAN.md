# 두더지 잡기 게임 (Whack-A-Mole Game)

## 📋 프로젝트 개요

**개발 날짜**: 2025년 10월 6일  
**난이도**: 🟡 Medium  
**예상 소요시간**: 3-4시간  
**한 줄 설명**: 클래식 두더지 잡기 아케이드 게임 with 점수 랭킹 시스템

## 🎯 핵심 가치

추억의 오락실 게임을 웹으로! 빠른 반응속도와 집중력을 테스트하는 중독성 있는 게임

## ✨ 주요 기능

### 1. 게임 플레이
- 🕳️ 9개의 구멍에서 랜덤하게 두더지 등장
- 🔨 마우스 클릭으로 두더지 타격
- ⏱️ 30초/60초 타임어택 모드
- 💯 점수 및 콤보 시스템

### 2. 난이도 설정
- 🟢 **쉬움**: 두더지 2초 노출, 느린 속도
- 🟡 **보통**: 두더지 1.5초 노출, 중간 속도
- 🔴 **어려움**: 두더지 1초 노출, 빠른 속도
- 💀 **지옥**: 두더지 0.7초 노출, 매우 빠른 속도

### 3. 점수 시스템
- 기본 점수: 두더지 1마리 = 10점
- 콤보 보너스: 연속 타격 시 점수 배율 증가
- 미스 페널티: 빈 구멍 클릭 시 -5점
- 골든 두더지: 랜덤 등장, 3배 점수

### 4. 랭킹 시스템
- 🏆 로컬 최고 기록 저장
- 📊 난이도별 TOP 10 랭킹
- 🎯 닉네임 입력 기능
- 📈 개인 통계 (평균 점수, 총 게임 수)

## 🎨 UI/UX 설계

### 시작 화면
```
┌─────────────────────────────────┐
│     🔨 두더지 잡기 게임 🔨        │
│                                   │
│    난이도 선택:                    │
│    [🟢 쉬움] [🟡 보통]             │
│    [🔴 어려움] [💀 지옥]           │
│                                   │
│    시간 선택:                      │
│    [ 30초 ] [ 60초 ]              │
│                                   │
│    ┌─────────────────────┐      │
│    │   🎮 게임 시작!       │      │
│    └─────────────────────┘      │
│                                   │
│    🏆 최고 기록: 850점            │
│    📊 랭킹 보기                    │
└─────────────────────────────────┘
```

### 게임 화면
```
┌─────────────────────────────────┐
│  ⏱️ 25초  |  💯 240점  |  🔥 x3  │
├─────────────────────────────────┤
│                                   │
│    🕳️     🐹     🕳️              │
│         (두더지)                   │
│                                   │
│    🕳️     🕳️     ⭐              │
│                  (골든두더지)       │
│                                   │
│    🐹     🕳️     🕳️              │
│  (두더지)                          │
│                                   │
└─────────────────────────────────┘
```

### 게임 종료 화면
```
┌─────────────────────────────────┐
│        🎉 게임 종료!              │
│                                   │
│      최종 점수: 850점              │
│      최고 콤보: x7                │
│      명중률: 85%                  │
│                                   │
│    닉네임: [_______]              │
│                                   │
│    [랭킹 등록]  [다시하기]          │
└─────────────────────────────────┘
```

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion (두더지 등장/퇴장)
- **Sound**: Howler.js (효과음 - 선택사항)
- **Icons**: Lucide React

### Data Management
- **State**: React Hooks (useState, useEffect, useCallback)
- **Storage**: LocalStorage (랭킹, 통계 저장)
- **Timer**: setInterval/setTimeout (게임 타이머)

## 📂 프로젝트 구조

```
2025-10-06-whack-a-mole/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 메인 게임 페이지
│   └── globals.css             # 글로벌 스타일
├── components/
│   ├── start-screen.tsx        # 시작 화면 (난이도/시간 선택)
│   ├── game-board.tsx          # 게임 보드 (9개 구멍)
│   ├── mole.tsx                # 두더지 컴포넌트
│   ├── score-board.tsx         # 점수판 (시간/점수/콤보)
│   ├── game-over-modal.tsx     # 게임 종료 모달
│   └── leaderboard.tsx         # 랭킹 화면
├── lib/
│   ├── types.ts                # 타입 정의
│   ├── game-logic.ts           # 게임 로직 (점수계산, 난이도)
│   ├── storage.ts              # LocalStorage 유틸
│   └── utils.ts                # 공통 유틸 함수
├── hooks/
│   ├── use-game.ts             # 게임 상태 관리 훅
│   └── use-timer.ts            # 타이머 훅
├── public/                     # 정적 파일 (효과음 등)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 📊 데이터 모델

### GameConfig (게임 설정)
```typescript
interface GameConfig {
  difficulty: 'easy' | 'normal' | 'hard' | 'hell';
  duration: 30 | 60; // 초
}
```

### Mole (두더지)
```typescript
interface Mole {
  id: number;
  isActive: boolean;
  isGolden: boolean;
  showTime: number; // ms
}
```

### GameState (게임 상태)
```typescript
interface GameState {
  isPlaying: boolean;
  score: number;
  combo: number;
  maxCombo: number;
  hits: number;
  misses: number;
  timeLeft: number;
}
```

### LeaderboardEntry (랭킹 엔트리)
```typescript
interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  difficulty: string;
  accuracy: number;
  maxCombo: number;
  timestamp: number;
}
```

## 🎯 MVP 범위

### ✅ 포함 기능
1. 🎮 **핵심 게임 플레이**
   - 9개 구멍 게임판
   - 두더지 랜덤 등장/퇴장
   - 클릭으로 타격
   - 점수 및 콤보 시스템

2. ⚙️ **난이도 설정**
   - 4가지 난이도 (쉬움/보통/어려움/지옥)
   - 2가지 시간 모드 (30초/60초)

3. 🏆 **랭킹 시스템**
   - 난이도별 TOP 10 저장
   - 닉네임 등록
   - LocalStorage 저장

4. 📊 **게임 통계**
   - 점수, 명중률, 최고 콤보
   - 게임 종료 시 결과 표시

5. 🎨 **UI/애니메이션**
   - 두더지 등장/퇴장 애니메이션
   - 타격 피드백 효과
   - 반응형 디자인

### ❌ 제외 기능 (추후 확장)
- 효과음 (선택적으로 추가 가능)
- 멀티플레이어
- 다양한 두더지 종류
- 파워업 아이템
- 스토리 모드

## 🚀 개발 단계

### Phase 1: 프로젝트 설정 (20분)
- [ ] Next.js 프로젝트 초기화
- [ ] Shadcn UI 설정
- [ ] Tailwind 설정
- [ ] 폴더 구조 생성

### Phase 2: 데이터 & 로직 레이어 (30분)
- [ ] 타입 정의 (types.ts)
- [ ] 게임 로직 (game-logic.ts)
- [ ] LocalStorage 유틸 (storage.ts)
- [ ] 게임 훅 (use-game.ts, use-timer.ts)

### Phase 3: 핵심 컴포넌트 (60분)
- [ ] 두더지 컴포넌트 (mole.tsx)
- [ ] 게임 보드 (game-board.tsx)
- [ ] 점수판 (score-board.tsx)

### Phase 4: 화면 컴포넌트 (40분)
- [ ] 시작 화면 (start-screen.tsx)
- [ ] 게임 종료 모달 (game-over-modal.tsx)
- [ ] 랭킹 화면 (leaderboard.tsx)

### Phase 5: 메인 페이지 통합 (30분)
- [ ] 메인 페이지 구현 (page.tsx)
- [ ] 게임 흐름 통합
- [ ] 상태 관리 연결

### Phase 6: 스타일링 & 애니메이션 (40분)
- [ ] 전역 스타일
- [ ] 두더지 등장/퇴장 애니메이션
- [ ] 타격 피드백 효과
- [ ] 반응형 디자인

### Phase 7: 테스트 & 최적화 (20분)
- [ ] 기능 테스트
- [ ] 버그 수정
- [ ] 성능 최적화

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Green (#10b981) - 두더지, 성공
- **Secondary**: Orange (#f59e0b) - 골든 두더지
- **Danger**: Red (#ef4444) - 미스, 경고
- **Background**: Brown (#92400e) - 땅, 구멍
- **Neutral**: Gray (텍스트, UI)

### 타이포그래피
- **제목**: text-3xl ~ text-5xl, font-bold
- **점수**: text-2xl ~ text-4xl, font-extrabold
- **본문**: text-base, font-medium
- **캡션**: text-sm, text-gray-600

### 애니메이션
- **두더지 등장**: translateY(-100% → 0), 200ms, ease-out
- **두더지 퇴장**: translateY(0 → -100%), 200ms, ease-in
- **타격 효과**: scale(1 → 1.2 → 0), 300ms
- **점수 증가**: scale + fade-in, 400ms

## 📱 반응형 디자인

### Mobile (< 640px)
- 게임판 크기: 300x300px
- 구멍 크기: 80x80px
- 세로 스크롤 UI

### Tablet (640px ~ 1024px)
- 게임판 크기: 400x400px
- 구멍 크기: 110x110px
- 2컬럼 랭킹 레이아웃

### Desktop (> 1024px)
- 게임판 크기: 500x500px
- 구멍 크기: 140x140px
- 중앙 정렬, 사이드 랭킹

## 🔧 핵심 게임 로직

### 두더지 생성 로직
```typescript
function spawnMole(difficulty: Difficulty): number {
  const holes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const isGolden = Math.random() < 0.1; // 10% 확률
  return randomHole;
}
```

### 점수 계산
```typescript
function calculateScore(isGolden: boolean, combo: number): number {
  const baseScore = isGolden ? 30 : 10;
  const comboMultiplier = Math.min(1 + (combo * 0.1), 3); // 최대 3배
  return Math.floor(baseScore * comboMultiplier);
}
```

### 난이도별 설정
```typescript
const DIFFICULTY_CONFIG = {
  easy: { showTime: 2000, spawnInterval: 1500 },
  normal: { showTime: 1500, spawnInterval: 1200 },
  hard: { showTime: 1000, spawnInterval: 900 },
  hell: { showTime: 700, spawnInterval: 600 },
};
```

## ✅ 완료 조건

1. 🎮 두더지가 9개 구멍에서 랜덤 등장
2. 🔨 클릭으로 두더지 타격 가능
3. 💯 점수, 콤보, 타이머 정상 작동
4. ⚙️ 4가지 난이도 선택 가능
5. 🏆 랭킹 저장 및 표시
6. 📱 모바일/데스크톱 반응형
7. 🎨 부드러운 애니메이션

## 🚀 향후 확장 아이디어

1. **효과음**: 타격음, 배경음악, 골든 두더지 소리
2. **다양한 두더지**: 빠른 두더지, 방해 두더지, 보너스 두더지
3. **파워업**: 슬로우 모션, 망치 강화, 더블 포인트
4. **업적 시스템**: 뱃지, 도전과제, 레벨 시스템
5. **멀티플레이**: 실시간 대전, 협동 모드
6. **스토리 모드**: 스테이지별 미션
7. **테마**: 계절별 테마, 캐릭터 커스터마이징

---

**시작 시간**: 2025-10-06  
**목표 완료 시간**: 3-4시간  
**개발자**: AI Assistant + User

