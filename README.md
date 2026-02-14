# All About EHT (초기 화면)

첫 접속 시 `All About EHT` 타이틀과 Google 로그인 버튼을 보여주는 최소 페이지입니다.

## 실행 방법

```bash
python3 -m http.server 3000
```

브라우저에서 `http://localhost:3000` 접속.

## Supabase 연결 설정

1. `config.js` 파일 열기
2. `SUPABASE_ANON_KEY` 값을 Supabase 프로젝트의 anon key로 변경
3. 새로고침 후 "Google로 로그인" 버튼 클릭

```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://ueltlyhjwwdhdxxxkghs.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
};
```

## VSCode(로컬)로 지금까지 작업 옮기기 — 복붙용

아래 명령을 **내 컴퓨터 터미널**(PowerShell, macOS Terminal 등)에 그대로 붙여 넣으면 됩니다.

```bash
git clone https://github.com/aaeht/aaeht001.git
cd aaeht001
git checkout work
python3 -m http.server 3000
```

그다음 브라우저에서 `http://localhost:3000` 접속.

### `python3`가 없다고 나오면

```bash
python -m http.server 3000
```

## GitHub 실시간 확인 워크플로우 (권장)

현재 GitHub 저장소:
- `https://github.com/aaeht/aaeht001`

아래 순서대로 하면, 로컬 설치 없이도 GitHub + 배포 링크로 결과를 확인할 수 있습니다.

### 1) 이 작업공간 저장소를 GitHub 원격에 연결

```bash
cd /workspace/aaeht
git remote add origin https://github.com/aaeht/aaeht001.git
```

이미 origin이 있다면 아래로 변경:

```bash
git remote set-url origin https://github.com/aaeht/aaeht001.git
```

확인:

```bash
git remote -v
```

### 2) 현재 브랜치를 GitHub로 push

```bash
git push -u origin work
```

### 3) Vercel 연결 (무료)

1. vercel.com 로그인 (GitHub 계정으로)
2. **Add New Project**
3. `aaeht/aaeht001` 저장소 Import
4. Framework preset은 `Other`(현재 정적 페이지)
5. Deploy 클릭

배포 완료 후 발급되는 URL로 접속하면, `localhost` 없이 바로 확인할 수 있습니다.

### 4) 이후 작업 방식

- 코드 수정 → commit → push
- Vercel이 자동으로 재배포
- 변경된 링크에서 바로 결과 확인
