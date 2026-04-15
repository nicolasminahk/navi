import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres NAVI (Network Agent for Verified Intelligence), el agente comercial y de conocimiento de AlborNES / AIS Group. Tu misión es generar interés genuino en el proyecto BESS-CO2 Token, conectar con las necesidades del interlocutor y moverlo hacia una acción concreta: agendar una llamada, visitar la web o profundizar en el proyecto.

Tu tono es entusiasta pero riguroso — vendes con datos, no con promesas vacías. Adaptas el discurso según el interlocutor (inversor, técnico, empresa, asesor), siempre orientado a generar convicción y avanzar en la conversación.

RECURSOS DISPONIBLES:
- Web oficial AIS Energy: https://ais-energy.netlify.app/
- Contacto directo con Nicolas (asesor senior): +34 666 453 190
  → Ofrece este contacto cuando el interlocutor muestre interés real, quiera profundizar, o pregunte por next steps.
  → Frase sugerida: "Si quieres hablar directamente con el equipo, puedes llamar o escribir a Nicolas al +34 666 453 190 — es uno de nuestros asesores senior y puede resolver cualquier duda en detalle."

Respondes en el idioma en que te hablen (español por defecto).

═══════════════════════════════════════
IDENTIDAD CORPORATIVA
═══════════════════════════════════════
MARCA: AlborNES Energy Network
Paleta: #0A1828 Navy · #0F2847 Navy2 · #1B9CE8 Cyan · #5BD5F0 CyanBrillo · #7DDFF5 CyanClaro

GRUPO:
1. AIS Group — aisgroup.io — info@aisgroup.io
2. CyC Energy Capital S.L. — NIF B27519800 — cyc-energy.io
3. AIS Levante S.L. — Valencia
4. AlborNES Energy Network S.L. (EN CONSTITUCIÓN)

DENOMINACIONES RMC:
1ª ALBORNES ENERGY NETWORK SL · 2ª ALBORNES ENERGY GENERATION SL
3ª ALBORNES VALENCIA ENERGY SL · 4ª CYC ALBORNES ENERGY NETWORK SL
5ª CYC ALBORNES ENERGIA DISTRIBUIDA SL
Marca "AlborNES" camelCase → EUIPO/OEPM clases 9,35,36,42
Responsable: Raúl Carbonero Morales (CTO Energía)

═══════════════════════════════════════
EL PROBLEMA
═══════════════════════════════════════
Las empresas con solar+baterías no pueden demostrar con rigor cuándo, cómo y cuánto CO2 evitaron.

REGULATORIO:
- CSRD (UE 2025): 50.000+ empresas deben reportar emisiones con datos auditables
- Google/Microsoft/Amazon pagan €30–100/MWh por certificados 24/7 CFE horarios
- Red española: ~80 gCO2/kWh al mediodía vs ~400 gCO2/kWh en hora punta (ciclo combinado)
- Una batería inteligente evita hasta 3x más emisiones que el promedio — ningún instrumento existente captura esto

═══════════════════════════════════════
LA SOLUCIÓN: BESS-CO2 TOKEN
═══════════════════════════════════════
Sistema automático que mide, calcula, certifica y monetiza CO2 evitado por solar+batería cada hora.

FÓRMULA: Tokens = E_descargada (kWh) × F_emisión (gCO2/kWh) × 0,95
- E_descargada: batería descargada vía SCADA (F3 BMS + F4 Shelly)
- F_emisión: REE eSIOS indicador 10390 (horario)
- 0,95: coeficiente conservador (5% margen)

6 PASOS AUTOMÁTICOS:
1. Sensores cada 15min (inversor, medidor, BMS)
2. Consulta API REE factor emisión horario
3. Algoritmo decide carga (red limpia) / descarga (red sucia)
4. Calcula gramos exactos CO2 evitados esa hora
5. Registro Polygon blockchain (~€0,01/tx, inmutable)
6. Emite token: 1 token = 1 tCO2, transferible

POLYGON: €0,01/tx · 2–5s · 100% EVM · Polygonscan verificable

═══════════════════════════════════════
ARQUITECTURA CyC STACK
═══════════════════════════════════════
Independiente del fabricante inversor. Sin lock-in. Un stack: Huawei, SolarEdge, Fronius, etc.

SHELLY PRO 3EM:
WiFi·LAN·BT · REST·MQTT·WS·TLS · 3×120A CT · ±1% precisión IEC62053-21
1 min resolución · 60 días buffer local · €120 CAPEX · CE · 5 años garantía

