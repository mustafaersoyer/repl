---
sidebar_position: 4
---

# HTML & Javascript

## Standard

You can get the standard HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your bot.

There, you can change the container dimensions. Here is a code example:

```html
<script src="https://unpkg.com/autorepl-js@1.0"></script>
<div id="autorepl-container" style="width: 100%; height: 600px;"></div>
<script>
  AutoRepl.initContainer('autorepl-container', {
    url: 'https://bot.autorepl.com/my-typebot',
  })
</script>
```

This code is creating a container with a 100% width (will match parent width) and 600px height.

## Popup

You can get the popup HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your bot.

Here is an example:

```html
<script src="https://unpkg.com/autorepl-js@1.0"></script>
<script>
  var autoreplCommands = AutoRepl.initPopup({
    url: 'https://bot.autorepl.com/my-typebot',
    delay: 3000,
  })
</script>
```

This code will automatically trigger the popup window after 3 seconds.

### Open or Close a popup

You can use these commands:

```js
AutoRepl.getPopupActions().open()
```

```js
AutoRepl.getPopupActions().close()
```

You can bind these commands on a button element, for example:

```html
<button onclick="AutoRepl.getPopupActions().open()">Open the popup</button>
```

## Bubble

You can get the bubble HTML and Javascript code by clicking on the "HTML & Javascript" button in the "Share" tab of your bot.

Here is an example:

```html
<script src="https://unpkg.com/autorepl-js@1.0"></script>
<script>
  var autoreplCommands = AutoRepl.initPopup({
    url: 'https://bot.autorepl.com/my-typebot',
    delay: 3000,
  })
</script>
```

This code will automatically trigger the popup window after 3 seconds.

### Open or close the proactive message

You can use this command:

```js
AutoRepl.getBubbleActions().openProactiveMessage()
```

You can bind this command on a button element, for example:

```html
<button onclick="AutoRepl.getBubbleActions().openProactiveMessage()">
  Open proactive message
</button>
```

### Open or close the bot

You can use these commands:

```js
AutoRepl.getBubbleActions().open()
```

```js
AutoRepl.getBubbleActions().close()
```

You can bind these commands on a button element, for example:

```html
<button onclick="AutoRepl.getBubbleActions().open()">Open the chat</button>
```

## Additional configuration

You can add hidden variable values in your embed code by adding the `hiddenVariables` option. Here is an example:

```js
AutoRepl.initContainer('autorepl-container', {
  url: 'https://bot.autorepl.com/my-typebot',
  hiddenVariables: {
    'Current URL': window.location.href,
    'User name': 'John Doe',
  },
})
```

It will populate the `Current URL` variable with the parent URL and the `User name` variable with "John Doe".
