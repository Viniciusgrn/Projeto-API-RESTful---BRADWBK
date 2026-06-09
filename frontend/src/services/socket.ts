import { Client } from '@stomp/stompjs'
import type { IMessage } from '@stomp/stompjs'
// sockjs-client has no bundled types in this project - allow implicit any for it
// (you can install @types/sockjs-client to get types)
import SockJS from 'sockjs-client'

let client: Client | null = null
let currentSubscription: any = null
let notificationHandlers: Array<(n:any)=>void> = []

export function connectSocket(onMessage: (msg: any) => void, onOpen?: ()=>void) {
  if (client && client.active) return client
  client = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL || '/ws'),
    reconnectDelay: 5000,
    debug: (str) => console.log('STOMP: ' + str),
    onConnect: (frame) => {
      console.log('Connected via STOMP', frame)
      // subscribe to user queue by default
      try {
        client!.subscribe('/user/queue/messages', (message: IMessage) => {
          const payload = JSON.parse(message.body)
          onMessage(payload)
        })
        // subscribe to notifications for this user
        try {
          client!.subscribe('/user/queue/notifications', (message: IMessage) => {
            const payload = JSON.parse(message.body)
            notificationHandlers.forEach(h => { try { h(payload) } catch(e){}})
          })
        } catch(e) {
          console.warn('subscribe to user notifications failed', e)
        }
      } catch (e) {
        console.warn('subscribe to user queue failed', e)
      }
      if (onOpen) onOpen()
    },
    onStompError: (frame) => console.error('Broker error: ', frame?.headers?.['message'], frame?.body)
  })
  client.activate()
  return client
}

export function disconnectSocket() {
  if (client) {
    try { client.deactivate() } catch (e) {}
    client = null
  }
}

export function subscribeConversation(conversationId: string, onMsg: (payload:any)=>void) {
  try {
    if (!client || !client.active) return null
    if (currentSubscription) {
      try { currentSubscription.unsubscribe() } catch (e) {}
      currentSubscription = null
    }
    currentSubscription = client.subscribe('/topic/conversation.' + conversationId, (message: IMessage) => {
      const payload = JSON.parse(message.body)
      onMsg(payload)
    })
    return currentSubscription
  } catch (e) {
    console.warn('subscribeConversation failed', e)
    return null
  }
}

export function unsubscribeConversation() {
  try {
    if (currentSubscription) { currentSubscription.unsubscribe(); currentSubscription = null }
  } catch (e) {}
}

export function onNotification(handler: (n:any)=>void) {
  notificationHandlers.push(handler)
  return () => {
    const idx = notificationHandlers.indexOf(handler)
    if (idx >= 0) notificationHandlers.splice(idx, 1)
  }
}