4 CAPAS:
01 Adquisición: Shelly Pro 3EM + CTs → REST·MQTT
02 Ingesta: Python polling 10–30s · EMQX broker TLS
03 Storage+API: TimescaleDB + PostgreSQL · FastAPI · JWT
04 Presentación: Next.js dashboard · Web3 tokenización

FLUJO: CT → Shelly → EMQX → TimescaleDB → API JWT → Dashboard + Token

5 FUENTES:
F1: Contador i-DE (oficial/fiscal, no manipulable)
F2: Inversor Huawei Sun2000 L-5 (FusionSolar API)
F3: BMS Huawei LUNA 2000 (SOC, ciclos, potencia)
F4: Shelly Pro 3EM propio (verificación cruzada)
F5: REE eSIOS + OMIE (factor CO2 horario, precio pool)
Tolerancia ±5%. Discrepancia → valor MENOR (principio conservador).

API (api.cyc-energy.io/v1):
GET /installations/{id}/live · /energy · /savings
POST /tokens/mint · WS /ws/installations/{id}

TCO 5 años: CyC €195 · FusionSolar €225 · SolarEdge €295 → −35% ahorro

═══════════════════════════════════════
PILOTO
═══════════════════════════════════════
RESIDENCIAL — Av de Selgas 15, 46800 Xàtiva (Valencia):
Paneles: 8×Jinko Tiger Neo 590W = 4,72kWp
Inversor: Huawei Sun2000 L-5 L1 (5kW monofásico)
Batería: Huawei LUNA 2000-5-S0 (5kWh LiFePO4, 6.000 ciclos)
Medidor: Shelly Pro 3EM + CTs
Instalador: Amsi Integral S.L. presupuesto 0000090699 (firmado dic 2025)
Consumo anual: 4.500 kWh · Descarga: ~5,5 MWh/año → ~2,35 tokens/año

COMERCIAL: 100kW marquesinas · 400kWh LFP · ~90 MWh/año → ~38,5 tokens/año

OBJETIVO: ~40–45 tokens Q4 2026 — primeros del mundo con SCADA auditado + Polygon.

═══════════════════════════════════════
HASHDOG
═══════════════════════════════════════
HashDog (Buenos Aires) · CTO Fractional: Nicolas Minahk · €5.000 fijo · solo software

CUBRE: Smart contract Solidity Polygon testnet · Fórmula Tokens=E×F×0,95 · Dashboard CO₂ horario · Integración API REE/OMIE · Registro on-chain

NO CUBRE: Hardware · SCADA/BMS config · MQTT broker · DB TimescaleDB+Postgres · API REST base

MVP REAL: ~€21.500 (€16.500 CyC + €5.000 HashDog)
NO presentar €5.000 como MVP completo ante inversores.

ORDEN: 1) Fases 1+2 CyC (prerrequisito) → 2) Contrato datos HashDog en paralelo → 3) Activar €5.000 cuando API lista

═══════════════════════════════════════
MERCADO
═══════════════════════════════════════
TAM: €7–9B/año 2030 · SAM: €1,35B Europa+USA · SOM Año3: €50–100M
0 competidores directos · Ventana: 12–18 meses

España: 5.100MW FV autoconsumo (CAGR>60%) · 5.200+ BESS · 40–60% FV sin batería
Marco: RD244/2019 · RD23/2020 · PNIEC2030 (74% renovable) · CSRD2025

Segmentos:
Data Centers 24/7 CFE → €50–200k/año
Industria CSRD Scope2 → €20–100k/año
Corporates Net Zero SBTi/RE100 → €10–50k/año
Utilities/Fondos API → €100k+/año

═══════════════════════════════════════
MODELO DE NEGOCIO
═══════════════════════════════════════
1. Ahorro energético FV+BESS — Operativo
2. Arbitraje BESS — En desarrollo
3. Garantías de Origen GOs — Disponible — €5–15/MWh
4. Fee BESS-CO2 Token (CORE) — En piloto — 2–5% tokens + €5–10k/mes API
5. Marketplace + Consultoría — Fase 2 (2027) — €50–200k/proyecto

Pricing: Arbitraje €4/t · GOs €10/t · Créditos estándar €25/t · BESS-CO2 Token €40/t
Margen maduro: 85% (coste marginal por planta ≈0)

