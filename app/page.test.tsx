import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '@/app/page'
import axios, { AxiosRequestConfig } from 'axios'

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Page', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url: string, _?: AxiosRequestConfig<unknown>): Promise<unknown> => {
      let response: unknown = { data: 'default' }
      if (url === '/api/getCategories') response = { data: ['Finance'] }
      if (url === '/api/getLogs') response = { data: JSON.stringify({ "body": { "category": "Finance", "message": "test" }, "date": "Wed, 05 Jul 2023 20:03:06 GMT", "SMS": [{ "id": 11 }] }) }
      return { data: response } as unknown as Promise<unknown>
    })

    mockedAxios.post.mockReturnValue({ status: true } as unknown as Promise<unknown>)
  })

  it('Render form', async () => {
    render(<Page />)

    await waitFor(() => screen.findByText('Finance'));

    expect(screen.findAllByText('Finance')).resolves.toHaveLength(1)
  })

  it('Render logs', async () => {
    const component = render(<Page />)

    await waitFor(() => screen.findByText('Finance'));

    expect(component.container.querySelector('pre')?.innerHTML).toMatch(/Finance/)
  })

  it('Send logs', async () => {
    render(<Page />)

    await waitFor(() => screen.findByText('Finance'));

    fireEvent.select(screen.getByRole('combobox'), { target: { value: 'Finance' } })
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })

    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Finance' }).selected).toBe(true)
    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toEqual('Finance')
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toEqual('test')
  })

})