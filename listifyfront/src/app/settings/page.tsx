"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, CheckSquare, Clock, Settings, HelpCircle, User } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("Español");
  const [theme, setTheme] = useState("Claro");

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f9fafb", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "256px", backgroundColor: "white", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckSquare color="#f97316" size={32} />
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#ea580c", margin: 0 }}>Listify</h1>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 16px" }}>
          <button 
            onClick={() => router.push("/")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <Home size={20} />
            <span>Home</span>
          </button>

          <button 
            onClick={() => router.push("/tasks")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <CheckSquare size={20} />
            <span>Task</span>
          </button>

          <button 
            onClick={() => router.push("/history")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <Clock size={20} />
            <span>Historial</span>
          </button>

          <button 
            onClick={() => router.push("/pet")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <span style={{ fontSize: "20px" }}>🐱</span>
            <span>Mascota</span>
          </button>

          <button
            onClick={() => router.push("/settings")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#ef4444", backgroundColor: "#fef2f2", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <Settings size={20} />
            <span style={{ fontWeight: "500" }}>Configuración</span>
          </button>

          <button 
            onClick={() => router.push("/help")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>
            <HelpCircle size={20} />
            <span>Centro de ayuda</span>
          </button>
        </nav>

        <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#374151",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              N
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "16px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937", margin: 0 }}>
              Configuración
            </h2>
            <button
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div style={{ padding: "32px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
              Configuraciones ⚙️
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
              Personaliza la aplicación según tus preferencias
            </p>

            {/* Idioma */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Idioma</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  fontSize: "14px",
                }}
              >
                <option>Español</option>
              </select>
            </div>

            {/* Tema */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Tema</h2>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  fontSize: "14px",
                }}
              >
                <option>Claro</option>
              </select>
            </div>

            {/* Centro de ayuda */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Centro de ayuda</h2>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
                Si tienes dudas o problemas, visita nuestro centro de ayuda.
              </p>
              <button
                onClick={() => router.push("/help")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Ir al centro de ayuda →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 Estilos reutilizables
const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  marginBottom: "24px",
};

const cardTitle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "12px",
};