═══════════════════════════════════════
PROYECCIONES
═══════════════════════════════════════
CAGR 120% · Break-even 2029 · EBITDA 85% · IPO 2034–2035 · Valoración €3,5–4,5B

2026: 2 plantas · €25k · −€1,3M · Piloto
2027: 15 · €200k · −€1,9M · Validación
2028: 40 · €2M · −€1,5M · Scale-up
2029: 75 · €5M · €0 Break-even ✓
2030: 120 · €12M · €5M
2031: 200 · €25M · €15M
2032: 400 · €65M · €50M
2035: 2.000 · €400M · €340M · IPO/Exit

═══════════════════════════════════════
RONDA SEED
═══════════════════════════════════════
Target: €5–7M · Equity/Convertible Note
Governance: Board seat + info trimestral + anti-dilución
Fondos: Tecnología 35% · Piloto 25% · Regulatorio 15% · Equipo 15% · BD 10%

Hitos: Q2 2026 cierre → Q3 piloto operativo → Q4 tokens Polygon → Q1 2027 CNMC → Q2 2027 PoC → Series A €15–20M

═══════════════════════════════════════
RIESGOS
═══════════════════════════════════════
Regulatorio CNMC — MEDIO — datos REE públicos, CSRD/PNIEC alineados, asesoría legal
Competencia — MEDIO-ALTO — ventana 12–18m, first-mover, IP algoritmo, patentes pendientes
Tecnológico — BAJO — stack maduro, redundancia, probado en energía
Adopción enterprise — MEDIO — CSRD obliga, pipeline validado con data centers
Precio carbono — MEDIO — premium justificado, demanda 24/7 CFE inelástica

═══════════════════════════════════════
INSTRUCCIONES COMERCIALES
═══════════════════════════════════════
- Responde en el idioma del usuario (español por defecto)
- No inventes datos fuera de este contexto; si no lo sabes, dilo
- Inversores: abre con la oportunidad (0 competidores, ventana 12–18m, CAGR 120%), luego profundiza en lo que pregunten
- Técnicos: sé específico con modelos, protocolos y stack — la precisión genera confianza
- Empresas/CSRD: conecta directamente con su obligación regulatoria y el coste de no actuar
- Siempre cierra con una invitación a la acción: visitar la web, hablar con Nicolas, o profundizar en un tema concreto
- Si el usuario parece indeciso o pide más info, ofrece proactivamente el contacto con Nicolas
- Nunca menciones temas legales internos, estructuras societarias en proceso, o documentación de constitución
- Estado piloto Xàtiva: en proceso, hardware seleccionado, contrato Amsi firmado dic 2025`;

const CHIPS = [
  { label: "¿Qué es el BESS-CO2 Token?", icon: "⚡" },
  { label: "Arquitectura técnica", icon: "⚙" },
  { label: "Ronda de inversión", icon: "💶" },
  { label: "Proyecciones financieras", icon: "📈" },
  { label: "Estado del piloto", icon: "🔋" },
  { label: "Competidores y ventana", icon: "🎯" },
  { label: "¿Cómo me beneficia el CSRD?", icon: "📊" },
  { label: "Hablar con el equipo", icon: "📞" },
];

function Dots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center", padding: "1px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          display: "inline-block",
          background: "rgba(255,255,255,0.38)",
          animation: `nvBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
    </span>
  );
}

function Msg({ m }) {
  const me = m.role === "user";
  return (
    <div style={{
      display: "flex",
      flexDirection: me ? "row-reverse" : "row",
      gap: 8,
      marginBottom: 10,
      alignItems: "flex-end",
    }}>
      {!me && (
        <div style={{
          width: 26,
          height: 26,
          minWidth: 26,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #1B9CE8 0%, #0A4272 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 800,
          color: "#fff",
          marginBottom: 2,
          fontFamily: "'Syne', sans-serif",
          flexShrink: 0,
          letterSpacing: "-0.3px",
        }}>N</div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "10px 14px",
        background: me ? "#1B9CE8" : "rgba(255,255,255,0.07)",
        border: me ? "none" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: me ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
        fontSize: 14,
        lineHeight: 1.65,
        color: me ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.82)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        letterSpacing: "-0.1px",
        fontWeight: 400,
      }}>
        {m.content === "…" ? <Dots /> : m.content}
      </div>
    </div>
  );
}

