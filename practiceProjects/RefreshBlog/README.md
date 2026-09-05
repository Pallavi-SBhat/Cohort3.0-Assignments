# 🔐 Access Tokens & Refresh Tokens — What I Learned and Why They Matter

*This article is based on my learnings from the Cohort 3.0 course. I'm sharing what I understood about access tokens and refresh tokens — how they work, why we need both, and how they keep our apps secure.*

---

## The Problem — Why Do We Even Need Tokens?

Imagine you log into your favourite app — let's say Instagram. You enter your email and password, and boom, you're in. You can scroll your feed, like posts, check DMs.

But here's the thing that blew my mind when I first learned it: **HTTP is stateless.** That means the server doesn't "remember" you between requests. Every time you scroll, like a post, or open a profile — the server has absolutely no idea who you are.

So without tokens, what would happen?

You'd have to send your **username and password with every single API request.** Every. Single. One.

That's:

* 🐢 **Slow** — the server would verify your credentials against the database every time
* 🔓 **Insecure** — your raw password flying across the internet with every request? One intercepted request and your account is gone
* 😫 **Terrible UX** — imagine re-entering your password every time you refresh a page

**Tokens solve all of this.**

The idea is simple:

> You log in once → the server gives you a token → you send that token instead of your password with every request.

The server can verify the token quickly without hitting the database.

---

## What Are Tokens, Really?

A token is a **digitally signed string** that the server generates after you successfully authenticate.

Most modern apps use something called **JWT — JSON Web Tokens.**

A JWT looks like this:

```text
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.SflKxwRJSMeKKF2QT4fw
```

Looks like gibberish, right?

But it actually has three parts separated by dots:

### 1. Header

Tells us the algorithm used, such as `HS256`.

### 2. Payload

Contains the actual data, such as:

* User ID
* Role
* Expiration time

### 3. Signature

A hash that verifies the token hasn't been tampered with.

The server signs this token with a **secret key**.

When it receives a token back from the client, it can verify whether it's legitimate without necessarily querying the database.

That's the beauty of JWTs.

But here's where it gets interesting.

Modern authentication often uses **two tokens**:

* 🔑 Access Token
* 🔄 Refresh Token

Understanding **why we need both** is one of the most important concepts in authentication.

---

# 🔑 Access Token — Your Temporary ID Card

An **Access Token** is a short-lived credential that you attach to API requests.

It goes in the `Authorization` header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Access Token Properties

| Property      | Details                                |
| ------------- | -------------------------------------- |
| **Lifetime**  | Short — typically 15 minutes to 1 hour |
| **Stored in** | Memory or localStorage (client-side)   |
| **Purpose**   | Authorize API requests                 |
| **Contains**  | User ID, role, expiration time         |

### 🏢 The Visitor Pass Analogy

Think of an access token like a **visitor pass at an office building**.

When you arrive, security checks your ID (login) and gives you a visitor pass.

That pass gets you through every door in the building — but it expires at the end of the day.

If someone steals your visitor pass, they can only use it for a few hours before it becomes useless.

That's exactly why access tokens are **short-lived** — to limit the damage if one gets stolen.

---

# 🔄 Refresh Token — Your Membership Card

A **Refresh Token** is a long-lived credential, but it works very differently.

It **never directly accesses your APIs**.

Instead, its only job is to **get you a new access token** when your old one expires.

### Refresh Token Properties

| Property      | Details                                |
| ------------- | -------------------------------------- |
| **Lifetime**  | Long — typically 7 to 30 days          |
| **Stored in** | HTTP-only secure cookie                |
| **Purpose**   | Get new access tokens without re-login |
| **Contains**  | Token ID, user reference, expiration   |

### 🎢 The Amusement Park Analogy

This analogy really helped it click for me:

* 🎫 **Access Token** = Your **wristband** for rides. Works for a few hours, then you need a new one.
* 🪪 **Refresh Token** = Your **season pass**. You show it at the counter to get a new wristband anytime — without buying a new ticket.
* 🔐 **Login** = Buying the season pass with your ID proof (email + password).

If someone steals your wristband, they can ride for a few hours.

But if they steal your season pass — that's a much bigger problem, which is why it should be stored securely and can be cancelled immediately.

---

# 🔁 The Complete Authentication Flow

Here's how both tokens work together step by step.

## Step 1: User Logs In

```text
User sends email + password
        ↓
Server validates credentials
        ↓
Server generates Access Token (15 min)
        +
Refresh Token (7 days)
        ↓
Server sends both tokens back
```

---

## Step 2: Making API Requests

```text
User sends request + Access Token
        ↓
API Server verifies the token
        ↓
Server responds with the requested data
```

---

## Step 3: Access Token Expires

After approximately 15 minutes:

```text
User sends request + Expired Access Token
        ↓
API Server responds: "401 Unauthorized"
```

