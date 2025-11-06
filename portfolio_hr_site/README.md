# portfolio_hr_site

HR Coordinator 포트폴리오 (정적 사이트)

- Live: https://gwanju-son.github.io/gwanju-son-portfolio/portfolio_hr_site/

파일 구조
- `index.html` - 메인 페이지
- `styles.css` - 스타일
- `script.js` - 데이터 바인딩 및 차트 렌더링
- `data/` - 예시 JSON 데이터 (`hr_projects.json`, `hr_skills.json`)

로컬에서 확인하는 방법
1. 파일 탐색기에서 `portfolio_hr_site/index.html`을 더블클릭하여 브라우저에서 엽니다.
2. 또는 간단한 로컬 서버에서 확인하려면 Python을 사용합니다:

```powershell
# PowerShell에서 (레포 루트에서 실행)
python -m http.server 8000
# 그리고 브라우저에서 http://localhost:8000/portfolio_hr_site/ 로 이동
```

메모
- 데이터는 `data/` 폴더 내 `hr_projects.json`, `hr_skills.json`을 사용합니다. 필요 시 내용을 교체하세요.