export default function NaviAgent() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(override) {
    const q = (override ?? text).trim();
    if (!q || busy) return;
    setLive(true);
    setText("");
    const history = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "…" }]);
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });
      const d = await r.json();
      if (!r.ok) {
        const errMsg = d.error?.message || d.error || JSON.stringify(d);
        setMsgs(p => [...p.slice(0, -1), { role: "assistant", content: `Error ${r.status}: ${errMsg}` }]);
        return;
      }
      const reply = d.content?.find(b => b.type === "text")?.text || "Sin respuesta.";
      setMsgs(p => [...p.slice(0, -1), { role: "assistant", content: reply }]);
    } catch (err) {
      setMsgs(p => [...p.slice(0, -1), { role: "assistant", content: `Error de conexión: ${err.message}` }]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        @keyframes nvBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes nvSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nvFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes nvPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        *, *::before, *::after { box-sizing: border-box; }

        .nv-page {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px 16px;
          min-height: 100%;
          background: #050D17;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }

        /* Card */
        .nv-card {
          width: 100%;
          max-width: 420px;
          height: min(700px, 92dvh);
          min-height: 520px;
          display: flex;
          flex-direction: column;
          background: rgba(8, 18, 34, 0.96);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 0.5px rgba(27,156,232,0.1),
            0 40px 100px rgba(0,0,0,0.65),
            0 8px 32px rgba(0,0,0,0.35);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        /* Header */
        .nv-hd {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          background: rgba(255,255,255,0.015);
        }

        .nv-av {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 50%;
          background: linear-gradient(145deg, #1B9CE8 0%, #083868 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 0 0 2.5px rgba(27,156,232,0.22), 0 4px 12px rgba(27,156,232,0.2);
          letter-spacing: -0.3px;
          flex-shrink: 0;
        }

        .nv-hd-info { flex: 1; min-width: 0; }

        .nv-nm {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          line-height: 1.2;
          letter-spacing: -0.2px;
        }

        .nv-sb {
          font-size: 11px;
          color: rgba(91,213,240,0.65);
          letter-spacing: 0.01em;
          margin-top: 2px;
          font-weight: 400;
        }

        .nv-online {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,210,130,0.07);
          border: 1px solid rgba(0,210,130,0.14);
          border-radius: 100px;
          padding: 4px 10px 4px 7px;
          flex-shrink: 0;
        }

        .nv-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00D08A;
          box-shadow: 0 0 5px rgba(0,208,138,0.7);
          animation: nvPulse 2.8s ease-in-out infinite;
        }

        .nv-otxt {
          font-size: 11px;
          color: rgba(0,210,130,0.8);
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        /* Body */
        .nv-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px 4px;
          scrollbar-width: none;
        }
        .nv-body::-webkit-scrollbar { display: none; }

        /* Splash */
        .nv-splash {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 16px 16px;
          animation: nvFadeIn 0.45s ease;
        }

        .nv-sav {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(145deg, #1B9CE8 0%, #083868 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          margin: 0 auto 20px;
          box-shadow:
            0 0 0 10px rgba(27,156,232,0.07),
            0 0 48px rgba(27,156,232,0.22);
          letter-spacing: -0.5px;
        }

        .nv-sh1 {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: rgba(255,255,255,0.95);
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .nv-sp {
          font-size: 13.5px;
          color: rgba(255,255,255,0.38);
          line-height: 1.7;
          max-width: 272px;
          margin: 0 auto 28px;
          font-weight: 400;
          letter-spacing: -0.05px;
        }

        .nv-sp strong {
          color: rgba(91,213,240,0.75);
          font-weight: 500;
        }

        /* Chips */
        .nv-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          justify-content: center;
        }

        .nv-chip {
          background: rgba(27,156,232,0.07);
          border: 1px solid rgba(27,156,232,0.16);
          border-radius: 100px;
          padding: 7px 14px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          font-family: inherit;
          font-weight: 500;
          white-space: nowrap;
          line-height: 1.35;
          letter-spacing: 0.01em;
        }

        .nv-chip:hover {
          background: rgba(27,156,232,0.16);
          color: rgba(255,255,255,0.88);
          border-color: rgba(27,156,232,0.32);
          transform: translateY(-1px);
        }

        .nv-chip:active {
          transform: scale(0.96) translateY(0);
        }

        /* Message animation */
        .nv-msg {
          animation: nvSlideUp 0.22s ease;
        }

        /* Chip strip (live) */
        .nv-strip {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding: 10px 20px 0;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .nv-strip::-webkit-scrollbar { display: none; }

        .nv-strip .nv-chip {
          font-size: 11px;
          padding: 5px 11px;
        }

        /* Divider above input */
        .nv-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 10px 0 0;
          flex-shrink: 0;
        }

        /* Footer / Input */
        .nv-ft {
          padding: 12px 16px 16px;
          flex-shrink: 0;
        }

        .nv-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          padding: 9px 9px 9px 18px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .nv-box:focus-within {
          border-color: rgba(27,156,232,0.38);
          box-shadow: 0 0 0 3px rgba(27,156,232,0.07);
        }

        .nv-in {
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-family: inherit;
          font-weight: 400;
          flex: 1;
          min-width: 0;
          letter-spacing: -0.1px;
        }

        .nv-in::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .nv-send {
          background: #1B9CE8;
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          min-width: 34px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, transform 0.15s ease;
          flex-shrink: 0;
        }

        .nv-send:hover:not(:disabled) {
          background: #158BD0;
          transform: scale(1.07);
        }

        .nv-send:active:not(:disabled) {
          transform: scale(0.93);
        }

        .nv-send:disabled {
          background: rgba(255,255,255,0.07);
          cursor: not-allowed;
        }

        .nv-cap {
          font-size: 10px;
          color: rgba(255,255,255,0.13);
          text-align: center;
          margin-top: 9px;
          letter-spacing: 0.04em;
          font-weight: 400;
        }

        /* Mobile */
        @media (max-width: 520px) {
          .nv-page {
            padding: 0;
            align-items: stretch;
          }
          .nv-card {
            max-width: 100%;
            width: 100%;
            height: 100dvh;
            min-height: unset;
            border-radius: 0;
            border: none;
            box-shadow: none;
          }
          .nv-ft {
            padding: 10px 14px calc(14px + env(safe-area-inset-bottom, 0px));
          }
          .nv-hd {
            padding: 14px 16px;
            padding-top: calc(14px + env(safe-area-inset-top, 0px));
          }
          .nv-splash {
            padding: 28px 14px 14px;
          }
          .nv-sh1 { font-size: 20px; }
          .nv-sav { width: 56px; height: 56px; font-size: 22px; }
          .nv-sp  { font-size: 13px; }
        }
      `}</style>

      <div className="nv-page">
        <div className="nv-card">

          {/* Header */}
          <div className="nv-hd">
            <div className="nv-av">N</div>
            <div className="nv-hd-info">
              <div className="nv-nm">NAVI</div>
              <div className="nv-sb">AlborNES · Knowledge Agent</div>
            </div>
            <div className="nv-online">
              <div className="nv-dot" />
              <span className="nv-otxt">Online</span>
            </div>
          </div>

          {/* Body */}
          <div className="nv-body">
            {!live ? (
              <div className="nv-splash">
                <div className="nv-sav">N</div>
                <div className="nv-sh1">Hola, soy NAVI</div>
                <p className="nv-sp">
                  Agente de conocimiento de{" "}
                  <strong>AlborNES · BESS-CO2 Token</strong>.
                  Pregúntame sobre tecnología, inversión, mercado o estrategia.
                </p>
                <div className="nv-chips">
                  {CHIPS.map(c => (
                    <button key={c.label} className="nv-chip" onClick={() => send(c.label)}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              msgs.map((m, i) => (
                <div key={i} className="nv-msg">
                  <Msg m={m} />
                </div>
              ))
            )}
            <div ref={endRef} style={{ height: 8 }} />
          </div>

          {/* Chip strip (post-start) */}
          {live && (
            <>
              <div className="nv-strip">
                {CHIPS.map(c => (
                  <button key={c.label} className="nv-chip" onClick={() => send(c.label)}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="nv-divider" />

          {/* Input */}
          <div className="nv-ft">
            <div className="nv-box">
              <input
                ref={inputRef}
                className="nv-in"
                placeholder="Pregunta sobre el proyecto..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                disabled={busy}
              />
              <button
                className="nv-send"
                onClick={() => send()}
                disabled={busy || !text.trim()}
                aria-label="Enviar"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20V4M12 4L6 10M12 4L18 10"
                    stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="nv-cap">BESS-CO2 Token · AIS Group · AlborNES v1.0</div>
          </div>

        </div>
      </div>
    </>
  );
}
