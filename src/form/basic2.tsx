import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    /**[{ value: "" }, {value: ""}] 형태로 추가될 때 타입 지정방법 */
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
    /**coerce.number로 들어오는 값에 Number(input) 형태처럼 처리가능하고 더 복잡한 형태는 transform을 사용하면 가능 */
    employees: z.coerce.number({ message: "숫자만 입력해주세요." }),
    /**trim으로 공백 삭제 */
    password: z
      .string()
      .trim()
      .min(6, { message: "비밀번호는 6자리 이상이어야 합니다." }),
    passwordConfirm: z.string().trim(),
  })
  /** 전체 객체에 refine을 걸면 data 모든 곳에 접근 가능한 validation을 만들 수 있음 */
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

/**schema를 통해서 타입 만들기 */
type Schema = z.infer<typeof schema>;

export function Basic2() {
  const formMethods = useForm<Schema>({
    defaultValues: {
      companyIndustry: [{ value: "" }],
      employees: 0,
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "companyIndustry",
  });

  const onValid: SubmitHandler<Schema> = (data) => {
    console.log("success", data);
  };

  const onError: SubmitErrorHandler<Schema> = (data) => {
    console.log("error", data);
  };

  return (
    <Card key="basic2">
      <CardHeader>
        <CardTitle>기본2</CardTitle>
        <CardDescription>useFieldArray</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={formMethods.handleSubmit(onValid, onError)}>
          <Label>대표자</Label>
          <div className="">
            {fields.map((item, index) => (
              <div className="flex gap-2 mb-1.5" key={item.id}>
                <Input
                  className="flex-1"
                  {...formMethods.register(`companyIndustry.${index}.value`)}
                />
                <Button disabled={index === 0} onClick={() => remove(index)}>
                  삭제
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              type="button"
              onClick={() => append({ value: "" })}
            >
              + 대표자 추가
            </Button>
          </div>
          <Label>직원수</Label>
          <Input {...formMethods.register("employees")} />
          <Label>비밀번호</Label>
          <Input type="password" {...formMethods.register("password")} />
          <Label>비밀번호 확인</Label>
          <Input type="password" {...formMethods.register("passwordConfirm")} />
          <Button className="mt-10 w-full">제출</Button>
        </form>
      </CardContent>
    </Card>
  );
}
