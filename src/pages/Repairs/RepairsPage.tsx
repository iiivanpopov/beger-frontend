import { Controller } from 'react-hook-form'
import { RepairCard } from '@/components/RepairCard'
import { Autocomplete, Button, Datepicker, Form, Modal, Textarea, Typography } from '@/shared/ui'
import { useRepairsPage } from './hooks/useRepairsPage'
import styles from './RepairsPage.module.css'

export function RepairsPage() {
  const { form, modal, handlers, queries } = useRepairsPage()
  const repairs = queries.repairs.data?.data
  const options = queries.options.data?.data

  return (
    <>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new repair</Typography>
        <Modal isOpen={modal.isOpen} setIsOpen={modal.setIsOpen}>
          <Modal.Trigger>
            <Button variant="ghost">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            {!repairs?.length && <Typography>No records found.</Typography>}
            {repairs?.map((repair, i) =>
              <RepairCard key={repair.pcbName} repair={repair} i={i} onDelete={handlers.onDelete} />,
            )}
          </Modal.Content>
        </Modal>
      </div>
      <Form onSubmit={handlers.onSubmit}>
        <Form.Row className={styles.row}>
          <Controller
            name="pcbName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Autocomplete {...field}>
                  <Autocomplete.Trigger placeholder="PCB name" />
                  <Autocomplete.Items>
                    {options?.pcbNames.map(pcb => (
                      <Autocomplete.Item key={pcb} value={pcb}>
                        {pcb}
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.Items>
                </Autocomplete>
                <Form.Error>{fieldState.error?.message}</Form.Error>
              </Form.Field>
            )}
          />
          <Controller
            name="defect"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Autocomplete {...field}>
                  <Autocomplete.Trigger placeholder="Defect" />
                  <Autocomplete.Items>
                    {options?.defects.map(pcb => (
                      <Autocomplete.Item key={pcb} value={pcb}>
                        {pcb}
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.Items>
                </Autocomplete>
                <Form.Error>{fieldState.error?.message}</Form.Error>
              </Form.Field>
            )}
          />
          <Controller
            name="date"
            control={form.control}
            render={({ field }) => (
              <Form.Field>
                <Datepicker {...field} />
              </Form.Field>
            )}
          />
        </Form.Row>
        <Form.Row>
          <Controller
            name="note"
            control={form.control}
            render={({ field }) => (
              <Form.Field>
                <Textarea {...field} placeholder="Optional note" />
              </Form.Field>
            )}
          />
        </Form.Row>
        <Form.Row>
          <Button type="submit">Submit</Button>
        </Form.Row>
      </Form>
    </>
  )
}
