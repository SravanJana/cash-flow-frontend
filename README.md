# Cash Flow - Smart Financial Management Made Easy

## 💡 Overview
Cash Flow is a modern, intuitive financial management application that helps you take control of your finances. Track income, manage expenses, categorize transactions, and visualize your financial health with beautiful charts and analytics.

## ✨ Features

-   📊 **Dashboard Overview** - Get a complete snapshot of your financial health
-   💰 **Income Tracking** - Monitor all income sources in one place
-   💸 **Expense Management** - Track and categorize your expenses
-   📈 **Visual Analytics** - Beautiful charts and graphs for data visualization
-   🏷️ **Custom Categories** - Create and manage your own transaction categories
-   🔍 **Advanced Filtering** - Filter transactions by date, category, and more
-   👤 **User Profiles** - Personalized experience with profile photos
-   📧 **Email Reports** - Send financial reports directly to your email
-   🔒 **Secure Authentication** - Protected routes and secure data handling
-   📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   A backend API server (configure the base URL in `axiosConfig.jsx`)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cash-flow.git
    cd cash-flow
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure your API endpoint:

    - Open `src/Util/axiosConfig.jsx`
    - Update the `baseURL` to point to your backend server

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Built With

-   **React** - Frontend framework
-   **Vite** - Build tool and dev server
-   **React Router** - Client-side routing
-   **Axios** - HTTP client
-   **Recharts** - Data visualization
-   **Tailwind CSS** - Styling
-   **Lucide React** - Icon library
-   **React Hot Toast** - Toast notifications
-   **date-fns** - Date utilities

## 🏗️ Project Structure

```
cash-flow/
├── public/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable React components
│   ├── context/         # React Context (App state)
│   ├── pages/           # Page components
│   ├── Util/            # Utility functions and configs
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Key Components

-   **Dashboard** - Main layout wrapper with sidebar and menubar
-   **Navbar/Menubar** - Navigation components for public and authenticated users
-   **InfoCard** - Display financial metrics
-   **Charts** - Pie charts and line charts for data visualization
-   **Modal** - Reusable modal component
-   **Forms** - Add income, expense, and category forms
-   **Footer** - Landing page footer with links

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🌐 Pages

-   `/` - Landing page with features and information
-   `/login` - User login
-   `/signup` - User registration
-   `/dashboard` - Main dashboard with financial overview
-   `/income` - Income management
-   `/expense` - Expense management
-   `/category` - Category management
-   `/filter` - Advanced transaction filtering

## 🔐 Authentication

The app uses JWT-based authentication. Tokens are stored in localStorage and automatically attached to API requests via Axios interceptors.

## 📝 API Integration

Configure your API endpoints in `src/Util/apiEndpoints.js`. The app expects the following endpoints:

-   Authentication: `/login`, `/register`
-   Dashboard: `/dashboard-data`
-   Income: `/income`, `/income/categories`
-   Expense: `/expense`, `/expense/categories`
-   Categories: `/categories`, `/categories/type/:type`
