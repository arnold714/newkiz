<details>
<summary>아이디어</summary>
<div markdown="1">

# 1️⃣ 주차장 추천

기존에 있는 주차장 어플

- 출,퇴근을 위한 월정기 주차장 찾기
- 목적지 주변 주차장 정보 찾기
- 할인 가격 주차권 구매
    
    → 주차권 관련 논란이 많음
    
- 비어있는 주차 공간으로 수익 창출
- 수용가능한 주차 수 있음
    
    → 장애인주차장 정확한 주차칸 수 표시x 
    
- 주차장 사진 제공(제공이 안되는 부분도 있으)
    
    → 실외, 실내, 지하, 기계식에 대한 자세히 구분이 있음 좋겠음
    
- 현재 수용가능한 대수를 확인 불가능
- 차량 높이에 대한 제한을 주차장을 하나씩 눌러봐야 확인 가능
# 개요

- 자차를 가지고 있는 사람이라면 무조건 경험하는 주차난에 대한 걱정을 조금이나마 덜어보기위한 앱

## 기능

### 사용자 차량 입력

- 사용자의 차량 길이, 폭, 높이 등의 정보에 따라, 차량이 진입 가능한 주차 공간만 추천
- 소형차/대형차/SUV 등 유형에 맞는 주차장을 필터링

### 사용자의 도착 위치 기반 주차장 추천

- 검색 키워드 제공 ex) 공영주차장, 실내, 카드 결제, 등등
- 사용자가 주차할 예상 시간 x 주차 비용을 계산해서 마커로 표시
- 가장 합리적인 주차장 추천을 리스트로 보여줌
- 원하는 주차장이 있을 경우 네비게이션 어플로 해당 주차장을 도착지로 설정

### 주차장 사용자에 후기 기능

- 실제로 주차장을 사용했을 때 좋았던 점 / 아쉬웠던 점
- q) 사용했는지 인증은 어떻게?
- 인증 및 리뷰 작성시 포인트 지급..⇒ 할인 쿠폰으로 변경

### 실시간 주차 현황?(남은 주차 칸 수) 조회

- 시뮬레이션을 이용하여 구현
    
    → 주차칸수를 리스트로 받아 API 서버 구현 ( Flask 라이브러리)
    

# 2️⃣ 저학년 아이들을 위한 아이 안전 등교길

저학년 아이를 둔 부모를 위한 어플

갑작스런 사고는 피할 수 없지만 예방은 할 수 있다

기존 어플

ex) 가족 위치 추적 

→ 자녀의 이동 경로를 실시간으로 추적

→ 긴급 상황 시 알림

## 기능

### 루트 기록

- 방법은 2가지
    - 1. GPS 기반 실시간 경로 기록
    - 아이의 기본 경로 미리 설정

### 사고/이슈 데이터 연동

- 공공데이터 있음,,
    - 스쿨존 사고, 어린이 관련 범죄, 기타 위험 요소 등등의 데이터 연동
- 위에 데이터를 기반으로 지도에 오버레이 및 알림 기능

### 위험도 분석

- 위험도 평가
    - 위험 요소의 이력, 발생 빈도를 고려하여 다르게 표기
- 아이의 경로에 위험 구역이 포함되어 있거나, 실시간으로 사고 발생시 알림 전송
- 위험도가 높을 경우 다른 경로 추천 → 부모가 설정 가능
    - 경로가 바뀔경우 예상 소요 시간, 거리, 위험도 측정

### 개인화

- 아이의 학교, 학원, 주거 지역을 미리 등록하여 필터링
- 알림에 대한 민감도 (위험도 기준 ⇒ 교통 사고 ~~ 자잘한 접촉 사고)
- 일정 기간마다 아이의 이동 경로, 소요시간, 발생 사고 이슈 등등의 데이터를 통계내어 개선방향  및 주의 지점 제시
- 실시간 SOS 요청

### 커뮤니티

- 이슈가 생길 경우 공유할 수 있는 커뮤니티(해당 지역 기반 )

# 3️⃣ 나 자연으로 돌아갈래
# 개요

