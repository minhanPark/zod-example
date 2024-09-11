# hookform - zod

## 시작하기

```bash
# 프로젝트 클론 후
npm install
npm run dev
```

---------------------또는----------------------

```bash
# 프로젝트 생성 후
npm i zod @hookform/resolvers react-hook-form
```

## zod를 통해서 validation하기

### 스키마(받아야 하는 데이터의 구조) 정의

```ts
const schema = z.object({
  /** 이름은 필수값 */
  name: z.string().min(1, { message: "name은 필수값입니다." }),
  /** 닉네임은 옵션 */
  nickname: z.string(),
  email: z.string().email({ message: "email 형식이 아닙니다." }),
  /** 셀렉트 박스 값 */
  bankName: z.enum(["", "신한", "국민", "우리"], {
    message: "은행을 올바르게 선택해주세요.",
  }),
});
```

> 필수값을 지정할 떈 min 활용  
> 셀렉트 박스의 경우 enum 활용

### 스키마로 부터 폼 타입 생성

```ts
type Schema = z.infer<typeof schema>;
//아래와 같은 타입이 생성됨
// type Schema = {
//     name: string;
//     nickname: string;
//     email: string;
//     bankName: "" | "신한" | "국민" | "우리";
// }
```

### react-hook-form과 연결

```tsx
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Basic() {
  const formMethods = useForm<Schema>({
    //Schema 타입을 넣어줌
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      bankName: "",
    },
    resolver: zodResolver(schema), //resolver로 schema 전달
  });
  /**validation이 다 통과되었을 때 */
  const onValid: SubmitHandler<Schema> = (data) => {
    console.log("success", data);
  };

  /**validation에서 실패 */
  const onError: SubmitErrorHandler<Schema> = (data) => {
    console.log("error", data);
  };

  return <form onSubmit={formMethods.handleSubmit(onValid, onError)}></form>;
}
```