---

## Step 4: Silent Token Refresh

The client automatically requests a new access token:

```text
Client automatically sends Refresh Token
        ↓
/api/refresh endpoint
        ↓
Server verifies Refresh Token
        ↓
Server generates a NEW Access Token
        ↓
Server sends it back
```

---

## Step 5: Back to Normal

```text
User continues making requests
with the new Access Token
        ↓
The user never even noticed the swap happened!
```

The key insight is that **Step 4 happens silently in the background**.

The user never sees a login screen — the client handles the refresh automatically.

---

# 💻 Code Examples — How It Looks in Practice

Here's how this works in Node.js using the `jsonwebtoken` library.

## Generating Both Tokens on Login

```javascript
const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
  // Access Token — short lived (15 minutes)
  const accessToken = jwt.sign(
    { userId: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  // Refresh Token — long lived (7 days)
  const refreshToken = jwt.sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
```

Notice how we use **different secrets** for each token.

This is important because even if someone figures out one secret, they can't forge the other type of token.

---

## Middleware to Verify Access Token

```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token required'
    });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res.status(403).json({
          message: 'Invalid or expired token'
        });
      }

      req.user = user;
      next();
    }
  );
};
```

---

## The Refresh Endpoint

```javascript
app.post('/api/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'No refresh token provided'
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Generate a fresh access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      accessToken: newAccessToken
    });

  } catch (error) {
    res.status(403).json({
      message: 'Invalid refresh token'
    });
  }
});
```

---

# 🆚 Access Token vs Refresh Token

| Feature            | 🔑 Access Token               | 🔄 Refresh Token            |
| ------------------ | ----------------------------- | --------------------------- |
| **Purpose**        | Access protected resources    | Get new access tokens       |
| **Lifetime**       | Short (15 min – 1 hr)         | Long (7 – 30 days)          |
| **Sent with**      | Every API request             | Only to `/refresh` endpoint |
| **Storage**        | Memory / localStorage         | HTTP-only secure cookie     |
| **If stolen**      | Limited damage — expires soon | Serious — should be revoked |
| **Contains**       | User info, roles, expiry      | Token ID, user ref, expiry  |
| **How often used** | Every few seconds             | Every 15 min – 1 hr         |

---

# 🛡️ Security Best Practices

Here are the security principles I learned that every developer should follow:

### 1. Keep Access Tokens Short-Lived

15 minutes is the sweet spot.

Short enough to limit damage if stolen, while still being practical for applications.

### 2. Store Refresh Tokens in HTTP-Only Cookies

HTTP-only cookies can't be accessed by JavaScript.

This means even if an attacker injects malicious JavaScript into your page (**XSS attack**), they can't directly read the refresh token from JavaScript.

### 3. Never Store Refresh Tokens in localStorage

`localStorage` is accessible to JavaScript running on the page.

A single XSS vulnerability could expose your long-lived token.

### 4. Implement Token Rotation

Every time a refresh token is used:

1. Issue a new refresh token.
2. Invalidate the old refresh token.

This helps reduce the risk associated with stolen refresh tokens.

### 5. Maintain a Revocation List

Keep track of invalidated refresh tokens.

When a user logs out or suspicious activity is detected, the refresh token can be revoked.

### 6. Always Use HTTPS

Tokens sent over plain HTTP can potentially be intercepted by someone on the network.

**HTTPS encrypts data in transit.**

---

# 🧠 Key Takeaways

* ✅ **Access tokens** authorize requests; **refresh tokens** renew access tokens.
* ✅ Together, they balance **security** with a smooth **user experience**.
* ✅ The access token is the **workhorse** — it is used to access protected resources.
* ✅ The refresh token is the **safety net** — it is used when the access token expires.
* ✅ Proper **storage and rotation** of tokens is critical for application security.
* ✅ This two-token system is commonly used in modern web applications.

---

# ✍️ Final Thoughts

Understanding access and refresh tokens was a real **"aha!" moment** for me.

Before this lecture, I always wondered:

> How do apps like Instagram or YouTube keep me logged in for weeks without being insecure?

Now I understand the answer: it's this clever two-token system working silently behind the scenes.

The access token handles the heavy lifting — proving who you are with each request.

The refresh token sits quietly in the background, ready to step in the moment your access token expires.

Together, they create an authentication system that can provide both **security and a seamless user experience**.

If you're learning backend development, understanding this flow is absolutely essential. It's one of the foundations of authentication in modern web applications.

---

## 🚀 Learning Journey

*Thanks for reading! I'm currently learning full-stack development through Cohort 3.0. Follow me for more articles on my learning journey!*

---

## 🏷️ Tags

`#JWT` `#Authentication` `#WebDevelopment` `#Backend` `#Security` `#100xDevs` `#Cohort3`
