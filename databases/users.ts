import { categories } from "./categories"
import { notificationType } from "./notificationType"

const names = ['pedro','maria','carlos','camila']

export const Users = names.map((name, index) => {
  return {
    id: index + 10,
    name,
    email: `${name}@gmail.com`,
    phone_number: 123123123123 * index,
    subscribed: categories.slice(0,index+1),
    channels: notificationType.slice(index-1, notificationType.length)
  }
})