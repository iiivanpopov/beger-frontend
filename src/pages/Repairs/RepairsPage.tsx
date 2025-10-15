import { valibotResolver } from '@hookform/resolvers/valibot'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as v from 'valibot'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import styles from './RepairsPage.module.css'

const createRepairSchema = v.object({
  pcbName: v.pipe(v.string(), v.nonEmpty('* Required')),
  date: v.date(),
  firstTry: v.pipe(v.string(), v.nonEmpty('* Required')),
  failed: v.pipe(v.string(), v.nonEmpty('* Required')),
  total: v.pipe(v.string(), v.nonEmpty('* Required')),
})

type CreateRepairData = v.InferOutput<typeof createRepairSchema>

export function RepairsPage() {
  const [isOpen, setIsOpen] = useState(false)

  const { control, handleSubmit } = useForm<CreateRepairData>({
    defaultValues: {
      pcbName: '',
      date: new Date(),
      failed: '',
      firstTry: '',
      total: '',
    },
    resolver: valibotResolver(createRepairSchema),
  })

  const onSubmit = handleSubmit((_data) => {
    // console.log(data)
  })

  return (
    <>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new record</Typography>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <Modal.Trigger asChild>
            <Button className={styles.open} variant="underlined">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            Last records
          </Modal.Content>
        </Modal>
      </div>
      <Form onSubmit={onSubmit}>
        <div className={styles.row}>
          <Controller
            name="pcbName"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState}>
                <Autocomplete {...field}>
                  <Autocomplete.Trigger placeholder="PCB name" />
                  <Autocomplete.Items>
                    <Autocomplete.Item value="1">PCB 1</Autocomplete.Item>
                    <Autocomplete.Item value="2">PCB 2</Autocomplete.Item>
                    <Autocomplete.Item value="3">PCB 3</Autocomplete.Item>
                  </Autocomplete.Items>
                </Autocomplete>
              </Form.Field>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState}>
                <Datepicker {...field} />
              </Form.Field>
            )}
          />
        </div>
        <div className={styles.row}>
          <Controller
            name="firstTry"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="First Try">
                <Input {...field} placeholder="First Try" />
              </Form.Field>
            )}
          />
          <Controller
            name="failed"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="Failed">
                <Input {...field} placeholder="Failed" />
              </Form.Field>
            )}
          />
          <Controller
            name="total"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState} label="Total">
                <Input {...field} placeholder="Total" />
              </Form.Field>
            )}
          />
        </div>
        <Button type="submit" size="large" className={styles.submit}>Submit</Button>
      </Form>
    </>
  )
}
