# ts-utils

반복 사용되는 로직을 안전하고 예측 가능하게 다루기 위한 **TypeScript 유틸리티 라이브러리**

## Installation

```bash
npm install @yeahzee/ts-utils
# or
pnpm add @yeahzee/ts-utils
```

## Usage

### `toNumberStrict`

숫자 또는 숫자형 문자열을 number로 변환
정상적인 숫자 형식이 아닐 경우 NaN을 반환

```ts
toNumberStrict("1,234"); // 1234
toNumberStrict("abc"); // NaN
```

### `comma`

숫자 또는 숫자형 문자열을 한국어 콤마 표기 문자열로 변환
변환할 수 없는 값일 경우 fallback 값을 반환

```ts
comma(1234567); // "1,234,567"
comma("abc", "-"); // "-"
```

### `groupBy`

배열 형태의 객체 데이터를 특정 key 기준으로 그룹화

```ts
groupBy(list, "id");
```

### `keyBy`

배열 데이터를 특정 key 기준의 객체로 변환

```ts
keyBy(list, "id", ["name", "id"]);
```

### `sortBy`

배열을 지정한 key 기준으로 정렬

```ts
sortBy(list, "age", { order: "desc", nulls: "last" });
```

### `debounce`

지정한 시간 내 반복 호출 시 마지막 호출만 실행

```ts
const fn = debounce(() => {}, 300);
```

### `sleep`

Promise 기반 지연 유틸 함수
await와 함께 사용하여 비동기 흐름을 일시 정지

```ts
await sleep(500);
```

## Features

- TypeScript 기반
- 명확한 타입 계약
- 테스트 코드 포함
- npm 배포
