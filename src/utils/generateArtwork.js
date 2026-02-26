// generateArtwork.js
// Draws unique chair illustrations on a canvas for each product pattern.

/* ─── Shared helpers ──────────────────────────────────────────── */
function grain(ctx, w, h, amount = 4000) {
  for (let i = 0; i < amount; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
  }
}

function shadow(ctx, color = 'rgba(0,0,0,0.35)', blur = 30, ox = 0, oy = 20) {
  ctx.shadowColor = color
  ctx.shadowBlur = blur
  ctx.shadowOffsetX = ox
  ctx.shadowOffsetY = oy
}

function clearShadow(ctx) {
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
}

/* ─── Chair Drawers ───────────────────────────────────────────── */

/** Nordic / Scandinavian lounge chair — clean lines, oak legs */
function drawNordic(ctx) {
  const cx = 200, floor = 430

  // Background gradient – navy
  const bg = ctx.createLinearGradient(0, 0, 0, 520)
  bg.addColorStop(0, '#0c1a2e')
  bg.addColorStop(1, '#050d18')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 400, 520)

  // Floor reflection ellipse
  ctx.save()
  ctx.fillStyle = 'rgba(150,180,220,0.07)'
  ctx.beginPath()
  ctx.ellipse(cx, floor + 20, 110, 18, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // — Legs (oak wood) —
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.5)', 20, 10, 15)
  ctx.strokeStyle = '#c8a97a'
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  // front-left
  ctx.beginPath(); ctx.moveTo(130, 330); ctx.lineTo(120, floor); ctx.stroke()
  // front-right
  ctx.beginPath(); ctx.moveTo(270, 330); ctx.lineTo(280, floor); ctx.stroke()
  // back-left
  ctx.strokeStyle = '#b0905e'
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.moveTo(145, 230); ctx.lineTo(135, floor - 15); ctx.stroke()
  // back-right
  ctx.beginPath(); ctx.moveTo(255, 230); ctx.lineTo(265, floor - 15); ctx.stroke()
  clearShadow(ctx)
  ctx.restore()

  // — Seat cushion —
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 30, 0, 20)
  const seatGrad = ctx.createLinearGradient(120, 290, 280, 340)
  seatGrad.addColorStop(0, '#d6d0c8')
  seatGrad.addColorStop(1, '#9a9590')
  ctx.fillStyle = seatGrad
  ctx.beginPath()
  ctx.roundRect(118, 295, 164, 45, [10, 10, 4, 4])
  ctx.fill()
  // cushion top highlight
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath()
  ctx.roundRect(125, 297, 148, 12, 6)
  ctx.fill()
  clearShadow(ctx)
  ctx.restore()

  // — Backrest —
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.5)', 25, -5, 10)
  const backGrad = ctx.createLinearGradient(130, 160, 270, 300)
  backGrad.addColorStop(0, '#cecac2')
  backGrad.addColorStop(1, '#888580')
  ctx.fillStyle = backGrad
  ctx.beginPath()
  ctx.roundRect(130, 165, 140, 140, [14, 14, 4, 4])
  ctx.fill()
  // stitching line
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 5])
  ctx.beginPath()
  ctx.roundRect(140, 174, 120, 122, 10)
  ctx.stroke()
  ctx.setLineDash([])
  clearShadow(ctx)
  ctx.restore()

  // — Armrests —
  ctx.save()
  ctx.fillStyle = '#c0aa88'
  ctx.beginPath()
  ctx.roundRect(105, 270, 30, 60, 6)
  ctx.fill()
  ctx.beginPath()
  ctx.roundRect(265, 270, 30, 60, 6)
  ctx.fill()
  ctx.restore()

  // Floor line
  ctx.save()
  ctx.strokeStyle = 'rgba(100,140,200,0.12)'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
  ctx.restore()
}

