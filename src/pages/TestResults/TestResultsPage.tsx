import { Controller } from 'react-hook-form'
import { TestResultCard } from '@/components/TestResultCard'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import { useTestResultsPage } from './hooks/useTestResultsPage'
import styles from './TestResultsPage.module.css'

export function TestResultsPage() {
  const { form, modal, handlers, queries } = useTestResultsPage()
  const testResults = queries.testResults.data?.data
  const options = queries.options.data?.data

  return (
    <>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new test result</Typography>
        <Modal isOpen={modal.isOpen} setIsOpen={modal.setIsOpen}>
          <Modal.Trigger>
            <Button className={styles.open} variant="ghost">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            {!testResults?.length && <Typography>No records found.</Typography>}
            {testResults?.map((testResult, i) =>
              <TestResultCard key={testResult.pcbName} testResult={testResult} i={i} onDelete={handlers.onDelete} />,
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
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field {...fieldState}>
                <Datepicker {...field} />
              </Form.Field>
            )}
          />
        </Form.Row>
        <Form.Row>
          <Controller
            name="firstTry"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>First Try</Form.Label>
                <Input {...field} placeholder="123..." type="number" />
                <Form.Error>{fieldState.error?.message}</Form.Error>
              </Form.Field>
            )}
          />
          <Controller
            name="failed"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>Failed</Form.Label>
                <Input {...field} placeholder="456..." type="number" />
                <Form.Error>{fieldState.error?.message}</Form.Error>
              </Form.Field>
            )}
          />
          <Controller
            name="total"
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>Total</Form.Label>
                <Input {...field} placeholder="789..." type="number" />
                <Form.Error>{fieldState.error?.message}</Form.Error>
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
