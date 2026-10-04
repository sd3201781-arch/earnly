# Earnly

A React Native / Expo mobile app for finding **freelance, micro-task and affiliate** earning opportunities — browse gigs, track your balance, and learn how to grow a digital income.

> 📦 This code was originally pasted into an issue on another repo. It has been rescued, cleaned up, and given a proper home here.

---

## ✨ Features

- 🏠 **Home** — balance card, level/streak stats, and recommended opportunities
- 🔎 **Explore** — search and filter opportunities by type
- 📚 **Learn** — beginner guides and resources
- 👤 **Profile** — identity, skills, payment and security settings
- 💸 **Opportunity detail** — earnings breakdown and accept flow

## 🛠️ Tech

- **React Native** with **Expo**
- **JavaScript (JSX)**
- `@expo/vector-icons` (Ionicons)

## 🚀 Getting started

```bash
# 1. create a fresh Expo app (if you don't have one)
npx create-expo-app Earnly
cd Earnly

# 2. replace the generated App.js with the one in this repo
#    (copy App.js from here into your project root)

# 3. start the dev server
npx expo start
```

Then scan the QR code with **Expo Go**, or press `a` to open an Android emulator.

## 📁 Project structure

```
.
├── App.js       # the entire app (UI + logic)
└── README.md    # this file
```

## 🔐 Security note

⚠️ **Never place payment secret keys directly inside the mobile app.** Any Stripe/PayPal secret keys must live on a backend server, never in client code. The app should only ever hold publishable keys.

## 📜 License

License to be added.
