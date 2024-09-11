import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// coerce, refine(password), useFieldArray,
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

/**schema를 통해서 타입 만들기 */
type Schema = z.infer<typeof schema>;

export function Basic() {
  const formMethods = useForm<Schema>({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      bankName: "",
    },
    resolver: zodResolver(schema),
  });

  const onValid: SubmitHandler<Schema> = (data) => {
    console.log("success", data);
  };

  const onError: SubmitErrorHandler<Schema> = (data) => {
    console.log("error", data);
  };

  return (
    <Card key="basic">
      <CardHeader>
        <CardTitle>기본</CardTitle>
        <CardDescription>문자, email, 셀렉트, 필수값</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={formMethods.handleSubmit(onValid, onError)}>
          <Label>이름(필수)</Label>
          <Input {...formMethods.register("name")} />
          <Label>닉네임(선택)</Label>
          <Input {...formMethods.register("nickname")} />
          <Label>이메일(email validation이라 필수)</Label>
          <Input {...formMethods.register("email")} />
          <Label>은행</Label>
          <select
            {...formMethods.register("bankName")}
            className="block border rounded-md w-full p-2"
          >
            <option value="">선택</option>
            <option value="신한">신한</option>
            <option value="국민">국민</option>
            <option value="우리">우리</option>
            <option value="에러 나는 은행">에러 나는 은행 </option>
          </select>
          <Button className="mt-10 w-full">제출</Button>
        </form>
      </CardContent>
    </Card>
  );
}