농사에 필요한 정보를 한 곳에 담다

# 기능

- **농지 임대**
- **각 시/군 농기계 대여 연결**
    - 각 지역 별 농업기술센터
        - 서울 -
            - 서울 도시 농업 - [텃밭 분양](https://cityfarmer.seoul.go.kr/newInfo/www/list.do;jsessionid=D856E7EF76B8DFCACDA306F008614984?key=2306072807882)
        - 전라도 - ex)
            - 나주 - https://www.naju.go.kr/atec
                    - https://naju.amlend.kr/ 
                
- **지역별 농작물 데이터**
    - 지역을 입력할 경우 난이도에 따라 작물 추천
    - 파종/수확 시기 데이터 제공

### 이벤트 안내

- 국내 농업 관련 박람회 또는 축제에 대한 월 별 안내
    - 농업 기술 박람회 - https://www.agtechexpo.kr/main
    - 대한민국 농업 박람회 - https://agriexpokorea.com/2024/main/

### 수익 계산

- 내가 재배한 작물을 입력(ex 감자 -1,000kg)하면 대략적인 수익 계산
    - https://www.kamis.or.kr/customer/reference/openapi_list.do

### 커뮤니티

- 서로에게 농업 기술적인 부분에 대해 의견을 물을 수 있도록 함
- 상품으로써 가치가 떨어져서 판매하진 못하지만 먹을 수 있을 때 주변 사람들에게

### AI 진단

- 병충해를 사진으로 찍었을 때 어떤 건지 분석
    - 유형별병해충- https://www.nongsaro.go.kr/portal/ps/pss/pssa/hlsctSearchLst.ps?menuId=PS00403
        
    - 해결 방안 제시
    - 주변 농약사 알려주기

### 지원 사업 추천
- 나라에서 귀농관련 지원 사업이 많기 때문에 사용자에게 맞춰 추천

## 부가적 기능

- 농작물 소비 트렌드 분석  후 제공

# 관련 홈페이지

**농업 관련 사이트**

