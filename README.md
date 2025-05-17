
# Crypto Assignment

This project is a full backend system that uses two Node.js servers (`api-server` and `worker-server`) to fetch and expose real-time cryptocurrency statistics. It uses MongoDB for storage and NATS for event-based communication between servers.

## 📦 Folder Structure

```
crypto-assignment/
│
├── api-server/
│   ├── models/
│   ├── routes/
│   ├── subscribers/
│   ├── utils/
│   ├── storeCryptoStats.js
│   ├── index.js
│   └── .env
│
├── worker-server/
│   ├── publisher/
│   ├── index.js
│   └── .env
```

---

## 🚀 Features

### API Server
- Stores current price, market cap, and 24h change % of:
  - bitcoin
  - ethereum
  - matic-network
- Exposes two APIs:
  - `/stats?coin=bitcoin`: Latest stats
  - `/deviation?coin=bitcoin`: Standard deviation of the last 100 price entries

### Worker Server
- Runs every 15 minutes
- Publishes `{ trigger: 'update' }` to NATS
- `api-server` listens for this event and calls `storeCryptoStats()` to store latest data

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running locally or on MongoDB Atlas
- NATS server running (you can use [nats-server](https://docs.nats.io/nats-server/installation))

### 1. Clone Repository

```bash
git clone https://github.com/your-username/crypto-assignment.git
cd crypto-assignment
```

### 2. Start MongoDB and NATS Server

```bash
# Start NATS (in a separate terminal)
nats-server
```

---

### 3. Setup API Server

```bash
cd api-server
npm install
```

#### Create `.env` in `api-server/`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto
NATS_URL=nats://localhost:4222
```

```bash
# Run API Server
npm start
```

---

### 4. Setup Worker Server

```bash
cd ../worker-server
npm install
```

#### Create `.env` in `worker-server/`:

```
NATS_URL=nats://localhost:4222
```

```bash
# Run Worker Server
npm start
```

---

## 🧪 API Testing (Postman)

### Endpoints

- `GET /stats?coin=bitcoin`
- `GET /deviation?coin=bitcoin`

Use Postman or curl:

```bash
curl http://localhost:3000/stats?coin=bitcoin
curl http://localhost:3000/deviation?coin=bitcoin
```

---

## ✅ Success Criteria

- [x] Working `/stats` and `/deviation` endpoints
- [x] MongoDB connected and storing real-time stats
- [x] Worker publishes every 15 mins
- [x] API server subscribes and processes the data
- [x] NATS used for inter-service communication
