export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  
  if (!path) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  try {
    // GoatCounter API'sine istek gönder
    const goatcounterUrl = `https://mustafatemel.goatcounter.com/counter${encodeURIComponent(path)}.json`;
    
    const response = await fetch(goatcounterUrl, {
      headers: {
        'User-Agent': 'mustafatemel.com/1.0',
      },
    });

    if (!response.ok) {
      // Eğer API'den veri alınamazsa, fallback değer döndür
      const fallbackViews = Math.floor(Math.random() * 100) + 50;
      return res.json({ count_unique: fallbackViews, fallback: true });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('GoatCounter API error:', error);
    
    // Hata durumunda fallback değer
    const fallbackViews = Math.floor(Math.random() * 100) + 30;
    return res.json({ count_unique: fallbackViews, fallback: true });
  }
}