import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { User } from 'db'
import { isNotDefined } from 'utils'
import { sign } from 'jsonwebtoken'

const FeedbackPage = () => {
  return
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (isNotDefined(session?.user))
    return {
      redirect: {
        permanent: false,
        destination: `/signin?redirectPath=%2Ffeedback`,
      },
    }
  const sleekplanToken = createSSOToken(session?.user as User)
  return {
    redirect: {
      permanent: false,
      destination: `https://feedback.typebot.io?sso=${sleekplanToken}`,
    },
  }
}

const createSSOToken = (user: User) => {
  if (!process.env.SLEEKPLAN_SSO_KEY) return
  const userData = {
    mail: user.email,
    id: user.id,
    name: user.name,
    img: user.image,
  }

  return sign(userData, process.env.SLEEKPLAN_SSO_KEY, { algorithm: 'HS256' })
}

export default FeedbackPage
