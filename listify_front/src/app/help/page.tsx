"use client";

import { useRouter } from "next/navigation";
import { Home, CheckSquare, Clock, Settings, HelpCircle, User, MessageCircle, Book, Video, Mail } from "lucide-react";

export default function HelpPage() {
  const router = useRouter();

  const helpCategories = [
    {
      icon: <Book size={24} />,
      title: "Guía de inicio",
      description: "Aprende los conceptos básicos de Listify",
      color: "#3b82f6",
      bgColor: "#dbeafe"
    },
    {
      icon: <Video size={24} />,
      title: "Tutoriales en video",
      description: "Videos paso a paso para usar todas las funciones",
      color: "#8b5cf6",
      bgColor: "#ede9fe"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Preguntas frecuentes",
      description: "Respuestas a las dudas más comunes",
      color: "#10b981",
      bgColor: "#d1fae5"
    },
    {
      icon: <Mail size={24} />,
      title: "Contactar soporte",
      description: "¿Necesitas ayuda personalizada? Escríbenos",
      color: "#ef4444",
      bgColor: "#fee2e2"
    }
  ];

  const faqs = [
    {
      question: "¿Cómo creo una nueva tarea?",
      answer: "Ve a la sección de Tareas y haz clic en el botón '+ Crear Nueva Tarea'. Completa el título, descripción y fecha de vencimiento."
    },
    {
      question: "¿Cómo funciona el sistema de experiencia?",
      answer: "Ganas XP al completar tareas. Cada tarea completada te da 10 puntos de experiencia. Al acumular 100 XP desbloqueas tu mascota, y después cada tarea suma XP a la mascota para subir de nivel."
    },
    {
      question: "¿Puedo compartir mis tareas?",
      answer: "Sí, puedes compartir tareas con otros usuarios usando la función de compartir al crear o editar cada tarea."
    },
    {
      question: "¿Cómo desbloqueo mi mascota?",
      answer: "Tu mascota se desbloquea automáticamente al alcanzar 100 XP total. Sigue completando tareas para desbloquearla y luego sube su nivel."
    }
  ];

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
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
            <Settings size={20} />
            <span>Configuración</span>
          </button>

          <button
            onClick={() => router.push("/help")}
            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", color: "#ef4444", backgroundColor: "#fef2f2", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>
            <HelpCircle size={20} />
            <span style={{ fontWeight: "500" }}>Centro de ayuda</span>
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
              Centro de Ayuda
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

        {/* Help Content */}
        <div style={{ padding: "32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
                Centro de Ayuda 💡
              </h1>
              <p style={{ color: "#6b7280", fontSize: "16px" }}>
                ¿En qué podemos ayudarte hoy?
              </p>
            </div>

            {/* Categorías de ayuda */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: category.bgColor,
                      color: category.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px"
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.5" }}>
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Preguntas frecuentes */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", marginBottom: "24px" }}>
                Preguntas Frecuentes
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {faqs.map((faq, index) => (
                  <div key={index} style={{ borderBottom: index < faqs.length - 1 ? "1px solid #e5e7eb" : "none", paddingBottom: "24px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6" }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA de contacto */}
            <div
              style={{
                marginTop: "32px",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textAlign: "center",
                background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
                ¿No encontraste lo que buscabas?
              </h2>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
                Nuestro equipo de soporte está listo para ayudarte
              </p>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                }}
              >
                Contactar Soporte →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}