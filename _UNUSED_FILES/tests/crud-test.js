// CRUD Operations Test Script
// Run in browser console on admin page after login

const API_BASE = 'http://localhost/Jacom-Platform/backend';

const testCRUD = async () => {
  console.log('🧪 Starting CRUD Tests...\n');

  // Test 1: Industries CRUD
  console.log('📋 Testing Industries...');
  try {
    const industries = await fetch(`${API_BASE}/industries`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Industries:', industries.length, 'items');
    
    if (industries[0]) {
      const industry = await fetch(`${API_BASE}/industries/${industries[0].slug}`, { credentials: 'include' }).then(r => r.json());
      console.log('✅ GET Industry by slug:', industry.name);
    }
  } catch (e) {
    console.error('❌ Industries failed:', e.message);
  }

  // Test 2: Services CRUD
  console.log('\n📋 Testing Services...');
  try {
    const services = await fetch(`${API_BASE}/services`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Services:', services.length, 'items');
  } catch (e) {
    console.error('❌ Services failed:', e.message);
  }

  // Test 3: Leads CRUD
  console.log('\n📋 Testing Leads...');
  try {
    const leads = await fetch(`${API_BASE}/leads`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Leads:', leads.length, 'items');

    // Create test lead
    const newLead = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: 'Test Lead',
        email: 'test@example.com',
        company: 'Test Corp',
        message: 'Test message',
        status: 'new'
      })
    }).then(r => r.json());
    console.log('✅ CREATE Lead:', newLead.id);

    // Update lead
    await fetch(`${API_BASE}/leads/${newLead.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: 'in_progress' })
    });
    console.log('✅ UPDATE Lead:', newLead.id);

    // Delete lead
    await fetch(`${API_BASE}/leads/${newLead.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    console.log('✅ DELETE Lead:', newLead.id);
  } catch (e) {
    console.error('❌ Leads failed:', e.message);
  }

  // Test 4: Content
  console.log('\n📋 Testing Content...');
  try {
    const content = await fetch(`${API_BASE}/content`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Content:', content.length, 'items');
  } catch (e) {
    console.error('❌ Content failed:', e.message);
  }

  // Test 5: Experts
  console.log('\n📋 Testing Experts...');
  try {
    const experts = await fetch(`${API_BASE}/experts`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Experts:', experts.length, 'items');
  } catch (e) {
    console.error('❌ Experts failed:', e.message);
  }

  // Test 6: Insights
  console.log('\n📋 Testing Insights...');
  try {
    const insights = await fetch(`${API_BASE}/insights`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Insights:', insights.length, 'items');
  } catch (e) {
    console.error('❌ Insights failed:', e.message);
  }

  // Test 7: Offices
  console.log('\n📋 Testing Offices...');
  try {
    const offices = await fetch(`${API_BASE}/offices`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Offices:', offices.length, 'items');
  } catch (e) {
    console.error('❌ Offices failed:', e.message);
  }

  // Test 8: Careers
  console.log('\n📋 Testing Careers...');
  try {
    const careers = await fetch(`${API_BASE}/careers`, { credentials: 'include' }).then(r => r.json());
    console.log('✅ GET Careers:', careers.length, 'items');
  } catch (e) {
    console.error('❌ Careers failed:', e.message);
  }

  console.log('\n✨ CRUD Tests Complete!');
};

// Run tests
testCRUD();
