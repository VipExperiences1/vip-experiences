export default async function handler(req, res) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

  const { name, phone, dates, guests, email, budget } = req.body;

  if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
  }

    try {
          // Create contact
      const contactRes = await fetch('https://api-c.kommo.com/v4/contacts', {
              method: 'POST',
              headers: {
                        'Authorization': `Bearer ${process.env.KOMMO_API_TOKEN}`,
                        'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                        name: name,
                                           custom_fields_values: [
          { field_id: 1, values: [{ value: phone }] },
                                                       email ? { field_id: 2, values: [{ value: email }] } : null,
                                                                          budget ? { field_id: 3, values: [{ value: budget }] } : null,
                                                       dates ? { field_id: 4, values: [{ value: dates }] } : null,
                                                       guests ? { field_id: 5, values: [{ value: guests }] } : null,
                                                     ].filter(Boolean)
              })
      });

            const contactData = await contactRes.json();
    const contactId = contactData.id;

      // Create lead
      const leadRes = await fetch('https://api-c.kommo.com/v4/leads', {
              method: 'POST',
                                                                       headers: {
                                                                                 'Authorization': `Bearer ${process.env.KOMMO_API_TOKEN}`,
                                                                                 'Content-Type': 'application/json',
                                                                       },
              body: JSON.stringify({
                        name: `Xcaret - ${name}`,
                        contact_id: contactId,
                        status_id: 143,
                        pipeline_id: 13545211,
                        created_at: Math.floor(Date.now() / 1000),
                        custom_fields_values: [
                          { field_id: 61, values: [{ value: 'hotel-xcaret' }] },
                          { field_id: 61, values: [{ value: 'vip-experiences' }] },
                          { field_id: 61, values: [{ value: 'paquete-vip' }] }
                                  ]
              })
      });

      const leadData = await leadRes.json();

      return res.status(200).json({
              success: true,
              contactId: contactId,
              leadId: leadData.id,
              message: 'Lead created successfully'
      });

    } catch (error) {
          console.error('Error creating lead:', error);
          return res.status(500).json({ 
                                            error: 'Failed to create lead',
                  details: error.message 
          });
    }
}
