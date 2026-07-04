# LUMEN & CO — Premium E-Commerce Experience

LUMEN & CO is a modern, high-fidelity e-commerce Single Page Application (SPA) designed with a quiet luxury aesthetic. The application is built using **React.js**, **Vite**, and **Tailwind CSS**, offering a fluid checkout system, state-driven shopping cart, and a full-page Customer Portal.

---

## 🎨 Design System & Aesthetics
- **Typography**: Editorial header layouts using *Playfair Display* paired with clean *Inter* sans-serif typography for maximum readability.
- **Colors**: A custom, curated natural palette featuring warm earthy tones, dark slate, outline variants, and off-white container backgrounds.
- **Interactions**: Subtle micro-animations, active scaling buttons, and backdrop-blur overlays for a modern, glassmorphic feel.

---

## ✨ Features

- **Dynamic Navigation Header**: Allows switching views between the landing page, product catalog, and categories. Includes a live search bar for filtering products.
- **Curated Catalog Views**: Filtered product categories for *Menswear*, *Skincare*, and *Accessories*, complete with responsive grid layouts.
- **Sliding Shopping Cart Drawer**:
  - Live item count indicator on the header icon.
  - Smooth sliding drawer entry/exit animation.
  - Interactive item quantity selectors (+ / -) and instant item removal.
  - Real-time subtotal calculation.
- **Client Checkout Journey**:
  - Structured multi-step billing and shipping address inputs.
  - Dynamic payment methods (UPI, Cards, Cash on Delivery).
  - Validation checks with error feedback.
- **Full-page Customer Portal**:
  - **Authenticated Users**: Renders client badges, registration details, and a complete order history reference.
  - **Guest Users**: Shows a beautiful, centered tab switcher for logging in and signing up.

---

## 🛠️ Technology Stack
*   **Library**: React (v19)
*   **Build Tool**: Vite (v8)
*   **Styling**: Tailwind CSS (v3) + PostCSS + Autoprefixer
*   **State Management**: React Context API (`CartContext.jsx`)
*   **Linter**: Oxlint (Ultra-fast JavaScript/React linter)

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local dev server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Linting
Check code syntax and rules with Oxlint:
```bash
npm run lint
```

### Build for Production
Compile the production bundle:
```bash
npm run build
```
The compiled build output will be written to the `dist/` directory.

---

## ☁️ Deployment Configurations

### Frontend (Vercel)
The project includes a [vercel.json](file:///c:/Users/Om/New%20folder%20(3)/vercel.json) file configured to handle client-side routing.
To deploy:
1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Vercel will automatically detect the **Vite** configuration.
3. Configure your Build Command: `npm run build` and Output Directory: `dist`.
4. Deploy!

### Backend (Render)
If you plan to connect a Node.js/Express backend:
1. Create a `.env` file based on the provided [.env.example](file:///c:/Users/Om/New%20folder%20(3)/.env.example) template.
2. Link the environment variable `VITE_API_URL` to point to your backend hosted on [Render](https://render.com/).
