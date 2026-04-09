import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting UI Test with Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate home
    await page.goto('http://localhost:5173');
    console.log('Loaded Landing Page. Verifying React mounting...');

    // Wait for the Hero section text to confirm React has hydrated successfully
    await page.waitForSelector('span.bg-clip-text', { timeout: 5000 });
    
    // Find get started link
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await page.waitForSelector('input[name="email"]');
    
    console.log('Navigated to Register. Filling out Auth form...');
    
    // Fill out the registration form
    const randomSuffix = Math.floor(Math.random() * 10000);
    const testEmail = `ui_test${randomSuffix}@test.com`;
    
    await page.type('input[name="name"]', 'UI Bot Test');
    await page.type('input[name="email"]', testEmail);
    await page.type('input[name="password"]', 'password123');
    await page.type('input[name="contactNumber"]', '9999999999');
    
    // Submit registration
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}) // The SPA doesn't actually trigger network navigation visually but changes route state. We wait for DOM instead.
    ]);
    
    console.log('Submitted UI form. Waiting for Dashboard transition...');
    
    // Wait for the route to change to Donor Dashboard
    await page.waitForSelector('h1', { timeout: 8000 });
    const content = await page.content();
    if (content.includes('Donor Dashboard')) {
      console.log('Success! Client-side router successfully transitioned context to Donor Dashboard.');
    } else {
      throw new Error('Did not transition to Donor Dashboard properly.');
    }
    
    // Verify LocalStorage Contains Token
    const jwtToken = await page.evaluate(() => localStorage.getItem('token'));
    if (jwtToken) {
      console.log(`Verified LocalStorage! Session token successfully isolated & stored in browser: ${jwtToken.substring(0, 15)}...`);
    } else {
      throw new Error('Local Storage does not contain the JWT token!');
    }
    
    console.log('--- UI FRONT-END TESTS PASSED SUCCESSFULLY! ---');
  } catch (error) {
    console.error('UI Test Failed:', error);
  } finally {
    await browser.close();
  }
})();
