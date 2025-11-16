/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.0.0).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '223d1276781e'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !event.data) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(clientId, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(clientId, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(clientId, {
        type: 'MOCKING_ENABLED',
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event

  // Bypass service worker for non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Bypass service worker for non-HTTP(S) requests
  const url = new URL(request.url)
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Bypass service worker for the service worker itself
  if (url.pathname === '/mockServiceWorker.js') {
    return
  }

  event.respondWith(
    handleRequest(event).catch((error) => {
      const { request } = event
      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error,
      )
    }),
  )
})

async function handleRequest(event) {
  const { request } = event
  const client = await event.target.clients.get(event.clientId)

  if (!client) {
    return getOriginalResponse(request)
  }

  const clientMessage = await sendMessageToClient(client, {
    type: 'REQUEST',
    payload: {
      id: requestId(),
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      cache: request.cache,
      mode: request.mode,
      credentials: request.credentials,
      destination: request.destination,
      integrity: request.integrity,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      body: await request.text(),
      bodyUsed: request.bodyUsed,
      keepalive: request.keepalive,
    },
  })

  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data)
    }

    case 'MOCK_NOT_FOUND': {
      return getOriginalResponse(request)
    }
  }

  return getOriginalResponse(request)
}

function getOriginalResponse(request) {
  return fetch(request)
}

function requestId() {
  return Math.random().toString(36).substring(2, 15)
}

function sendMessageToClient(client, message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(new Error(event.data.error))
      }

      resolve(event.data)
    }

    client.postMessage(
      message,
      [channel.port2],
    )
  })
}

function sendToClient(clientId, message) {
  return new Promise((resolve, reject) => {
    self.clients.get(clientId).then((client) => {
      if (!client) {
        return reject(new Error(`Client ${clientId} not found`))
      }

      const channel = new MessageChannel()

      channel.port1.onmessage = (event) => {
        if (event.data && event.data.error) {
          return reject(new Error(event.data.error))
        }

        resolve(event.data)
      }

      client.postMessage(
        message,
        [channel.port2],
      )
    })
  })
}

function respondWithMock(response) {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

