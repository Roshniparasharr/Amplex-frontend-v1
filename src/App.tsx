import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardPage from "./pages/DashboardPage";
import NewQuotePage from "./pages/NewQuotePage";
import EngineeringReviewPage from "./pages/EngineeringReviewPage";
import SupplierConnectPage from "./pages/SupplierConnectPage";
import QuoteDetailPage from "./pages/QuoteDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 flex flex-col">
            <Topbar />

            <main className="flex-1 p-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/quotes/new" element={<NewQuotePage />} />
                <Route
                  path="/quotes/engineering-review"
                  element={<EngineeringReviewPage />}
                />
                <Route
                  path="/quotes/supplier-connect"
                  element={<SupplierConnectPage />}
                />
                <Route path="/quotes/:id" element={<QuoteDetailPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}