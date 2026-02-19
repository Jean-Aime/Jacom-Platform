#!/usr/bin/env node

/**
 * Phase 6: Automated Validation Script
 * Tests all admin panels in both frontend and backend modes
 */

const BACKEND_URL = 'http://localhost/Jacom-Platform/backend';
const FRONTEND_URL = 'http://localhost:3000';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
};

const results = {
  frontend: {},
  backend: {},
  issues: [],
};

// Test configuration
const entities = [
  { name: 'industries', hasRelations: true, hasCRUD: true },
  { name: 'services', hasRelations: true, hasCRUD: true },
  { name: 'insights', hasRelations: true, hasCRUD: true },
  { name: 'experts', hasRelations: true, hasCRUD: true },
  { name: 'offices', hasRelations: false, hasCRUD: true },
  { name: 'content', hasRelations: false, hasCRUD: true, usesKey: true },
  { name: 'leads', hasRelations: false, hasCRUD: false }, // Read-only
  { name: 'careers', hasRelations: false, hasCRUD: true },
];

async function testEndpoint(url, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    const data = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data,
      error: response.ok ? null : data.error || 'Unknown error',
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: null,
      error: error.message,
    };
  }
}

async function testBackendAPI() {
  log.info('Testing Backend API Mode...\n');

  for (const entity of entities) {
    const entityName = entity.name.charAt(0).toUpperCase() + entity.name.slice(1);
    console.log(`\n📦 Testing ${entityName}...`);

    results.backend[entity.name] = {
      list: false,
      create: false,
      update: false,
      delete: false,
      relations: false,
    };

    // Test LIST
    const listResult = await testEndpoint(`${BACKEND_URL}/${entity.name}`);
    if (listResult.success && Array.isArray(listResult.data)) {
      log.success(`${entityName}: List works (${listResult.data.length} items)`);
      results.backend[entity.name].list = true;

      // Check relations
      if (entity.hasRelations && listResult.data.length > 0) {
        const firstItem = listResult.data[0];
        const hasRelations = 
          (entity.name === 'industries' && (firstItem.services || firstItem.experts || firstItem.insights)) ||
          (entity.name === 'services' && (firstItem.industries || firstItem.experts || firstItem.insights)) ||
          (entity.name === 'insights' && (firstItem.industries || firstItem.services || firstItem.author)) ||
          (entity.name === 'experts' && (firstItem.industries || firstItem.services));
        
        if (hasRelations) {
          log.success(`${entityName}: Relations loaded`);
          results.backend[entity.name].relations = true;
        } else {
          log.warn(`${entityName}: Relations missing`);
          results.issues.push(`Backend ${entityName}: Relations not loaded`);
        }
      }
    } else {
      log.error(`${entityName}: List failed - ${listResult.error}`);
      results.issues.push(`Backend ${entityName}: List failed - ${listResult.error}`);
    }

    // Test CREATE (if applicable)
    if (entity.hasCRUD) {
      const testData = generateTestData(entity.name);
      const createResult = await testEndpoint(`${BACKEND_URL}/${entity.name}`, 'POST', testData);
      
      if (createResult.success) {
        log.success(`${entityName}: Create works`);
        results.backend[entity.name].create = true;

        const createdId = createResult.data.id || createResult.data[entity.usesKey ? 'key' : 'id'];

        // Test UPDATE
        if (createdId) {
          const updateData = { ...testData, name: testData.name + ' Updated' };
          const updateResult = await testEndpoint(
            `${BACKEND_URL}/${entity.name}/${createdId}`,
            'PUT',
            updateData
          );

          if (updateResult.success) {
            log.success(`${entityName}: Update works`);
            results.backend[entity.name].update = true;
          } else {
            log.error(`${entityName}: Update failed - ${updateResult.error}`);
            results.issues.push(`Backend ${entityName}: Update failed - ${updateResult.error}`);
          }

          // Test DELETE
          const deleteResult = await testEndpoint(
            `${BACKEND_URL}/${entity.name}/${createdId}`,
            'DELETE'
          );

          if (deleteResult.success) {
            log.success(`${entityName}: Delete works`);
            results.backend[entity.name].delete = true;
          } else {
            log.error(`${entityName}: Delete failed - ${deleteResult.error}`);
            results.issues.push(`Backend ${entityName}: Delete failed - ${deleteResult.error}`);
          }
        }
      } else {
        log.error(`${entityName}: Create failed - ${createResult.error}`);
        results.issues.push(`Backend ${entityName}: Create failed - ${createResult.error}`);
      }
    }
  }
}

