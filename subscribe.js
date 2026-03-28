const MAILERLITE_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWQ4MGE3YmY5NGI4YWVhZDI1ZDgzNzNlNWViNjZmODE1YzRlODU1YmI3ZjRjMmU0ZmVjMzNlMWFlNmMyNzEyYTg3NTNhNzc4MTI5ZjEwNDciLCJpYXQiOjE3NzQxNTIzMjAuODI1ODgxLCJuYmYiOjE3NzQxNTIzMjAuODI1ODgzLCJleHAiOjQ5Mjk4MjU5MjAuODE5MjE4LCJzdWIiOiIyMjMxNTE0Iiwic2NvcGVzIjpbXX0.alStwJgz5J4taZ2r1rQ4gHrtjDaqO32MjapXbBiizrKmwUHz-I3AbwzecvI_mZL-vo7zoQgTNH0V9sxPtIMLXLzG4eoppM6FeqRGy4FUMulpc9OE8d5cpV6gXcmdfqzvTgSmJTh9JccT3PHVw7k3v5DPC2c98URpRCOVjoC2vdSBh5YJJnMqsTXdz3pa40GLlFHOwwRTES6Sg4qz_biORN6RN8CKQVxwNvX0yzrxti4hwJaSb0YXzjmhSUZKKngNMKbg64uqQHECUiNhy1kr2FGq2F7oU3iOMPN3hdTc68HZVMaAgBOhbgunwYb43KO94DitFOWRuQNOabF6D_spoK07JxExgpmHg7qQ76hkudOuH3Fy4oas9DATw9yn2FpFU-HUHpW-75Li6ljLIi41luBOxZZvGP57M6bvEkpQA2x0lfz2zfsYLNAgNHUFLUeGGEWZd6uQdeAdn7EWfNqG5Vo5MJjJz47JRJH7HiNwmeOI4Pus_oDElxjU-SYgbrHBgXinuf7gNmr7YhUhsqFNQnOFxIz1XQ9T74abPvkHDKAg6kpbIULyFohB1GnD6Yid3BbXzRtBU26pZdRDKooSVZ4LtsA3U0aSvGT3v7YMz0EchVEYbOn60nvDR5w_BnLCGF1f5m7unDklAz-OPb3zNLz-MWTiUwO7fiB4ggyvEns";
const BREVO_KEY = "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";

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { nombre, email, telefono, mood } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  try {
    // 1. Save to MailerLite
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_TOKEN}`
      },
      body: JSON.stringify({
        email,
        fields: { name: nombre || '', phone: telefono || '' },
        status: 'active'
      })
    });

    // 2. Send welcome email via Brevo
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0D1B3E,#0A2550);padding:40px;text-align:center;border-bottom:1px solid rgba(201,169,110,.3);">
          <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A96E;margin:0 0 12px;">Agencia Certificada · Hotel Xcaret Arte</p>
          <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:300;color:#F5F2EC;margin:0;line-height:1.2;">VIP <em style="color:#C9A96E;">Experiences</em></h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111;padding:48px 40px;">
          <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin:0 0 20px;">✦ Bienvenido al club VIP</p>
          <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:#F5F2EC;margin:0 0 24px;line-height:1.3;">Hola ${nombre || 'viajero'}, <br><em style="color:#C9A96E;">tu experiencia comienza ahora.</em></h2>
          
          <p style="font-size:15px;font-weight:300;line-height:1.85;color:rgba(245,242,236,.75);margin:0 0 24px;">Gracias por unirte a VIP Experiences — la agencia certificada por Hoteles Xcaret que diseña experiencias para adultos que saben lo que quieren.</p>

          <div style="background:rgba(201,169,110,.08);border-left:3px solid #C9A96E;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C9A96E;margin:0 0 10px;">🎁 Tu acceso exclusivo está activado</p>
            <p style="font-size:14px;font-weight:300;line-height:1.75;color:rgba(245,242,236,.85);margin:0;">Pronto recibirás la invitación a nuestros <strong style="color:#C9A96E;">webinars privados con el staff del Hotel Xcaret Arte</strong> — los insiders que revelan cómo conseguir upgrades, las mejores mesas y los secretos que los turistas no conocen.</p>
          </div>

          <p style="font-size:15px;font-weight:300;line-height:1.85;color:rgba(245,242,236,.75);margin:0 0 32px;">¿Ya tienes fechas en mente? Un especialista VIP está listo para armar tu propuesta personalizada en menos de 24 horas.</p>

          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="background:#C9A96E;padding:16px 36px;">
              <a href="https://wa.me/5219983935261?text=Hola%2C%20acabo%20de%20registrarme%20en%20VIP%20Experiences%20y%20quiero%20saber%20m%C3%A1s" style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#0a0a0a;text-decoration:none;font-weight:600;">Hablar con mi especialista VIP →</a>
            </td></tr>
          </table>

          <div style="border-top:1px solid rgba(201,169,110,.15);padding-top:28px;">
            <p style="font-size:13px;font-weight:300;line-height:1.75;color:rgba(245,242,236,.5);margin:0;">
              ✦ Agencia certificada por Hoteles Xcaret<br>
              📧 ventas.experienciasvip@gmail.com<br>
              💬 wa.me/5219983935261<br>
              🌐 vip-experiences.vercel.app
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0a0a0a;padding:24px 40px;text-align:center;border-top:1px solid rgba(201,169,110,.1);">
          <p style="font-size:11px;color:rgba(245,242,236,.3);margin:0;letter-spacing:1px;">© 2025 VIP Experiences · Solo Adultos +16 · Riviera Maya</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_KEY
      },
      body: JSON.stringify({
        sender: { name: 'VIP Experiences', email: 'ventas.experienciasvip@gmail.com' },
        to: [{ email, name: nombre || '' }],
        subject: '✦ Bienvenido al club VIP — Tu acceso exclusivo está aquí',
        htmlContent: emailHtml
      })
    });

    res.status(200).json({ success: true });

  } catch(err) {
    console.error(err);
    res.status(200).json({ success: false, error: err.message });
  }
};
