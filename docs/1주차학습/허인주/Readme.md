
## 🧩 MSA 서비스 구성

| 서비스명          | 설명                           | 기술 스택           |
|-------------------|--------------------------------|---------------------|
| 회원 서비스      | 회원가입, 로그인, 인증 관리    | Spring Boot + JWT  |
| 뉴스 수집 서비스 | 외부 뉴스 API 수집, 저장       | Spring Boot + Scheduler |
| 추천 서비스      | 사용자 맞춤 뉴스 추천 알고리즘 | Python FastAPI / ML 모델 |
| 피드 서비스      | 사용자별 뉴스 피드 제공        | Spring Boot        |

---

## 📦 Kubernetes 구성

- **네임스페이스**
  - `dev`, `prod` 환경 분리
- **디플로이먼트**
  - 각 서비스별 ReplicaSet 설정 (AutoScaling)
- **서비스**
  - ClusterIP / LoadBalancer 적용
- **Ingress**
  - 도메인 라우팅 처리
- **ConfigMap / Secret**
  - 환경 변수 및 민감 정보 관리
- **Persistent Volume**
  - DB 등 상태 저장이 필요한 서비스 구성

---

## 🚀 CI/CD 파이프라인

1. **GitHub Actions**로 빌드 및 Docker 이미지 Push
2. **ArgoCD**를 통해 k8s 클러스터에 자동 배포
3. Canary / Blue-Green 배포 전략 적용 예정

---

## 📊 모니터링 & 로깅

- **모니터링**: Prometheus + Grafana 대시보드 구성
- **로깅**: Fluentd로 로그 수집 → Elasticsearch 저장 → Kibana 분석

---

## 📝 추가 고려사항
- OAuth2 소셜 로그인 연동 (구글, 카카오 등)
- 추천 모델의 주기적 학습 자동화 (ML Pipeline)
- 뉴스 데이터 크롤링/수집의 트래픽 관리
- 데이터베이스 이중화 및 백업 정책 수립

---

## 🏁 목표
- 안정적이고 확장 가능한 뉴스 추천 서비스 제공
- 실시간 트래픽 대응 및 무중단 배포
- 개인화된 뉴스 추천을 통한 사용자 만족도 향상