/** Leather Armchair — cognac brown, mid-century modern */
function drawLeather(ctx) {
  const cx = 200, floor = 435

  const bg = ctx.createLinearGradient(0, 0, 400, 520)
  bg.addColorStop(0, '#1a0e06')
  bg.addColorStop(1, '#0d0703')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 400, 520)

  // Glow
  const glow = ctx.createRadialGradient(cx, 300, 30, cx, 300, 220)
  glow.addColorStop(0, 'rgba(180,100,40,0.15)')
  glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  // Floor ellipse
  ctx.fillStyle = 'rgba(180,100,40,0.08)'
  ctx.beginPath(); ctx.ellipse(cx, floor + 15, 115, 16, 0, 0, Math.PI * 2); ctx.fill()

  // Legs — walnut tapered
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 20, 8, 18)
  const legColor = ['#7a4f2a', '#9a6b3e']
  const legs = [[138, 345, 125, floor], [262, 345, 275, floor], [148, 280, 138, floor - 10], [252, 280, 262, floor - 10]]
  legs.forEach(([x1, y1, x2, y2], i) => {
    const lg = ctx.createLinearGradient(x1, y1, x2, y2)
    lg.addColorStop(0, legColor[0]); lg.addColorStop(1, legColor[1])
    ctx.strokeStyle = lg
    ctx.lineWidth = i < 2 ? 9 : 7
    ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  clearShadow(ctx); ctx.restore()

  // Body base / large cushion
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 40, 0, 25)
  const leatherGrad = ctx.createLinearGradient(115, 240, 285, 360)
  leatherGrad.addColorStop(0, '#c07040')
  leatherGrad.addColorStop(0.5, '#9a5830')
  leatherGrad.addColorStop(1, '#6b3a1c')
  ctx.fillStyle = leatherGrad
  ctx.beginPath(); ctx.roundRect(115, 295, 170, 60, [6, 6, 2, 2]); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Backrest — tufted look
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 30, -4, 12)
  const backGrad2 = ctx.createLinearGradient(125, 160, 275, 300)
  backGrad2.addColorStop(0, '#b86830')
  backGrad2.addColorStop(1, '#7a4020')
  ctx.fillStyle = backGrad2
  ctx.beginPath(); ctx.roundRect(125, 165, 150, 148, [16, 16, 4, 4]); ctx.fill()
  // Tufting diamonds
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  const tuftPoints = [[170, 210], [200, 200], [230, 210], [170, 245], [200, 235], [230, 245], [200, 270]]
  tuftPoints.forEach(([tx, ty]) => {
    ctx.beginPath(); ctx.arc(tx, ty, 4, 0, Math.PI * 2); ctx.fill()
  })
  // Tuft lines
  ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(170, 210); ctx.lineTo(200, 200); ctx.lineTo(230, 210); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(170, 245); ctx.lineTo(200, 235); ctx.lineTo(230, 245); ctx.stroke()
  clearShadow(ctx); ctx.restore()

  // Armrests — rolled leather
  ctx.save()
  const armGrad = ctx.createLinearGradient(0, 270, 0, 340)
  armGrad.addColorStop(0, '#c87840'); armGrad.addColorStop(1, '#8a4820')
  ctx.fillStyle = armGrad
  ctx.beginPath(); ctx.roundRect(100, 265, 32, 80, 12); ctx.fill()
  ctx.beginPath(); ctx.roundRect(268, 265, 32, 80, 12); ctx.fill()
  ctx.restore()

  // Floor line
  ctx.strokeStyle = 'rgba(180,100,40,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(50, floor + 2); ctx.lineTo(350, floor + 2); ctx.stroke()
}

