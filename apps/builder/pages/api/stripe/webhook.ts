import { NextApiRequest, NextApiResponse } from 'next'
import { methodNotAllowed } from 'utils/api'
import Stripe from 'stripe'
import Cors from 'micro-cors'
import { buffer } from 'micro'
import prisma from 'libs/prisma'
import { withSentry } from '@sentry/nextjs'
import { Plan } from 'db'

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET)
  throw new Error('STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET missing')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    if (!sig) return res.status(400).send(`stripe-signature is missing`)
    try {
      const event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig.toString(),
        webhookSecret
      )
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session
          const { workspaceId, plan, additionalChats, additionalStorage } =
            session.metadata as unknown as {
              plan: 'STARTER' | 'PRO'
              additionalChats: string
              additionalStorage: string
              workspaceId: string
            }

          if (!workspaceId || !plan || !additionalChats || !additionalStorage)
            return res
              .status(500)
              .send({ message: `Couldn't retrieve valid metadata` })
          await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
              plan: plan,
              stripeId: session.customer as string,
              additionalChatsIndex: parseInt(additionalChats),
              additionalStorageIndex: parseInt(additionalStorage),
              chatsLimitFirstEmailSentAt: null,
              chatsLimitSecondEmailSentAt: null,
              storageLimitFirstEmailSentAt: null,
              storageLimitSecondEmailSentAt: null,
            },
          })
          return res.status(200).send({ message: 'workspace upgraded in DB' })
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription
          await prisma.workspace.update({
            where: {
              stripeId: subscription.customer as string,
            },
            data: {
              plan: Plan.FREE,
              additionalChatsIndex: 0,
              additionalStorageIndex: 0,
              chatsLimitFirstEmailSentAt: null,
              chatsLimitSecondEmailSentAt: null,
              storageLimitFirstEmailSentAt: null,
              storageLimitSecondEmailSentAt: null,
            },
          })
          return res.send({ message: 'workspace downgraded in DB' })
        }
        default: {
          return res.status(304).send({ message: 'event not handled' })
        }
      }
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        console.error(err)
        return res.status(400).send(`Webhook Error: ${err.message}`)
      }
      return res.status(500).send(`Error occured: ${err}`)
    }
  }
  return methodNotAllowed(res)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSentry(cors(webhookHandler as any))
