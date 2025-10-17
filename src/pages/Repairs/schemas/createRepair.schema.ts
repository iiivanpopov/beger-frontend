import * as v from 'valibot'

export const createRepairSchema = v.object({
  pcbName: v.pipe(v.string(), v.nonEmpty('* Required')),
  defect: v.pipe(v.string(), v.nonEmpty('* Required')),
  note: v.optional(v.string()),
  date: v.date(),
})

export type CreateRepairData = v.InferOutput<typeof createRepairSchema>
