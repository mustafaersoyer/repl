import { GitHubIcon } from 'assets/icons'
import { DocIcon } from 'assets/icons/DocIcon'
import { MapIcon } from 'assets/icons/MapIcon'
import { PeopleCircleIcon } from 'assets/icons/PeopleCircleIcon'
import * as React from 'react'

export const links = [
  {
    label: 'Documentation',
    description:
      "Everything you need to know about how to use Typebot's builder",
    href: 'https://docs.autorepl.com',
    icon: <DocIcon />,
  },
  { label: 'Pricing', href: '/pricing' },
]