async function testFrontendAPI() {
  log.info('\nTesting Frontend API Mode...\n');

  for (const entity of entities) {
    const entityName = entity.name.charAt(0).toUpperCase() + entity.name.slice(1);
    console.log(`\n📦 Testing ${entityName}...`);

    results.frontend[entity.name] = {
      list: false,
      create: false,
      update: false,
      delete: false,
    };

    // Test LIST
    const listResult = await testEndpoint(`${FRONTEND_URL}/api/${entity.name}`);
    if (listResult.success && Array.isArray(listResult.data)) {
      log.success(`${entityName}: List works (${listResult.data.length} items)`);
      results.frontend[entity.name].list = true;
    } else {
      log.error(`${entityName}: List failed - ${listResult.error}`);
      results.issues.push(`Frontend ${entityName}: List failed - ${listResult.error}`);
    }

    // Test CREATE (if applicable)
    if (entity.hasCRUD) {
      const testData = generateTestData(entity.name);
      const createResult = await testEndpoint(`${FRONTEND_URL}/api/${entity.name}`, 'POST', testData);
      
      if (createResult.success) {
        log.success(`${entityName}: Create works`);
        results.frontend[entity.name].create = true;

        const createdId = createResult.data.id || createResult.data[entity.usesKey ? 'key' : 'id'];

        // Test UPDATE
        if (createdId) {
          const updateData = { ...testData, name: testData.name + ' Updated' };
          const updateResult = await testEndpoint(
            `${FRONTEND_URL}/api/${entity.name}?${entity.usesKey ? 'key' : 'id'}=${createdId}`,
            'PUT',
            updateData
          );

          if (updateResult.success) {
            log.success(`${entityName}: Update works`);
            results.frontend[entity.name].update = true;
          } else {
            log.error(`${entityName}: Update failed - ${updateResult.error}`);
            results.issues.push(`Frontend ${entityName}: Update failed - ${updateResult.error}`);
          }

          // Test DELETE
          const deleteResult = await testEndpoint(
            `${FRONTEND_URL}/api/${entity.name}?${entity.usesKey ? 'key' : 'id'}=${createdId}`,
            'DELETE'
          );

          if (deleteResult.success) {
            log.success(`${entityName}: Delete works`);
            results.frontend[entity.name].delete = true;
          } else {
            log.error(`${entityName}: Delete failed - ${deleteResult.error}`);
            results.issues.push(`Frontend ${entityName}: Delete failed - ${deleteResult.error}`);
          }
        }
      } else {
        log.error(`${entityName}: Create failed - ${createResult.error}`);
        results.issues.push(`Frontend ${entityName}: Create failed - ${createResult.error}`);
      }
    }
  }
}

