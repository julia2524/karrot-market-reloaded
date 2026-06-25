import z from "zod";

export const postFormSchema = z.object({
  title: z
    .string("제목은 필수입니다.")
    .min(3, "최소 3자 이상 적어주세요.")
    .max(20, "제목은 3~20자 사이로 작성해주세요."),
  description: z
    .string("상세설명은 필수입니다.")
    .min(10, "최소 10자 이상 적어주세요."),
});
export type PostFormType = z.infer<typeof postFormSchema>;
