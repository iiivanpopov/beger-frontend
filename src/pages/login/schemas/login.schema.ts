import * as v from 'valibot'
import { fullNameValidator, userNameValidator } from '@/shared/utils/validators'

export const loginSchema = v.object({
  userName: userNameValidator,
  password: fullNameValidator,
})

export type LoginFormData = v.InferOutput<typeof loginSchema>
