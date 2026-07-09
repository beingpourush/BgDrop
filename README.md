# 🎨 BgDrop

**BgDrop** is an AI-powered background removal web application that lets users remove image backgrounds in seconds using the Clipdrop API. The application features secure authentication with Clerk, a credit-based system, and Razorpay payment integration for purchasing additional credits.

---

## 🚀 Live Demo

🔗 **Frontend:** *(Coming Soon)*

🔗 **Backend API:** *(Coming Soon)*

---

## ✨ Features

- 🔐 Secure Authentication using Clerk
- 🖼️ AI-powered Background Removal
- 💳 Credit-based Usage System
- 💰 Purchase Credits using Razorpay
- 📥 Download Processed Images
- 📱 Fully Responsive Design
- ⚡ Fast & Modern UI built with React and Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Clerk Authentication
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Clerk Express SDK
- Razorpay SDK

### APIs

- Clipdrop Background Removal API
- Razorpay Payment Gateway

---

## 📸 Screenshots

### Home Page

> *(Add Screenshot)*

### Background Removal

> *(Add Screenshot)*

### Buy Credits

> *(Add Screenshot)*

---

## 📂 Folder Structure

```text
BgDrop
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/beingpourush/BgDrop.git
```

```bash
cd BgDrop
```

---

### Backend

```bash
cd backend
npm install
npm run server
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
MONGODB_URI=

CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

CLIPDROP_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CURRENCY=INR
```

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_RAZORPAY_KEY_ID=
```

---

## 📖 How It Works

1. User signs in using Clerk.
2. User uploads an image.
3. Image is sent to the backend.
4. Backend forwards the image to the Clipdrop API.
5. Background-removed image is returned.
6. One credit is deducted after a successful operation.
7. Users can purchase additional credits via Razorpay.

---

## 🔒 Security Features

- Clerk Authentication
- Protected Backend APIs
- Secure Razorpay Payment Verification
- Environment Variables for API Keys
- Credit Validation before Background Removal

---

## 👨‍💻 Author

**Pourush Goyal**

- GitHub: https://github.com/beingpourush

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!