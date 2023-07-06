import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { Users } from '@/databases/users'

interface IBodyRequest {
  category: string;
  message: string;
}

/**
 * Endpoint to save and can send notification to the users' channels
 * @param request param to get the body of requests
 * @returns {status} return a status of process  
 */
export async function POST(request: Request) {
  const body: IBodyRequest = await request.json()
  const date = new Date().toUTCString()
  const newLogNotification: { [key: string]: unknown; } = { body, date }
  
  const getUsers = Users.filter(user => user.subscribed.some(item => item === body.category))
  getUsers.forEach(({id, channels}) => {
    channels.forEach((channel: string) => {
      //save id of users that send message by channel
      newLogNotification[channel] = [...(newLogNotification?.[channel] as [] || []), { id } ]
    })
  })

  try {
    const route = path.resolve( process.cwd(), 'databases/logs.json')
    console.log({route, __dirname })
    const prevLogNotification = readFileSync(route, { encoding: 'utf8', flag: 'r' });
    const parseLogData = JSON.parse(prevLogNotification || '[]')
    writeFileSync(route, JSON.stringify([...parseLogData, newLogNotification], null, 2));
  } catch (error) {
    console.error({ error })
  }

  return NextResponse.json({ status: true })
}