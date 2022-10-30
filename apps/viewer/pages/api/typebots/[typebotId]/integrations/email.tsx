import prisma from 'libs/prisma'
import {
  PublicTypebot,
  ResultValues,
  SendEmailOptions,
  SmtpCredentialsData,
} from 'models'
import { NextApiRequest, NextApiResponse } from 'next'
import { createTransport, getTestMessageUrl } from 'nodemailer'
import { isEmpty, isNotDefined, omit, parseAnswers } from 'utils'
import { methodNotAllowed, initMiddleware, decrypt } from 'utils/api'

import Cors from 'cors'
import { withSentry } from '@sentry/nextjs'
import {
  getLinkedTypebots,
  saveErrorLog,
  saveSuccessLog,
} from 'services/api/utils'
import Mail from 'nodemailer/lib/mailer'
import { DefaultBotNotificationEmail, render } from 'emails'

const cors = initMiddleware(Cors())

const defaultTransportOptions = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
}

const defaultFrom = {
  name: process.env.SMTP_FROM?.split(' <')[0].replace(/"/g, ''),
  email: process.env.SMTP_FROM?.match(/\<(.*)\>/)?.pop(),
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  if (req.method === 'POST') {
    const typebotId = req.query.typebotId as string
    const resultId = req.query.resultId as string | undefined
    const {
      credentialsId,
      recipients,
      body,
      subject,
      cc,
      bcc,
      replyTo,
      isBodyCode,
      isCustomBody,
      resultValues,
      fileUrls,
    } = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as SendEmailOptions & {
      resultValues: ResultValues
      fileUrls?: string
    }
    const { name: replyToName } = parseEmailRecipient(replyTo)

    const { host, port, isTlsEnabled, username, password, from } =
      (await getEmailInfo(credentialsId)) ?? {}
    if (!from)
      return res.status(404).send({ message: "Couldn't find credentials" })

    const transportConfig = {
      host,
      port,
      secure: isTlsEnabled ?? undefined,
      auth: {
        user: username,
        pass: password,
      },
    }

    const emailBody = await getEmailBody({
      body,
      isCustomBody,
      isBodyCode,
      typebotId,
      resultValues,
    })

    if (!emailBody) {
      await saveErrorLog(resultId, 'Email not sent', {
        transportConfig,
        recipients,
        subject,
        cc,
        bcc,
        replyTo,
        emailBody,
      })
      return res.status(404).send({ message: "Couldn't find email body" })
    }
    const transporter = createTransport(transportConfig)
    const email: Mail.Options = {
      from: `"${isEmpty(replyToName) ? from.name : replyToName}" <${
        from.email
      }>`,
      cc,
      bcc,
      to: recipients,
      replyTo,
      subject,
      attachments: fileUrls?.split(', ').map((url) => ({ path: url })),
      ...emailBody,
    }
    try {
      const info = await transporter.sendMail(email)
      await saveSuccessLog(resultId, 'Email successfully sent', {
        transportConfig: {
          ...transportConfig,
          auth: { user: transportConfig.auth.user, pass: '******' },
        },
        email,
      })
      return res.status(200).send({
        message: 'Email sent!',
        info,
        previewUrl: getTestMessageUrl(info),
      })
    } catch (err) {
      await saveErrorLog(resultId, 'Email not sent', {
        transportConfig: {
          ...transportConfig,
          auth: { user: transportConfig.auth.user, pass: '******' },
        },
        email,
        error: err,
      })
      return res.status(500).send({
        message: `Email not sent. Error: ${err}`,
      })
    }
  }
  return methodNotAllowed(res)
}

const getEmailInfo = async (
  credentialsId: string
): Promise<SmtpCredentialsData | undefined> => {
  if (credentialsId === 'default')
    return {
      host: defaultTransportOptions.host,
      port: defaultTransportOptions.port,
      username: defaultTransportOptions.auth.user,
      password: defaultTransportOptions.auth.pass,
      isTlsEnabled: undefined,
      from: defaultFrom,
    }
  const credentials = await prisma.credentials.findUnique({
    where: { id: credentialsId },
  })
  if (!credentials) return
  return decrypt(credentials.data, credentials.iv) as SmtpCredentialsData
}

const getEmailBody = async ({
  body,
  isCustomBody,
  isBodyCode,
  typebotId,
  resultValues,
}: { typebotId: string; resultValues: ResultValues } & Pick<
  SendEmailOptions,
  'isCustomBody' | 'isBodyCode' | 'body'
>): Promise<{ html?: string; text?: string } | undefined> => {
  if (isCustomBody || (isNotDefined(isCustomBody) && !isEmpty(body)))
    return {
      html: isBodyCode ? body : undefined,
      text: !isBodyCode ? body : undefined,
    }
  const typebot = (await prisma.publicTypebot.findUnique({
    where: { typebotId },
  })) as unknown as PublicTypebot
  if (!typebot) return
  const linkedTypebots = await getLinkedTypebots(typebot)
  const answers = parseAnswers({
    groups: [...typebot.groups, ...linkedTypebots.flatMap((t) => t.groups)],
    variables: [
      ...typebot.variables,
      ...linkedTypebots.flatMap((t) => t.variables),
    ],
  })(resultValues)
  return {
    html: render(
      <DefaultBotNotificationEmail
        resultsUrl={`${process.env.NEXTAUTH_URL}/typebots/${typebot.id}/results`}
        answers={omit(answers, 'submittedAt')}
      />
    ).html,
  }
}

const parseEmailRecipient = (
  recipient?: string
): { email?: string; name?: string } => {
  if (!recipient) return {}
  if (recipient.includes('<')) {
    const [name, email] = recipient.split('<')
    return {
      name: name.replace(/>/g, '').trim().replace(/"/g, ''),
      email: email.replace('>', '').trim(),
    }
  }
  return {
    email: recipient,
  }
}

export default withSentry(handler)
