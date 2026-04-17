// Kommo Form Integration - Xcaret Arte Landing
// This script integrates a booking form with Kommo CRM lead capture

(function() {
    'use strict';

   // Create form HTML
   const formHTML = `
       <section id="kommo-booking-form" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 20px; margin: 40px 0; margin-top: 50px;">
             <div style="max-width: 500px; margin: 0 auto;">
                     <h2 style="color: white; text-align: center; margin-bottom: 10px; font-size: 28px; font-weight: 700;">🎯 Solicita tu cotización</h2>
                             <p style="color: rgba(255,255,255,0.9); text-align: center; margin-bottom: 30px; font-size: 15px;">Te responderemos en minutos con tu presupuesto personalizado</p>

                                             <form id="kommoBookingForm" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">

                                                                 <div style="margin-bottom: 20px;">
                                                                             <label for="koForm_name" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Nombre completo *</label>
                                                                                         <input type="text" id="koForm_name" name="name" placeholder="Tu nombre" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                   </div>

                                                                                                             <div style="margin-bottom: 20px;">
                                                                                                                         <label for="koForm_email" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Email *</label>
                                                                                                                                     <input type="email" id="koForm_email" name="email" placeholder="tu@email.com" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                                                               </div>
                                                                                                                                               
                                                                                                                                                         <div style="margin-bottom: 20px;">
                                                                                                                                                                     <label for="koForm_phone" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">WhatsApp/Teléfono *</label>
                                                                                                                                                                                 <input type="tel" id="koForm_phone" name="phone" placeholder="+52 998 153 3910" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                                                                                                           </div>
                                                                                                                                                                                           
                                                                                                                                                                                                     <div style="margin-bottom: 20px;">
                                                                                                                                                                                                                 <label for="koForm_dates" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Fechas de viaje</label>
                                                                                                                                                                                                                             <input type="text" id="koForm_dates" name="dates" placeholder="Ej: 15-20 junio 2025" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                                                                                                                                                       </div>
                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                 <div style="margin-bottom: 20px;">
                                                                                                                                                                                                                                                             <label for="koForm_guests" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Número de personas</label>
                                                                                                                                                                                                                                                                         <select id="koForm_guests" name="guests" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                                                                                                                                                                                                       <option value="">Selecciona cantidad</option>
                                                                                                                                                                                                                                                                                                     <option value="2">2 personas</option>
                                                                                                                                                                                                                                                                                                                   <option value="3">3 personas</option>
                                                                                                                                                                                                                                                                                                                                 <option value="4">4 personas</option>
                                                                                                                                                                                                                                                                                                                                               <option value="5+">5 o más</option>
                                                                                                                                                                                                                                                                                                                                                           </select>
                                                                                                                                                                                                                                                                                                                                                                     </div>
                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                               <div style="margin-bottom: 20px;">
                                                                                                                                                                                                                                                                                                                                                                                           <label for="koForm_budget" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Presupuesto aproximado (opcional)</label>
                                                                                                                                                                                                                                                                                                                                                                                                       <input type="text" id="koForm_budget" name="budget" placeholder="Ej: $5,000 - $10,000 USD" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box; font-family: inherit;">
                                                                                                                                                                                                                                                                                                                                                                                                                 </div>
                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                                           <button type="submit" style="width: 100%; padding: 14px; background: #667eea; color: white; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 16px; margin-bottom: 15px; font-family: inherit; transition: background 0.3s;">📨 Enviar cotización a Kommo</button>
                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                     <div id="koFormMessage" style="display: none; padding: 12px; border-radius: 4px; text-align: center; font-weight: 600; margin-bottom: 10px; font-size: 14px;"></div>
                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                               <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">🔒 Tus datos son privados · No hacemos spam</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                       </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                             </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                 </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                   `;

   // Insert form into page after #cotizar section
   function initializeForm() {
         const cotizarSection = document.querySelector('#cotizar');
         if (cotizarSection) {
                 const newSection = document.createElement('div');
                 newSection.innerHTML = formHTML;
                 cotizarSection.parentNode.insertBefore(newSection.firstElementChild, cotizarSection.nextSibling);
                 attachFormListeners();
         } else {
                 // Fallback: insert before footer
           const footer = document.querySelector('footer');
                 if (footer) {
                           const newSection = document.createElement('div');
                           newSection.innerHTML = formHTML;
                           footer.parentNode.insertBefore(newSection.firstElementChild, footer);
                           attachFormListeners();
                 }
         }
   }

   // Attach form submission handler
   function attachFormListeners() {
         const form = document.getElementById('kommoBookingForm');
         if (!form) return;

      form.addEventListener('submit', async function(e) {
              e.preventDefault();

                                  const formData = {
                                            name: document.getElementById('koForm_name').value,
                                            email: document.getElementById('koForm_email').value,
                                            phone: document.getElementById('koForm_phone').value,
                                            dates: document.getElementById('koForm_dates').value,
                                            guests: document.getElementById('koForm_guests').value,
                                            budget: document.getElementById('koForm_budget').value
                                  };

                                  const messageDiv = document.getElementById('koFormMessage');
              const btn = form.querySelector('button[type="submit"]');

                                  btn.disabled = true;
              btn.style.opacity = '0.6';

                                  try {
                                            const response = await fetch('/api/submit-lead', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify(formData)
                                            });

                const data = await response.json();

                if (response.ok) {
                            messageDiv.style.background = '#d4edda';
                            messageDiv.style.color = '#155724';
                            messageDiv.textContent = '✅ ¡Perfecto! Tu cotización llegó a Kommo. Te contactaremos en minutos.';
                            messageDiv.style.display = 'block';

                                              form.reset();

                                                                                   // Track in Google Analytics
                                              if (typeof gtag !== 'undefined') {
                                                            gtag('event', 'form_submission', {
                                                                            event_category: 'lead',
                                                                            event_label: 'kommo_booking_form'
                                                            });
                                              }

                                              // Save to localStorage
                                              localStorage.setItem('lastKommoSubmission', JSON.stringify({
                                                            ...formData,
                                                            timestamp: new Date().toISOString()
}));
                } else {
                            messageDiv.style.background = '#f8d7da';
                            messageDiv.style.color = '#721c24';
                            messageDiv.textContent = '⚠️ Error: ' + (data.error || 'Intenta de nuevo');
                            messageDiv.style.display = 'block';
                }
                                  } catch (error) {
                                            messageDiv.style.background = '#f8d7da';
                                            messageDiv.style.color = '#721c24';
                                            messageDiv.textContent = '⚠️ Error de conexión. Por favor intenta de nuevo.';
                                            messageDiv.style.display = 'block';
                                            console.error('Form submission error:', error);
                                  } finally {
                                            btn.disabled = false;
                                            btn.style.opacity = '1';
                                  }
      });
   }

   // Initialize when DOM is ready
   if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', initializeForm);
   } else {
         initializeForm();
   }
})();
