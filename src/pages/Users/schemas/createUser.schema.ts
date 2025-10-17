import * as v from 'valibot'
import { fullNameValidator, passwordValidator, userNameValidator } from '@/shared/utils/validators'

export const CreateUserSchema = v.object({
  userName: userNameValidator,
  fullName: fullNameValidator,
  password: passwordValidator,
})

export type CreateUserData = v.InferOutput<typeof CreateUserSchema>
