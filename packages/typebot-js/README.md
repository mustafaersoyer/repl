# Typebot JS library

Frontend library to embed typebots from [Typebot](https://www.typebot.io/).

## Installation

To install, simply run:

```bash
npm install autorepl-js
```

## Usage

It exposes 3 functions:

```ts
initContainer()
initPopup()
initBubble()
```

You can configure them directly in the "Share" tab of your bot.

Example:

```ts
import { initContainer } from 'autorepl-js'

const autorepl = initContainer('container-id', {
  publishId: 'my-app.com',
})
```