/** Velvet Accent Chair — deep green, brass legs, sculptural form */
function drawVelvet(ctx) {
  const cx = 200, floor = 438

  const bg = ctx.createLinearGradient(0, 0, 0, 520)
  bg.addColorStop(0, '#0a130c')
  bg.addColorStop(1, '#050a06')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 520)

  // Ambient glow
  const glow = ctx.createRadialGradient(cx, 310, 20, cx, 310, 200)
  glow.addColorStop(0, 'rgba(40,100,60,0.18)'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  // Floor
  ctx.fillStyle = 'rgba(80,160,80,0.06)'
  ctx.beginPath(); ctx.ellipse(cx, floor + 14, 100, 14, 0, 0, Math.PI * 2); ctx.fill()

  // Brass legs — thin tapered
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 18, 8, 18)
  const brassLegs = [[148, 340, 132, floor], [252, 340, 268, floor], [152, 295, 140, floor - 8], [248, 295, 260, floor - 8]]
  brassLegs.forEach(([x1, y1, x2, y2], i) => {
    const blg = ctx.createLinearGradient(x1, 0, x2, 0)
    blg.addColorStop(0, '#d4a84b'); blg.addColorStop(0.5, '#f0cc70'); blg.addColorStop(1, '#b08020')
    ctx.strokeStyle = blg
    ctx.lineWidth = i < 2 ? 5 : 4; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  clearShadow(ctx); ctx.restore()

  // Seat — round, velvet
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 35, 0, 22)
  const vGrad = ctx.createRadialGradient(cx, 325, 10, cx, 340, 90)
  vGrad.addColorStop(0, '#4a9e5e'); vGrad.addColorStop(0.6, '#2d7044'); vGrad.addColorStop(1, '#1a4a2c')
  ctx.fillStyle = vGrad
  ctx.beginPath(); ctx.ellipse(cx, 328, 85, 34, 0, 0, Math.PI * 2); ctx.fill()
  // Velvet sheen
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.beginPath(); ctx.ellipse(cx - 20, 316, 55, 12, -0.2, 0, Math.PI * 2); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Backrest — curved organic
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 28, -4, 10)
  const bGrad = ctx.createLinearGradient(130, 155, 270, 300)
  bGrad.addColorStop(0, '#56b06e'); bGrad.addColorStop(1, '#224a32')
  ctx.fillStyle = bGrad
  ctx.beginPath()
  ctx.moveTo(148, 300)
  ctx.bezierCurveTo(130, 280, 120, 220, 135, 170)
  ctx.bezierCurveTo(150, 140, 250, 140, 265, 170)
  ctx.bezierCurveTo(280, 220, 270, 280, 252, 300)
  ctx.closePath(); ctx.fill()
  // Velvet sheen on back
  ctx.fillStyle = 'rgba(255,255,255,0.07)'
  ctx.beginPath()
  ctx.moveTo(165, 290); ctx.bezierCurveTo(150, 250, 148, 195, 165, 165)
  ctx.bezierCurveTo(172, 155, 200, 152, 200, 152)
  ctx.bezierCurveTo(185, 165, 162, 215, 162, 285); ctx.closePath(); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Floor line
  ctx.strokeStyle = 'rgba(80,160,80,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
}

