import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateAppointmentSchema = z.object({
  patientId: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),

  doctorId: z
    .string({
      required_error: "Doctor ID is required",
      invalid_type_error: "Doctor ID must be a string",
    })
    .trim()
    .uuid()
    .transform((value) => (value === "" ? undefined : value)),

  date: z.coerce.date({
    invalid_type_error: "Date must be a valid date"
  }).refine(
    (d) => d.getTime() > Date.now(),
    { message: "Date must be in the future" }
  ),
});

export class CreateAppointmentDto extends createZodDto(CreateAppointmentSchema) {}
