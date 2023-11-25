import * as z from "zod";

const SPayLaterSchema = {
  price: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .min(1, "Product price must be greater than 0.")
    .max(20000, "Product price must be less than RM 20,000."),
  spaylaterPrice: z.coerce
    .number({
      invalid_type_error: "Input must be a number.",
    })
    .min(0, "Must be greater than 0.")
    .max(20000, "Must be less than RM 20,000.")
    .optional(),
  isLimit: z.boolean().default(false),
  oneMonth: z.coerce
    .number({
      invalid_type_error: "Installment must be a number.",
    })
    .optional(),
  threeMonth: z.coerce
    .number({
      invalid_type_error: "Installment must be a number.",
    })
    .min(0, "Installment must be a positive number")
    .optional(),
  sixMonth: z.coerce
    .number({
      invalid_type_error: "Installment must be a number.",
    })
    .min(0, "Installment must be a positive number")
    .optional(),
  twelveMonth: z.coerce
    .number({
      invalid_type_error: "Installment must be a number.",
    })
    .min(0, "Installment must be a positive number")

    .optional(),
};

export const FormSchema = z
  .object(SPayLaterSchema)
  .refine(
    // check if at least one installment is greater than 0
    (value) =>
      value.oneMonth! > 0 ||
      value.threeMonth! > 0 ||
      value.sixMonth! > 0 ||
      value.twelveMonth! > 0,
    {
      message: "Please enter at least one installment.",
      path: ["oneMonth"],
    }
  )
  // .refine(
  //   (value) =>
  //     (value.isLimit === false && value.oneMonth! >= value.price) ||
  //     value.threeMonth! > 0 ||
  //     value.sixMonth! > 0 ||
  //     value.twelveMonth! > 0,
  //   {
  //     message:
  //       "Installment must be greater than or equal to the product price.",
  //     path: ["oneMonth"],
  //   }
  // )
  .refine((value) => value.oneMonth! <= value.price + 0.016 * value.price, {
    message: "Installment should not be more than 1.6 times the product price.",
    path: ["oneMonth"],
  })
  // check if only three month value should not exceed the price
  .refine((value) => value.threeMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["threeMonth"],
  })
  // check if only six month value should not exceed the price
  .refine((value) => value.sixMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["sixMonth"],
  })
  // check if only twelve month value should not exceed the price
  .refine((value) => value.twelveMonth! <= value.price, {
    message: "Installment must not be greater than the product price.",
    path: ["twelveMonth"],
  });
