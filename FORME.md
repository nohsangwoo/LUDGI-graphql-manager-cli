
# npm 로그인
```bash
npm login
```

# 패키지에 포함될 파일 확인 및 패키지 파일 생성
```bash
npm pack
```
# 생성된 ludgi-1.0.0.tgz 파일 확인

# 첫 번째 버전 배포
```bash
npm publish
```

# 이후 업데이트 배포 시 (버전 변경 필요)
```bash
npm version patch # 패치 버전 업 (1.0.0 -> 1.0.1)

또는

npm version minor # 마이너 버전 업 (1.0.0 -> 1.1.0)

또는

npm version major # 메이저 버전 업 (1.0.0 -> 2.0.0)

npm pack

npm publish # 배포
```
