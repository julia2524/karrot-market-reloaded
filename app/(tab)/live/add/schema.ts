import z from "zod";

export const liveFormSchema = z.object({
  title: z
    .string("제목은 필수입니다.")
    .min(3, "최소 3자 이상 적어주세요.")
    .max(20, "제목은 3~20자 사이로 작성해주세요."),
});

export type LiveFormType = z.infer<typeof liveFormSchema>;
