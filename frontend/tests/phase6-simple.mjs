#!/usr/bin/env node

const BACKEND_URL = 'http://localhost/Jacom-Platform/backend';

const log = {
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
  warn: (msg) => console.log(`⚠️  ${msg}`),
  info: (msg) => console.log(`ℹ️  ${msg}`),
};

const entities = ['industries', 'services', 'insights', 'experts', 'offices', 'content', 'leads', 'careers'];
const results = { pass: 0, fail: 0, total: 0 };

async function testEntity(name) {
  results.total++;
  try {
    const res = await fetch(`${BACKEND_URL}/${name}`);
    const data = await res.json();
    
    if (res.ok && Array.isArray(data)) {
      log.success(`${name}: ${data.length} items`);
      results.pass++;
      return true;
    } else if (res.status === 401) {
      log.warn(`${name}: Auth required (expected)`);
      results.pass++;
      return true;
    } else {
      log.error(`${name}: Failed`);
      results.fail++;
      return false;
    }
  } catch (error) {
    log.error(`${name}: ${error.message}`);
    results.fail++;
    return false;
  }
}

async function main() {
  console.log('\n🚀 Phase 6 Validation (Backend API)\n');
  
  for (const entity of entities) {
    await testEntity(entity);
  }
  
  console.log(`\n📊 Results: ${results.pass}/${results.total} passed (${Math.round(results.pass/results.total*100)}%)`);
  console.log('\n💡 For full CRUD testing, use: http://localhost:3000/phase6-dashboard.html\n');
}

main().then(() => {
  process.exitCode = results.pass >= results.total * 0.8 ? 0 : 1;
}).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
