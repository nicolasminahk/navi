import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres el agente de conocimiento interno de AlborNES / AIS Group. Tu nombre es NAVI (Network Agent for Verified Intelligence). Tienes acceso completo a toda la documentación técnica, financiera, legal y estratégica del proyecto BESS-CO2 Token. Respondes en el idioma en que te hablen (español por defecto). Eres preciso, técnico cuando hace falta, y capaz de adaptar tu discurso a distintos interlocutores: inversores, ingenieros, asesores legales, gestores, o equipo interno.

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
INSTRUCCIONES
═══════════════════════════════════════
- Responde en el idioma del usuario (español por defecto)
- No inventes datos fuera de este contexto; si no lo sabes, dilo
- Inversores: destaca 0 competidores, ventana 12–18m, CAGR 120%
- Técnicos: sé específico con modelos, protocolos, stack
- Legales: distingue decidido vs pendiente (RMC sin respuesta aún)
- Negocio: contextualiza con CSRD y demanda 24/7 CFE
- Estado piloto Xàtiva: en proceso, hardware seleccionado, contrato Amsi firmado dic 2025`;

const CHIPS = [
  { label: "¿Qué es el BESS-CO2 Token?", icon: "⚡" },
  { label: "Arquitectura técnica", icon: "⚙" },
  { label: "Ronda de inversión", icon: "💶" },
  { label: "Alcance real de HashDog", icon: "📋" },
  { label: "Proyecciones financieras", icon: "📈" },
  { label: "Estado del piloto", icon: "🔋" },
  { label: "Objeto social escritura", icon: "⚖" },
  { label: "Competidores y ventana", icon: "🎯" },
];

function Dots() {
  return (
    <span style={{ display:"inline-flex", gap:4, alignItems:"center" }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width:6, height:6, borderRadius:"50%", display:"inline-block",
          background:"#5BD5F0",
          animation:`nvBounce 1.1s ease-in-out ${i*0.16}s infinite`,
        }}/>
      ))}
    </span>
  );
}

function Msg({ m }) {
  const me = m.role === "user";
  return (
    <div style={{
      display:"flex", flexDirection: me?"row-reverse":"row",
      gap:8, marginBottom:14, alignItems:"flex-end",
    }}>
      {!me && (
        <div style={{
          width:26, height:26, minWidth:26, borderRadius:"50%",
          background:"linear-gradient(135deg,#1B9CE8,#063460)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:10, fontWeight:800, color:"#fff", marginBottom:2,
          fontFamily:"'Syne',sans-serif", flexShrink:0,
        }}>N</div>
      )}
      <div style={{
        maxWidth:"76%", padding:"10px 13px",
        background: me ? "linear-gradient(135deg,#1B9CE8,#0D7FC4)" : "rgba(255,255,255,0.07)",
        border: me ? "none" : "1px solid rgba(255,255,255,0.09)",
        borderRadius: me ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
        fontSize:13.5, lineHeight:1.7, color:"#DFF0FA",
        whiteSpace:"pre-wrap", wordBreak:"break-word",
      }}>
        {m.content === "…" ? <Dots/> : m.content}
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

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  async function send(override) {
    const q = (override ?? text).trim();
    if (!q || busy) return;
    setLive(true);
    setText("");
    const history = [...msgs, { role:"user", content:q }];
    setMsgs([...history, { role:"assistant", content:"…" }]);
    setBusy(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1024,
          system:SYSTEM_PROMPT,
          messages:history,
        }),
      });
      const d = await r.json();
      const reply = d.content?.find(b=>b.type==="text")?.text || "Sin respuesta.";
      setMsgs(p => [...p.slice(0,-1), { role:"assistant", content:reply }]);
    } catch {
      setMsgs(p => [...p.slice(0,-1), { role:"assistant", content:"Error de conexión." }]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes nvBounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
        @keyframes nvIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        .nv-page{display:flex;justify-content:center;align-items:center;padding:16px;min-height:100%;background:#050D17}
        .nv-card{width:100%;max-width:440px;height:min(640px,90dvh);min-height:480px;display:flex;flex-direction:column;background:#071219;border:1px solid rgba(27,156,232,.2);border-radius:18px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;box-shadow:0 24px 64px rgba(0,0,0,.5),0 0 0 1px rgba(27,156,232,.08)}
        .nv-hd{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;background:rgba(255,255,255,.02)}
        .nv-av{width:34px;height:34px;min-width:34px;border-radius:50%;background:linear-gradient(135deg,#1B9CE8,#063460);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;color:#fff;box-shadow:0 0 0 3px rgba(27,156,232,.18)}
        .nv-nm{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#fff;line-height:1.2}
        .nv-sb{font-size:10px;color:#5BD5F0;text-transform:uppercase;letter-spacing:.07em;margin-top:2px}
        .nv-online{margin-left:auto;display:flex;align-items:center;gap:5px}
        .nv-dot{width:6px;height:6px;border-radius:50%;background:#00C896;box-shadow:0 0 6px rgba(0,200,150,.6)}
        .nv-otxt{font-size:10.5px;color:#5BD5F0;font-weight:500}
        .nv-body{flex:1;overflow-y:auto;padding:16px 16px 0;scrollbar-width:thin;scrollbar-color:rgba(27,156,232,.12) transparent}
        .nv-body::-webkit-scrollbar{width:3px}
        .nv-body::-webkit-scrollbar-thumb{background:rgba(27,156,232,.18);border-radius:3px}
        .nv-splash{display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px 12px 8px;animation:nvIn .4s ease}
        .nv-sav{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#1B9CE8,#063460);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;margin:0 auto 14px;box-shadow:0 0 32px rgba(27,156,232,.3)}
        .nv-sh1{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#fff;margin-bottom:8px}
        .nv-sp{font-size:12.5px;color:#7EB5D0;line-height:1.65;max-width:280px;margin:0 auto 20px}
        .nv-sp strong{color:#5BD5F0;font-weight:500}
        .nv-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
        .nv-chip{background:rgba(27,156,232,.07);border:1px solid rgba(27,156,232,.2);border-radius:20px;padding:6px 12px;font-size:11.5px;color:#7EB5D0;cursor:pointer;transition:all .15s;font-family:inherit;white-space:nowrap;line-height:1.3}
        .nv-chip:hover{background:rgba(27,156,232,.16);color:#DFF0FA;border-color:rgba(27,156,232,.4);transform:translateY(-1px)}
        .nv-chip:active{transform:scale(.97)}
        .nv-msg{animation:nvIn .22s ease}
        .nv-strip{display:flex;gap:5px;overflow-x:auto;padding:8px 14px 0;scrollbar-width:none;flex-shrink:0}
        .nv-strip::-webkit-scrollbar{display:none}
        .nv-strip .nv-chip{font-size:10.5px;padding:5px 9px}
        .nv-ft{padding:10px 13px 14px;flex-shrink:0}
        .nv-box{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.055);border:1px solid rgba(27,156,232,.2);border-radius:12px;padding:9px 11px;transition:border-color .2s}
        .nv-box:focus-within{border-color:rgba(27,156,232,.5)}
        .nv-in{background:transparent;border:none;outline:none;color:#DFF0FA;font-size:13.5px;font-family:inherit;flex:1;min-width:0}
        .nv-in::placeholder{color:rgba(180,220,245,.25)}
        .nv-send{background:#1B9CE8;border:none;border-radius:8px;width:32px;height:32px;min-width:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
        .nv-send:hover:not(:disabled){background:#0D85CE;transform:scale(1.05)}
        .nv-send:active:not(:disabled){transform:scale(.96)}
        .nv-send:disabled{background:rgba(27,156,232,.18);cursor:not-allowed}
        .nv-cap{font-size:9px;color:rgba(100,150,190,.28);text-align:center;margin-top:6px;letter-spacing:.05em}
        @media(max-width:500px){
          .nv-page{padding:0}
          .nv-card{max-width:100%;height:100dvh;min-height:unset;border-radius:0;border-left:none;border-right:none}
          .nv-splash{padding:20px 8px 8px}
          .nv-sh1{font-size:16px}
          .nv-sp{font-size:12px}
        }
      `}</style>

      <div className="nv-page">
        <div className="nv-card">

          {/* Header */}
          <div className="nv-hd">
            <div className="nv-av">N</div>
            <div>
              <div className="nv-nm">NAVI</div>
              <div className="nv-sb">AlborNES · Knowledge Agent</div>
            </div>
            <div className="nv-online">
              <div className="nv-dot"/>
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
                  Pregúntame sobre tecnología, inversión, mercado, legal o estrategia.
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
              msgs.map((m,i) => <div key={i} className="nv-msg"><Msg m={m}/></div>)
            )}
            <div ref={endRef} style={{height:12}}/>
          </div>

          {/* Chip strip post-start */}
          {live && (
            <div className="nv-strip">
              {CHIPS.map(c => (
                <button key={c.label} className="nv-chip" onClick={() => send(c.label)}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="nv-ft">
            <div className="nv-box">
              <input
                ref={inputRef}
                className="nv-in"
                placeholder="Pregunta sobre el proyecto..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key==="Enter" && !e.shiftKey && send()}
                disabled={busy}
              />
              <button
                className="nv-send"
                onClick={() => send()}
                disabled={busy || !text.trim()}
                aria-label="Enviar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <div className="nv-cap">BESS-CO2 Token · AIS Group · CyC Energy Capital · AlborNES v1.0</div>
          </div>

        </div>
      </div>
    </>
  );
}
