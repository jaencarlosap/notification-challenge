"use client"
import {
  FormEvent,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import styles from './page.module.css'

export default function Home() {
  const [categories, setCategories] = useState<string[]>([])
  const [logs, setLogs] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    axios.post('/api/postSaveLog', Object.fromEntries(data))
  }

  useEffect(() => {
    async function initData() {
      const categoriesData = await axios.get('/api/getCategories')
      const logsData = await axios.get('/api/getLogs')

      setCategories(categoriesData.data.data)
      setLogs(logsData.data.data)
    }

    initData()
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Choose a category of notification</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-field">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="text-input" id="category" name='category' >
              <option value="">Selected</option>
              {categories?.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea id="message" name='message' className="text-input" placeholder="Enter your message" />
          </div>
          <button className="button">Send</button>
        </div>
      </form>

      <div className={styles['container-logs']}>
        <h3>Show logs</h3>
        <div>
          <pre>
            {logs}
          </pre>
        </div>
      </div>

    </main>
  )
}
