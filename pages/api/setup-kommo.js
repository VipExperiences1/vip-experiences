// Setup Kommo CRM Integration
async function setupKommoTags() {
    const API_TOKEN = process.env.KOMMO_API_TOKEN;
    const ACCOUNT_ID = process.env.KOMMO_ACCOUNT_ID;

  const customFields = [
    { id: 1, name: 'Teléfono', field_type: 'phone' },
    { id: 2, name: 'Email', field_type: 'email' },
    { id: 3, name: 'Presupuesto', field_type: 'text' },
    { id: 4, name: 'Fechas de viaje', field_type: 'text' },
    { id: 5, name: 'Número de huéspedes', field_type: 'text' }
      ];

  try {
        for (const field of customFields) {
                const response = await fetch(`https://api-c.kommo.com/v4/custom_fields/contacts`, {
                          method: 'POST',
                          headers: {
                                      'Authorization': `Bearer ${API_TOKEN}`,
                                      'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                                      name: field.name,
                                      field_type: field.field_type,
                          })
                });

          if (!response.ok) {
                    console.warn(`Field ${field.name} may already exist`);
          }
        }
                                console.log('Kommo custom fields setup complete');
  } catch (error) {
        console.error('Error setting up Kommo fields:', error);
  }
                            }

// Configure Kommo webhook for form submissions
function configureWebhook() {
    const webhookUrl = process.env.KOMMO_WEBHOOK_URL;
    // This would typically be done through the Kommo admin panel
  // But you can document the webhook URL for manual setup
  return {
        webhook_url: webhookUrl,
        events: ['contact.created', 'contact.updated', 'lead.created'],
        description: 'Xcaret Arte landing page form submissions'
  };
}

            module.exports = { setupKommoTags, configureWebhook };