/** Wire Chair — Eames-inspired, matte black mesh on chrome rod base */
function drawWire(ctx) {
  const cx = 200, floor = 440

  const bg = ctx.createLinearGradient(0, 0, 0, 520)
  bg.addColorStop(0, '#111418'); bg.addColorStop(1, '#070a0d')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 520)

  // Glow
  const glow = ctx.createRadialGradient(cx, 300, 20, cx, 300, 200)
  glow.addColorStop(0, 'rgba(100,140,180,0.12)'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  ctx.fillStyle = 'rgba(100,140,180,0.07)'
  ctx.beginPath(); ctx.ellipse(cx, floor + 14, 95, 14, 0, 0, Math.PI * 2); ctx.fill()

  // Eiffel base — chrome rods
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 20, 8, 20)
  const chromeLegs = [
    [cx, 360, 110, floor], [cx, 360, 290, floor],
    [cx - 10, 360, 150, floor - 5], [cx + 10, 360, 250, floor - 5]
  ]
  ctx.lineCap = 'round'
  chromeLegs.forEach(([x1, y1, x2, y2]) => {
    const clg = ctx.createLinearGradient(x1 - 4, y1, x2 - 4, y2)
    clg.addColorStop(0, '#ccd5dd'); clg.addColorStop(0.5, '#8a9198'); clg.addColorStop(1, '#4a5158')
    ctx.strokeStyle = clg; ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  // Cross strut
  ctx.strokeStyle = '#7888a0'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(130, floor - 28); ctx.lineTo(270, floor - 28); ctx.stroke()
  clearShadow(ctx); ctx.restore()

  // Wire shell — backrest
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.5)', 22, 0, 12)
  const wireColor = '#3a4350'
  const shellHighlight = '#7a9ab8'
  // Outer shell shape
  ctx.strokeStyle = wireColor; ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(152, 298); ctx.bezierCurveTo(132, 270, 128, 210, 148, 168)
  ctx.bezierCurveTo(162, 140, 238, 140, 252, 168)
  ctx.bezierCurveTo(272, 210, 268, 270, 248, 298); ctx.stroke()
  // Wire grid lines horizontal
  for (let y = 180; y <= 285; y += 18) {
    const xLeft = 130 + (y - 150) * 0.2
    const xRight = 270 - (y - 150) * 0.2
    ctx.beginPath(); ctx.moveTo(xLeft, y); ctx.lineTo(xRight, y); ctx.stroke()
  }
  // Wire grid lines vertical
  for (let x = 155; x <= 245; x += 18) {
    ctx.beginPath(); ctx.moveTo(x, 168); ctx.lineTo(x, 295); ctx.stroke()
  }
  // Highlight wire
  ctx.strokeStyle = shellHighlight; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(155, 294); ctx.bezierCurveTo(140, 255, 138, 200, 155, 168); ctx.stroke()
  clearShadow(ctx); ctx.restore()

  // Seat — wire mesh with cushion pad
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 28, 0, 18)
  ctx.strokeStyle = wireColor; ctx.lineWidth = 1.5
  const seatW = 80, seatY = 310
  for (let i = -4; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(cx + i * (seatW / 4.5), seatY - 4); ctx.lineTo(cx + i * (seatW / 5), seatY + 28); ctx.stroke()
    const yr = seatY + i * 7
    if (yr >= seatY - 2 && yr <= seatY + 28) {
      ctx.beginPath(); ctx.moveTo(cx - seatW * 0.85, yr); ctx.lineTo(cx + seatW * 0.85, yr); ctx.stroke()
    }
  }
  clearShadow(ctx); ctx.restore()

  // Floor line
  ctx.strokeStyle = 'rgba(100,140,180,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
}

