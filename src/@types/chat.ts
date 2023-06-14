export type Chat = {
  uid: string
  message: string
  createdAt: Date
  updatedAt: Date
}

export type CreateChat = Omit<Chat, "uid" | "createdAt" | "updatedAt">
