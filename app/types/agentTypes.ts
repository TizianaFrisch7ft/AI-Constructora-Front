// src/types/agentTypes.ts

export interface Entity {
  type: string
  name?: string
  value?: string
  rut?: string
  surname?: string
  id?: string
  email?: string
}

export interface Recipient {
  name: string
  email: string
}

export interface BotContent {
  answer: string
  entities: Entity[]
  offerReminder?: boolean
  reminderRecipients?: Recipient[]
  rfqId?: string
  status?: string
}
