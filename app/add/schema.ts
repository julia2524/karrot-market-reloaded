import z from "zod";

export const productFormSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, "사진첨부는 필수입니다."),
  title: z.string("제목은 필수입니다.").min(3, "최소 3자 이상 적어주세요."),
  description: z
    .string("상세설명은 필수입니다.")
    .min(10, "최소 10자 이상 적어주세요."),
  price: z.coerce.number("숫자를 입력해주세요."),
});

export type ProductFormType = z.infer<typeof productFormSchema>;