/** Wicker / Rattan Chair — bohemian natural look with round frame */
function drawWicker(ctx) {
  const cx = 200, floor = 440

  const bg = ctx.createLinearGradient(0, 520, 400, 0)
  bg.addColorStop(0, '#0e0a06'); bg.addColorStop(1, '#1a1208')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 520)

  const glow = ctx.createRadialGradient(cx, 280, 30, cx, 280, 220)
  glow.addColorStop(0, 'rgba(190,145,70,0.15)'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  ctx.fillStyle = 'rgba(190,145,70,0.08)'
  ctx.beginPath(); ctx.ellipse(cx, floor + 16, 90, 14, 0, 0, Math.PI * 2); ctx.fill()

  // Legs — thin rattan
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 16, 6, 16)
  ctx.strokeStyle = '#a07838'; ctx.lineWidth = 7; ctx.lineCap = 'round'
  const rattanLegs = [[158, 350, 144, floor], [242, 350, 256, floor], [162, 350, 150, floor - 10], [238, 350, 250, floor - 10]]
  rattanLegs.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  clearShadow(ctx); ctx.restore()

  // Round rattan frame
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 28, 0, 16)
  ctx.strokeStyle = '#c49640'; ctx.lineWidth = 12; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.arc(cx, 240, 105, 0, Math.PI * 2); ctx.stroke()
  clearShadow(ctx); ctx.restore()

  // Rattan weave pattern inside circle
  ctx.save()
  ctx.beginPath(); ctx.arc(cx, 240, 98, 0, Math.PI * 2); ctx.clip()
  ctx.strokeStyle = 'rgba(160,120,48,0.5)'; ctx.lineWidth = 1
  for (let i = -12; i <= 12; i++) {
    ctx.beginPath(); ctx.moveTo(cx + i * 16, 130); ctx.lineTo(cx + i * 16, 350); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(90, 240 + i * 16); ctx.lineTo(310, 240 + i * 16); ctx.stroke()
  }
  // Diagonal weave
  ctx.strokeStyle = 'rgba(180,140,58,0.25)'; ctx.lineWidth = 1
  for (let i = -15; i <= 15; i++) {
    ctx.beginPath(); ctx.moveTo(cx + i * 14 - 100, 130); ctx.lineTo(cx + i * 14 + 100, 350); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx + i * 14 - 100, 350); ctx.lineTo(cx + i * 14 + 100, 130); ctx.stroke()
  }
  ctx.restore()

  // Seat cushion
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.5)', 20, 0, 12)
  const cGrad = ctx.createRadialGradient(cx, 348, 5, cx, 360, 70)
  cGrad.addColorStop(0, '#d4b880'); cGrad.addColorStop(1, '#9a7840')
  ctx.fillStyle = cGrad
  ctx.beginPath(); ctx.ellipse(cx, 356, 72, 22, 0, 0, Math.PI * 2); ctx.fill()
  clearShadow(ctx); ctx.restore()

  ctx.strokeStyle = 'rgba(190,145,70,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
}

/** Barcelona-style — flat tufted cushions on X-chrome frame */
function drawBarcelona(ctx) {
  const cx = 200, floor = 442

  const bg = ctx.createLinearGradient(0, 0, 0, 520)
  bg.addColorStop(0, '#0e0e12'); bg.addColorStop(1, '#050507')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 520)

  const glow = ctx.createRadialGradient(cx, 300, 20, cx, 300, 210)
  glow.addColorStop(0, 'rgba(150,130,200,0.12)'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  ctx.fillStyle = 'rgba(140,130,180,0.07)'
  ctx.beginPath(); ctx.ellipse(cx, floor + 14, 120, 16, 0, 0, Math.PI * 2); ctx.fill()

  // X-frame — chrome flat bars
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 22, 10, 20)
  const barW = 10
  // Left X
  const drawXBar = (x1, y1, x2, y2) => {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const dx = Math.sin(angle) * barW / 2, dy = -Math.cos(angle) * barW / 2
    const xg = ctx.createLinearGradient(x1, y1, x2, y2)
    xg.addColorStop(0, '#c8cdd5'); xg.addColorStop(0.5, '#e8ecf0'); xg.addColorStop(1, '#8890a0')
    ctx.fillStyle = xg
    ctx.beginPath()
    ctx.moveTo(x1 + dx, y1 + dy); ctx.lineTo(x2 + dx, y2 + dy)
    ctx.lineTo(x2 - dx, y2 - dy); ctx.lineTo(x1 - dx, y1 - dy)
    ctx.closePath(); ctx.fill()
  }
  drawXBar(118, 345, 282, 200) // diagonal 1
  drawXBar(118, 200, 282, 345) // diagonal 2
  drawXBar(118, 345, 282, 430) // front-left to front-right foot
  clearShadow(ctx); ctx.restore()

  // Seat cushions — 2 tufted pads side by side
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.65)', 30, 0, 20)
  const cushionGrad = ctx.createLinearGradient(115, 290, 285, 360)
  cushionGrad.addColorStop(0, '#3a3848'); cushionGrad.addColorStop(1, '#1e1c2c')
  ctx.fillStyle = cushionGrad
  ctx.beginPath(); ctx.roundRect(115, 315, 78, 38, 5); ctx.fill()
  ctx.beginPath(); ctx.roundRect(207, 315, 78, 38, 5); ctx.fill()
  // Tuft buttons
  ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ;[[154, 330], [246, 330], [176, 347], [224, 347]].forEach(([bx, by]) => {
      ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fill()
    })
  clearShadow(ctx); ctx.restore()

  // Backrest cushion — single wide tufted panel
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 28, -4, 12)
  const bCushion = ctx.createLinearGradient(120, 165, 280, 305)
  bCushion.addColorStop(0, '#44425a'); bCushion.addColorStop(1, '#22202e')
  ctx.fillStyle = bCushion
  ctx.beginPath(); ctx.roundRect(120, 172, 160, 136, [10, 10, 4, 4]); ctx.fill()
  // Grid tuft lines
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1
  for (let i = 1; i < 3; i++) {
    ctx.beginPath(); ctx.moveTo(120 + i * 53, 172); ctx.lineTo(120 + i * 53, 308); ctx.stroke()
  }
  for (let i = 1; i < 3; i++) {
    ctx.beginPath(); ctx.moveTo(120, 172 + i * 45); ctx.lineTo(280, 172 + i * 45); ctx.stroke()
  }
  // Tuft dots
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ;[[173, 217], [226, 217], [173, 262], [226, 262], [200, 192]].forEach(([bx, by]) => {
      ctx.beginPath(); ctx.arc(bx, by, 3.5, 0, Math.PI * 2); ctx.fill()
    })
  clearShadow(ctx); ctx.restore()

  ctx.strokeStyle = 'rgba(140,130,200,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
}

