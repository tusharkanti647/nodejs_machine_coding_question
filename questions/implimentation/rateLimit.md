## Markdown output 🛫

[CKEditor 5](https://ckeditor.com/) can be configured to output Markdown instead of HTML. Markdown is a lightweight markup language that you can use to add formatting to plain text documents. Use the **Source** button to check and edit the Markdown source code of this content.

The editor-produced Markdown output supports most essential features, like [links](https://ckeditor.com/), **different** kinds of _emphasis_, `inline code formatting`, or code blocks:

```css
p {
    text-align: center;
    color: red;
}
```

## RATE LIMIT🛬

 

 

---

* A plain in-memory Node.js rate limiter won’t survive “millions of users.” It will break on scaling, restarts, and distributed traffic. You need a **distributed, fault-tolerant design** using battle-tested tools.

  Let’s build a **production-grade rate limiter** using:

* **Redis** → fast distributed counter store

* \*\*Lua scripts → atomic operations

* \*\*Node.js + \*\*Express

* (Optional) \*\*NGINX / API Gateway layer

---

## 🧠 Architecture (Real Production Setup)

```css
Client → CDN → Load Balancer → API Gateway (optional)
                              ↓
                        Node.js App
                              ↓
                          Redis Cluster
```

👉 Why this works:

* Stateless app servers (horizontal scaling)

* Redis handles global rate limits

* Lua ensures atomicity (no race conditions)

   

---

## ⚡ Rate Limiting Strategy

We’ll use **Sliding Window + Token Bucket hybrid**

* Accurate (no burst abuse like fixed window)
* Fast (Redis-based)
* Distributed-safe

---

## 🔥 Redis + Lua Script (Atomic Logic)

This script:

* Tracks requests per user
* Removes expired entries
* Enforces limit

```javascript
-- rate_limiter.lua

local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current_time = tonumber(ARGV[3])

-- remove old entries
redis.call("ZREMRANGEBYSCORE", key, 0, current_time - window)

-- count current requests
local current_count = redis.call("ZCARD", key)

if current_count >= limit then
  return 0
end

-- add new request
redis.call("ZADD", key, current_time, current_time)

-- set expiry
redis.call("EXPIRE", key, window)

return 1
```

---

## 🚀 Node.js Production Code

Install:

```javascript
npm install ioredis express
```

 

---

## ✅ Redis Setup (Cluster-ready client)

 

```javascript
// redisClient.js
import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

export default redis;
```

 

---

## ✅ Rate Limiter Middleware

 

```javascript
// rateLimiter.js
import fs from "fs";
import redis from "./redisClient.js";

const luaScript = fs.readFileSync("./rate_limiter.lua", "utf8");

const LIMIT = 100;        // requests
const WINDOW = 60 * 1000; // 1 minute

export const rateLimiter = async (req, res, next) => {
  try {
    const userId =
      req.headers["x-user-id"] || req.ip; // fallback to IP

    const key = `rate_limit:${userId}`;
    const now = Date.now();

    const allowed = await redis.eval(
      luaScript,
      1,
      key,
      LIMIT,
      WINDOW,
      now
    );

    if (allowed === 0) {
      return res.status(429).json({
        message: "Too many requests",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);

    // Fail-open strategy (important for production)
    next();
  }
};
```

---

## ✅ Express App

 

```javascript
// server.js
import express from "express";
import { rateLimiter } from "./rateLimiter.js";

const app = express();

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## ⚙️ Production Enhancements (IMPORTANT)

### 1. Redis Cluster (must for millions)

Use:

* Redis Cluster mode
* OR AWS ElastiCache

---

### 2. Key Design

* rate\_limit:userId
* rate\_limit:ip
* rate\_limit:apiKey

---

### 3. Multi-Level Rate Limiting

Apply limits at:

* User level
* IP level
* Endpoint level

---

### 4. API Gateway Layer

Use:

* **Kong**
* **NGINX**
* **Envoy**

👉 Offloads pressure from Node.js

---

### 5. Caching Layer

Use:

* Redis TTL properly
* Avoid memory leaks

---

### 6. Fail Strategy

* Redis down → allow traffic (fail-open)
* Or block (fail-closed for sensitive APIs)

---

### 7. Observability

Use:

* **Prometheus**
* **Grafana**

Track:

* Rate limit hits
* Blocked requests
* Redis latency

---

## ⚡ Alternative (Advanced Tools Used in Industry)

Instead of building from scratch:

### 🔹 Libraries

* **rate-limiter-flexible** (Redis-backed, production ready)

### 🔹 Infra-based

* Cloudflare Rate Limiting
* AWS API Gateway throttling

---

## 🧠 Interview Deep Points

If interviewer pushes:

👉 Why Lua?

* Atomic operations
* Prevent race conditions in distributed systems

👉 Why Redis?

* Sub-millisecond latency
* Built-in TTL + sorted sets

👉 Bottleneck?

* Redis → solve with sharding/cluster

👉 Alternatives?

* Token bucket in memory + sync via Kafka (complex)