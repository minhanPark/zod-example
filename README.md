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

### 자주 쓰는 유형

```ts
// 문자열, 공백으로 넣어도 됨
nickname: z.string()

// 문자열중에 공백 허용 안되는 필수값
name: z.string().min(1, { message: "name은 필수값입니다." })

// 셀렉트 박스랑 같이 쓸 때 enum형태로 특정 value만 받을 수 있음
bankName: z.enum(["", "신한", "국민", "우리"], {
    message: "은행을 올바르게 선택해주세요.",
  })

// react-hook-form의 useFieldArray와 같이 쓸 때 타입 지정방법 및 refine을 통해서 커스텀 validation 추가 가능
companyIndustry: z
      .array(
        z.object({
          value: z.string().trim().min(1, {
            message: "빈칸을 삭제해주시거나 대표자를 입력해주세요.",
          }),
        })
      )
      /** refine을 통해서 커스텀한 validation 추가 가능 */
      .refine((value) => value.length < 3, {
        message: "대표자는 2명까지만 입력가능합니다.",
      }),

// input값은 문자가 들어오지만 숫자를 받아야 할 때 coerce를 통해서 변환 가능
employees: z.coerce.number({ message: "숫자만 입력해주세요." }),

// 전체 객체에 refine을 붙여주면 data에 전체 값을 받아서 validation 가능
const schema = z
    password: z
      .string()
      /**trim으로 공백 삭제 */
      .trim()
      .min(6, { message: "비밀번호는 6자리 이상이어야 합니다." }),
    passwordConfirm: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

```