function generateTestData(entityName) {
  const timestamp = Date.now();
  
  const testData = {
    industries: {
      name: `Test Industry ${timestamp}`,
      slug: `test-industry-${timestamp}`,
      description: 'Test description',
      overview: 'Test overview',
      featured: false,
    },
    services: {
      name: `Test Service ${timestamp}`,
      slug: `test-service-${timestamp}`,
      description: 'Test description',
      overview: 'Test overview',
      featured: false,
    },
    insights: {
      title: `Test Insight ${timestamp}`,
      slug: `test-insight-${timestamp}`,
      type: 'Article',
      content: 'Test content',
      excerpt: 'Test excerpt',
      authorId: '1',
      readTime: 5,
      featured: false,
    },
    experts: {
      name: `Test Expert ${timestamp}`,
      slug: `test-expert-${timestamp}`,
      role: 'Test Role',
      bio: 'Test bio',
      featured: false,
    },
    offices: {
      name: `Test Office ${timestamp}`,
      slug: `test-office-${timestamp}`,
      region: 'North America',
      country: 'USA',
      city: 'Test City',
      address: 'Test Address',
      phone: '+1234567890',
      email: 'test@example.com',
      lat: 0,
      lng: 0,
    },
    content: {
      key: `test_key_${timestamp}`,
      page: 'home',
      section: 'test',
      type: 'text',
      content: 'Test content',
      order: 0,
    },
    careers: {
      title: `Test Career ${timestamp}`,
      slug: `test-career-${timestamp}`,
      department: 'Test Department',
      location: 'Test Location',
      type: 'Full-time',
      experience: 'Mid-level',
      description: 'Test description',
      requirements: JSON.stringify(['Test requirement']),
      benefits: JSON.stringify(['Test benefit']),
      featured: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  return testData[entityName];
}

function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 PHASE 6 VALIDATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  // Backend results
  console.log('🔧 Backend API Mode:');
  let backendPass = 0, backendTotal = 0;
  for (const [entity, tests] of Object.entries(results.backend)) {
    const passed = Object.values(tests).filter(Boolean).length;
    const total = Object.values(tests).length;
    backendPass += passed;
    backendTotal += total;
    console.log(`  ${entity}: ${passed}/${total} tests passed`);
  }
  console.log(`  Overall: ${backendPass}/${backendTotal} (${Math.round(backendPass/backendTotal*100)}%)\n`);

  // Frontend results
  console.log('🌐 Frontend API Mode:');
  let frontendPass = 0, frontendTotal = 0;
  for (const [entity, tests] of Object.entries(results.frontend)) {
    const passed = Object.values(tests).filter(Boolean).length;
    const total = Object.values(tests).length;
    frontendPass += passed;
    frontendTotal += total;
    console.log(`  ${entity}: ${passed}/${total} tests passed`);
  }
  console.log(`  Overall: ${frontendPass}/${frontendTotal} (${Math.round(frontendPass/frontendTotal*100)}%)\n`);

  // Issues
  if (results.issues.length > 0) {
    console.log('⚠️  Issues Found:');
    results.issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });
  } else {
    log.success('No issues found!');
  }

  // Final verdict
  console.log('\n' + '='.repeat(60));
  const totalPass = backendPass + frontendPass;
  const totalTests = backendTotal + frontendTotal;
  const passRate = Math.round(totalPass / totalTests * 100);

  if (passRate === 100) {
    log.success(`PHASE 6 COMPLETE: All tests passed (${totalPass}/${totalTests})`);
    console.log('✅ Ready for production rollout');
  } else if (passRate >= 80) {
    log.warn(`PHASE 6 PARTIAL: ${passRate}% tests passed (${totalPass}/${totalTests})`);
    console.log('⚠️  Review issues before production');
  } else {
    log.error(`PHASE 6 FAILED: Only ${passRate}% tests passed (${totalPass}/${totalTests})`);
    console.log('❌ Critical issues must be fixed');
  }
  console.log('='.repeat(60) + '\n');
}

async function main() {
  console.log('\n🚀 Starting Phase 6 Automated Validation\n');
  
  try {
    await testBackendAPI();
    await testFrontendAPI();
    printSummary();
    
    // Exit with appropriate code
    process.exit(results.issues.length === 0 ? 0 : 1);
  } catch (error) {
    log.error(`Fatal error: ${error.message}`);
    process.exit(1);
  }
}

main();
