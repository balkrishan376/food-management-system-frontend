# 🍽️ SustainaBite - Food Wastage Management System

A professional platform connecting donors, NGOs, and receivers in real-time to rescue surplus food and build sustainable communities.

## 🚀 Project Overview

SustainaBite is designed to bridge the gap between businesses with surplus food and the communities that need it. This frontend application provides an intuitive, responsive, and animated interface for donors and receivers to interact with the platform.

### ✨ Key Features

- **🔐 Secure Authentication**: JWT-based login and registration for Donors and Receivers.
- **📊 Role-Based Dashboards**: 
  - **Donors**: Post food donations, track contributions, and manage listings.
  - **Receivers**: View available donations, claim items, and track claimed food.
- **🖼️ Image Management**: Upload and view photos of donations for transparency.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop viewing.
- **✨ Premium UI/UX**: Built with smooth animations and a modern aesthetic.

---

## 🛠️ Technology Stack

- **Frontend**: 
  - React 19 (Hooks, Context API)
  - Vite (Fast development and build)
  - Tailwind CSS (Modern styling)
  - Lucide React (Beautiful icons)
  - React Router (SPA navigation)
- **Backend (API)**: 
  - Node.js & Express
  - MongoDB & Mongoose
- **Deployment**:
  - Vercel (Frontend Hosting)
  - Render (Backend API)

---

## 🌐 Deployment Configuration

The application is pre-configured for seamless deployment.

### Vercel Deployment (Frontend)
The `vercel.json` and `vite.config.js` have been optimized to handle Single Page Application (SPA) routing.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: Your backend API endpoint.

### Render Deployment (Backend)
The backend is configured via `render.yaml` to use the Node.js runtime.
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: MongoDB Atlas connection string.
  - `JWT_SECRET`: Secret key for authentication.

---

## 💻 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/balkrishan376/food-management-system-frontend
   cd food-management-system-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```

---

## 📝 License

This project is part of the **SustainaBite Initiative** for food waste management and community support.

---

**Developed with ❤️ by the SustainaBite Team**