/** Tulip / Pedestal Chair — Saarinen-inspired single stem base */
function drawTulip(ctx) {
  const cx = 200, floor = 442

  const bg = ctx.createLinearGradient(0, 0, 0, 520)
  bg.addColorStop(0, '#111214'); bg.addColorStop(1, '#060708')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 520)

  const glow = ctx.createRadialGradient(cx, 350, 10, cx, 350, 160)
  glow.addColorStop(0, 'rgba(220,210,200,0.14)'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 400, 520)

  // Base disc — wide flat
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.7)', 28, 0, 20)
  const baseGrad = ctx.createRadialGradient(cx, floor + 5, 5, cx, floor, 85)
  baseGrad.addColorStop(0, '#d8d4cc'); baseGrad.addColorStop(0.6, '#a8a49c'); baseGrad.addColorStop(1, '#6a6860')
  ctx.fillStyle = baseGrad
  ctx.beginPath(); ctx.ellipse(cx, floor, 85, 16, 0, 0, Math.PI * 2); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Stem — single curved pedestal
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.5)', 20, 8, 12)
  const stemGrad = ctx.createLinearGradient(cx - 18, 340, cx + 18, 340)
  stemGrad.addColorStop(0, '#d0ccc4'); stemGrad.addColorStop(0.5, '#f0ece4'); stemGrad.addColorStop(1, '#9a9890')
  ctx.fillStyle = stemGrad
  ctx.beginPath()
  ctx.moveTo(cx - 16, floor - 4)
  ctx.bezierCurveTo(cx - 20, 410, cx - 24, 380, cx - 14, 340)
  ctx.lineTo(cx + 14, 340)
  ctx.bezierCurveTo(cx + 24, 380, cx + 20, 410, cx + 16, floor - 4)
  ctx.closePath(); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Shell seat — round organic
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.6)', 35, 0, 20)
  const shellGrad = ctx.createRadialGradient(cx - 20, 298, 10, cx, 315, 110)
  shellGrad.addColorStop(0, '#f5f0e8'); shellGrad.addColorStop(0.5, '#d8d2c8'); shellGrad.addColorStop(1, '#9a9590')
  ctx.fillStyle = shellGrad
  ctx.beginPath()
  ctx.moveTo(cx - 90, 318)
  ctx.bezierCurveTo(cx - 92, 295, cx - 80, 258, cx - 60, 230)
  ctx.bezierCurveTo(cx - 30, 195, cx + 30, 195, cx + 60, 230)
  ctx.bezierCurveTo(cx + 80, 258, cx + 92, 295, cx + 90, 318)
  ctx.bezierCurveTo(cx + 70, 342, cx - 70, 342, cx - 90, 318)
  ctx.closePath(); ctx.fill()
  // Inner sheen
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.beginPath()
  ctx.moveTo(cx - 50, 310)
  ctx.bezierCurveTo(cx - 55, 285, cx - 40, 248, cx - 20, 230)
  ctx.bezierCurveTo(cx - 5, 218, cx + 10, 222, cx + 5, 238)
  ctx.bezierCurveTo(cx - 15, 260, cx - 28, 285, cx - 32, 308)
  ctx.closePath(); ctx.fill()
  clearShadow(ctx); ctx.restore()

  // Cushion pad
  ctx.save()
  shadow(ctx, 'rgba(0,0,0,0.4)', 16, 0, 10)
  const padGrad = ctx.createRadialGradient(cx, 318, 4, cx, 322, 60)
  padGrad.addColorStop(0, '#e8e4dc'); padGrad.addColorStop(1, '#c0bcb4')
  ctx.fillStyle = padGrad
  ctx.beginPath(); ctx.ellipse(cx, 320, 60, 16, 0, 0, Math.PI * 2); ctx.fill()
  clearShadow(ctx); ctx.restore()

  ctx.strokeStyle = 'rgba(220,210,200,0.1)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, floor + 2); ctx.lineTo(340, floor + 2); ctx.stroke()
}

