// Phase 2: Backend API Smoke Tests
// Tests critical endpoints with retry logic and structured output

const BACKEND_URL = process.env.BACKEND_BASE_URL || 'http://localhost/Jacom-Platform/backend';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`  ⚠️  Retry ${i + 1}/${retries - 1} after error: ${error.message}`);
      await sleep(RETRY_DELAY);
    }
  }
}

const tests = [
  {
    name: 'Health Check',
    url: '',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => data.message === 'API is running'
  },
  {
    name: 'Industries - List',
    url: '/industries',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Services - List',
    url: '/services',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Insights - List',
    url: '/insights',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Experts - List',
    url: '/experts',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Offices - List',
    url: '/offices',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Careers - List',
    url: '/careers',
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data) => Array.isArray(data)
  },
  {
    name: 'Leads - Create (Public)',
    url: '/leads',
    method: 'POST',
    body: {
      name: 'Smoke Test Lead',
      email: 'smoketest@example.com',
      message: 'Automated smoke test',
      source: 'smoke-test'
    },
    expectedStatus: 201,
    validateResponse: (data) => data.success === true && data.id
  },
  {
    name: 'Leads - List (No Auth)',
    url: '/leads',
    method: 'GET',
    expectedStatus: 401,
    validateResponse: (data) => data.error
  },
  {
    name: 'Invalid Endpoint',
    url: '/nonexistent',
    method: 'GET',
    expectedStatus: 404,
    validateResponse: (data) => data.error === 'Endpoint not found'
  }
];

async function runTest(test) {
  const url = `${BACKEND_URL}${test.url}`;
  const options = {
    method: test.method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (test.body) {
    options.body = JSON.stringify(test.body);
  }

  try {
    const response = await fetchWithRetry(url, options);
    const data = await response.json();

    const statusMatch = response.status === test.expectedStatus;
    const responseValid = test.validateResponse ? test.validateResponse(data) : true;

    return {
      name: test.name,
      passed: statusMatch && responseValid,
      status: response.status,
      expectedStatus: test.expectedStatus,
      data,
      error: null
    };
  } catch (error) {
    return {
      name: test.name,
      passed: false,
      status: null,
      expectedStatus: test.expectedStatus,
      data: null,
      error: error.message
    };
  }
}

async function runAllTests() {
  console.log('========================================');
  console.log('Phase 2: Backend API Smoke Tests');
  console.log('========================================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Max Retries: ${MAX_RETRIES}`);
  console.log('========================================\n');

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`Testing: ${test.name}... `);
    const result = await runTest(test);
    results.push(result);

    if (result.passed) {
      console.log('✅ PASS');
      passed++;
    } else {
      console.log('❌ FAIL');
      console.log(`  Expected: ${result.expectedStatus}, Got: ${result.status || 'ERROR'}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
      failed++;
    }
  }

  console.log('\n========================================');
  console.log('Test Summary');
  console.log('========================================');
  console.log(`Total: ${tests.length}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log('========================================\n');

  // JSON output for CI
  const jsonOutput = {
    timestamp: new Date().toISOString(),
    backendUrl: BACKEND_URL,
    summary: { total: tests.length, passed, failed },
    results
  };

  if (process.env.OUTPUT_JSON) {
    console.log(JSON.stringify(jsonOutput, null, 2));
  }

  // Write results to file for CI artifacts
  import('fs').then(fs => {
    fs.writeFileSync('test-results.json', JSON.stringify(jsonOutput, null, 2));
  });

  // Exit with error code if any tests failed
  if (failed > 0) {
    process.exitCode = 1;
  }
}

runAllTests();