[그린대로- 귀농귀촌 플랫폼](https://www.greendaero.go.kr/)

- 데이터 기반 귀농, 지역 품목 안내 서비스

[똑똑 청년 농부- 청년 농업 창업](https://www.rda.go.kr/young/index.do)

⇒  귀농을 할 수 있게 정책적으로 도움을 주는 사이트

- 청년농부 창업솔루션

**각 지역별 농업기술센터**

- 서울 -
    - 서울 도시 농업 - [텃밭 분양](https://cityfarmer.seoul.go.kr/newInfo/www/list.do;jsessionid=D856E7EF76B8DFCACDA306F008614984?key=2306072807882)
- 전라도 -
    - 나주 - https://www.naju.go.kr/atec
           , https://naju.amlend.kr/ 
        

https://www.kamis.or.kr/customer/info/retail/period.do

</div>
</details>

<details>
<summary>Three.js</summary>
<div markdown="2">

# 렌더링 파이프라인 최적화

- 동시 스케줄링(Concurrent Scheduling):
    
    : 동시 스케줄링은 렌더링 작업을 여러 부분으로 분할하고 우선 순위를 정하여 렌더링 작업을 효율적으로 관리하는 기술
    
    ## 1. startTransition 함수
    
    : React 18에서 추가된 함수로, 동시 스케줄링을 활용하는 방법 중 하나
    
    렌더링 작업을 지연시실 수 있으며, 사용자 경험을 향상시킬 수 있음
    
    - 이점
        - 화면 갱신을 차단하지 않고 백그라운드에서 작업을 수행할 수 있음
        - 더 나은 사용자 경험을 제공하기 위해 우선순위를 조절할 수 있음
    
    ```jsx
    **import { startTransition } from 'react';
    
    function MyComponent() {
      const [data, setData] = useState(null);
    
      const fetchData = async () => {
        await startTransition(() => {
          setData(fetchDataFromAPI()); // 데이터 가져오기
        });
      }
    
      return (
        <div>
          <button onClick={fetchData}>데이터 가져오기</button>
          {data && <DataDisplay data={data} />}
        </div>
      );
    }**
    ```
    
    ⇒  fetchData함수 내에서 startTransition을 사용하여 데이터를 가져오는 작업을 백그라운드에서 처리

    ---

# Three.js 시작하기

※ 리액트 프로젝트 생성을 한 후 

### Three.js 패키지 설치

```jsx
npm install three @react-three/fiber @react-three/drei
```

- react-three-fiber: three.js를 리액트 문법에 맞게 사용할 수 있도록 도와줌
- react-three/drei: react-three-fiber 하는 일을 좀 더 도와줌

### 기본 구조

- Three.js는 기본적으로 html canvas 태그 안에서 렌더링
```jsx
import { Canvas } from "@react-three/fiber";

function App() {

  return (
    <Canvas>
        <mesh position={[2,2,2]}>
          <boxGeometry attach="geometry" args={[3,3,3]}/>
          <meshLambertMaterial attach="material" color="orange" />
        </mesh>
      </Canvas>
      )
}

export default App;
```

관리자 권한으로 터미널을 켜 glTF파일이 있는 경로에 들어가
```jsx
npx gltfjsx 파일명.gltf
```
※오류 발생시
```jsx
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Get-ExecutionPolicy -Scope CurrentUser
npx gltfjsx three.gltf
```
- Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    
    : **PowerShell  실행 정책 변경** ⇒현재 사용자에 대해 로컬에서 생성된 스크립트는 실행할 수 있도록 하며, 인터넷에서 다운로드한 스크립트는 서명되어 있어야 실행할 수 있도록 설정
    
- Get-ExecutionPolicy -Scope CurrentUser
    
    : **변경 확인 ⇒** 정책이 성공적으로 변경되었는지 확인하는 명령어

### ❗발생 오류❗
WebGL 컨텍스트 손실 (Context Lost)
- 해결 방법
    - 1️⃣ GPU 리소스 및 메모리 사용량 확인
    - 2️⃣ 중복된 리소스 로딩 방지
    - 3️⃣ 브라우저 및 GPU 드라이버 업데이트
    - 4️⃣ Canvas 컨텍스트 관리

=> 결론: 방법을 아직 못 찾았다..
</div>
</details>


<details>
<summary>Typescript</summary>
<div markdown="3">
## types/node 설치

```jsx
npm i @types/node
```

Node.js 내장 기능들의 타입 정보를 담고 있는 @types/node 패키지 설치

💡패키지 설치이유

타입스크립트는 코드를 실행하기 전에 타입을 올바르게 사용했는지 검사하는 ‘타입 검사’ 과정을 거침. 이 검사 과정에서 타입이 선언되지 않은 코드를 만나게 되면 타입 스크립트는 타입이 올바르게 사용 되지 않았다고 생각해 오류 발생

## 타입스크립트 컴파일러 설치

```jsx
npm i -g typescript
```

-g

⇒ ‘-g’ 옵션을 이용할 경우 전역으로 설치

pc에 설치된 프로그램처럼 (Node.js) 터미널에 패키지 이름을 호출해 사용 가능

## typescript 컴파일러 옵션

### include

: 특정 폴더 내에 있는 파일을 동시에 컴파일 할 수 있음

```jsx
ex)
{
"include" :["src"]
}

---------
//터미널
>> tsc
```

⇒ src 경로 안에 있는 파일을 동시에 컴파일 해라

기존의 컴파일 할 때 터미널에 **“tsc/파일이름”**을 작성하게 되면 폴더 내에  컴파일된 js 파일이 생성

### target

: 타입 스크립트 코드를 컴파일해서 만들어지는 자바 스크립트 코드의 버전을 설정하는 옵션

```jsx
ex)
{
	"compilerOptions": {
		"target": "ES5"
	},
	"include": ["src"]
}
```

⇒ 컴파일 결과 생성되는 자바스크립트 코드 버전이 ES5

- compilerOptions : ts → js로 변환하는 과정이나 타입검사 등 상세한 옵션 설정할 때 사용

```jsx
"target" : "ESNext"
```

- ESNext: 자바스크립트 최신 버전
</div>
</details>