/* ─── Brand label ─────────────────────────────────────────────── */
function drawLabel(ctx, name, tag, price) {
  // Semi-transparent bottom bar
  const labelGrad = ctx.createLinearGradient(0, 400, 0, 520)
  labelGrad.addColorStop(0, 'transparent')
  labelGrad.addColorStop(0.4, 'rgba(0,0,0,0.7)')
  labelGrad.addColorStop(1, 'rgba(0,0,0,0.92)')
  ctx.fillStyle = labelGrad
  ctx.fillRect(0, 390, 400, 130)

  // Tag pill
  ctx.fillStyle = 'rgba(180,140,80,0.85)'
  ctx.beginPath(); ctx.roundRect(20, 418, tag.length * 7 + 20, 18, 9); ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = '600 9px "Inter", sans-serif'
  ctx.letterSpacing = '0.12em'
  ctx.fillText(tag.toUpperCase(), 30, 430)

  // Chair name
  ctx.fillStyle = '#f0ece4'
  ctx.font = '700 17px "Inter", sans-serif'
  ctx.fillText(name, 20, 464)

  // Price
  ctx.fillStyle = 'rgba(200,172,144,0.85)'
  ctx.font = '500 13px "Inter", sans-serif'
  ctx.fillText(`$${price.toLocaleString()}`, 20, 484)

  // Arrow button hint
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath(); ctx.arc(360, 462, 20, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(351, 462); ctx.lineTo(369, 462); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(362, 455); ctx.lineTo(369, 462); ctx.lineTo(362, 469); ctx.stroke()
}

/* ─── Public API ──────────────────────────────────────────────── */
const DRAWERS = {
  nordic: drawNordic,
  leather: drawLeather,
  velvet: drawVelvet,
  wire: drawWire,
  wicker: drawWicker,
  barcelona: drawBarcelona,
  tulip: drawTulip,
  // fallback
  lunar: drawNordic,
  ember: drawLeather,
  verdant: drawVelvet,
  ash: drawWire,
  tide: drawWicker,
  gold: drawBarcelona,
  geo: drawTulip,
}

export function generateArtwork(pattern, _color, product = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = 400; canvas.height = 520
  const ctx = canvas.getContext('2d')

  // Draw matching chair
  const drawer = DRAWERS[pattern] || drawNordic
  drawer(ctx)

  // Film grain
  grain(ctx, 400, 520, 3000)

  // Product label overlay
  if (product.name) {
    drawLabel(ctx, product.name, product.tag || '', product.price || 0)
  }

  return canvas.toDataURL()
}
