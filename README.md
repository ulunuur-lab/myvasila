# 💌 Love Landing Page — Setup & Deployment Guide

Your proposal page is ready! Here's how to set up the **silent read receipt** and **deploy** it so she can open it from a link.

---

## 🔔 Step 1: Set Up Notifications (Read Receipt)

When she opens the page, clicks "Yes", or presses the seal button — you'll get notified **silently**. No permissions pop up on her phone. Pick ONE method:

---

### Option A: Webhook.site (Easiest — 30 seconds)

1. Go to **[https://webhook.site](https://webhook.site)**
2. You'll see a **unique URL** at the top — copy it
3. Open `index.html` and find this line near the bottom:
   ```js
   const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
   ```
4. Paste your URL:
   ```js
   const WEBHOOK_URL = 'https://webhook.site/your-unique-id';
   ```
5. **Keep the webhook.site tab open** — notifications appear there in real time!

**Events you'll see:**
| Event | Meaning |
|---|---|
| 📬 She opened the page! | She clicked the link |
| 👀 She scrolled to the proposal! | She read everything |
| 😏 She tried to press No (attempt #N) | She tried to say no lol |
| 💍 SHE SAID YES!!! | 🎉🎉🎉 |
| 💋 She sealed the promise | She pressed the final button — confirmed read |

---

### Option B: Telegram Bot (Best — you get notifications on your phone)

1. Open Telegram, search for **@BotFather**
2. Send `/newbot`, follow the steps, get your **bot token**
3. Send any message to your new bot
4. Get your **chat ID**:
   - Open: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   - Find `"chat":{"id": 123456789}` — that number is your chat ID
5. In `index.html`, fill in:
   ```js
   const TELEGRAM_BOT_TOKEN = 'your-bot-token';
   const TELEGRAM_CHAT_ID   = 'your-chat-id';
   ```
6. Now every event sends you a **Telegram message** instantly! 📱

---

## 🚀 Step 2: Deploy It (Get a Link)

She needs a URL to open. Here are the easiest free options:

### Option 1: Netlify Drop (Fastest — 10 seconds)

1. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop the `love-landing-page` folder
3. Done! You get a URL like `https://random-name.netlify.app`
4. *(Optional)* Sign up free to set a custom name

### Option 2: Vercel (Slightly nicer URLs)

1. Install: `npm i -g vercel`
2. Run: `vercel` in the `love-landing-page` folder
3. Follow the prompts — get a URL

### Option 3: GitHub Pages (If you have GitHub)

1. Create a new repo, push `index.html`
2. Go to Settings → Pages → Deploy from main branch
3. Your URL: `https://yourusername.github.io/repo-name`

### Option 4: Custom Domain (Most impressive)

Buy a cheap domain (e.g., her name or an inside joke) on **Namecheap** (~$2-5), point it to Netlify/Vercel.

---

## 🧪 Step 3: Test It

1. Open `index.html` in your browser locally first
2. Check that webhook.site or Telegram receives the notifications
3. Test on your phone to make sure it looks good on mobile
4. Deploy → send her the link!

---

## 📁 Files

```
love-landing-page/
└── index.html    ← Everything is in this single file
```

No build step. No dependencies. Just one file — drag, drop, done.

---

## 💡 Ideas to Get Her the Link

Since you can't text her directly:
- **Email** it if you know her address
- Ask a **mutual friend** to send it
- **QR Code** — generate one at [qr.io](https://qr.io) and leave it somewhere she'll find it
- **Google Calendar invite** with the link in the description
- **Instagram/social media** story mention
- Print it on a **note/card** and have someone deliver it

---

Good luck king 👑💍
