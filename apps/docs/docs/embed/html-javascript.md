---
sidebar_position: 4
---

# HTML & Javascript

## Standard

You can get the standard HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your typebot.

There, you can change the container dimensions. Here is a code example:

```html
<script src="https://unpkg.com/typebot-js@2.2"></script>
<div id="typebot-container" style="width: 100%; height: 600px;"></div>
<script>
  Typebot.initContainer('typebot-container', {
    url: 'https://viewer.typebot.io/my-typebot',
  })
</script>
```

This code is creating a container with a 100% width (will match parent width) and 600px height.

## Popup

You can get the popup HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your bot.

Here is an example:

```html
<script src="https://unpkg.com/typebot-js@2.2"></script>
<script>
  var typebotCommands = Typebot.initPopup({
    url: 'https://viewer.typebot.io/my-typebot',
    delay: 3000,
  })
</script>
```

This code will automatically trigger the popup window after 3 seconds.

### Open or Close a popup

You can use these commands:

```js
Typebot.getPopupActions().open()
```

```js
Typebot.getPopupActions().close()
```

You can bind these commands on a button element, for example:

```html
<button onclick="Typebot.getPopupActions().open()">Open the popup</button>
```

## Bubble

You can get the bubble HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your typebot.

Here is an example:

```html
<script src="https://unpkg.com/typebot-js@2.2"></script>
<script>
  var typebotCommands = Typebot.initPopup({
    url: 'https://viewer.typebot.io/my-typebot',
    delay: 3000,
  })
</script>
```

This code will automatically trigger the popup window after 3 seconds.

### Open or close the proactive message

You can use this command:

```js
Typebot.getBubbleActions().openProactiveMessage()
```

You can bind this command on a button element, for example:

```html
<button onclick="Typebot.getBubbleActions().openProactiveMessage()">
  Open proactive message
</button>
```

### Open or close the typebot

You can use these commands:

```js
Typebot.getBubbleActions().open()
```

```js
Typebot.getBubbleActions().close()
```

You can bind these commands on a button element, for example:

```html
<button onclick="Typebot.getBubbleActions().open()">Open the chat</button>
```

## Additional configuration

You can add hidden variable values in your embed code by adding the `hiddenVariables` option. Here is an example:

```js
Typebot.initContainer('typebot-container', {
  url: 'https://viewer.typebot.io/my-typebot',
  hiddenVariables: {
    'Current URL': window.location.href,
    'User name': 'John Doe',
  },
})
```

It will populate the `Current URL` variable with the parent URL and the `User name` variable with "John Doe".
