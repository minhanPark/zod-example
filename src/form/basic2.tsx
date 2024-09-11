import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  useFieldArray,
} from "react-hook-form";
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
  companyIndustry: z.array(z.object({ value: z.string().min(1) })),
});

/**schema를 통해서 타입 만들기 */
type Schema = z.infer<typeof schema>;

export function Basic2() {
  const formMethods = useForm<Schema>({
    defaultValues: {
      companyIndustry: [],
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
          <Label>회사 업종</Label>
          <div className="">
            <Input />
          </div>
          <Button className="mt-10 w-full">제출</Button>
        </form>
      </CardContent>
    </Card>
  );
}
