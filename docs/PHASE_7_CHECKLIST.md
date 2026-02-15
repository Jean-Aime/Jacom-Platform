# Phase 7: Production Deployment Checklist

## Pre-Deployment (Day 0)

### Database
- [ ] Backup production database
- [ ] Verify backup integrity
- [ ] Test restore procedure
- [ ] Document rollback steps

### Code
- [ ] Merge all Phase 1-6 changes to main
- [ ] Tag release: `v1.0.0-backend-migration`
- [ ] Build production bundle: `npm run build`
- [ ] Test production build locally

### Environment
- [ ] Set `NEXT_PUBLIC_USE_BACKEND=true`
- [ ] Set `NEXT_PUBLIC_BACKEND_URL` to production URL
- [ ] Verify all environment variables
- [ ] Test configuration

### Monitoring
- [ ] Setup error tracking (Sentry/LogRocket)
- [ ] Configure performance monitoring
- [ ] Setup alerts (email/Slack)
- [ ] Test alert system

---

## Week 1: 10% Rollout (Days 1-7)

### Day 1: Deploy
```bash
# 1. Deploy backend (if not already)
# XAMPP already running

# 2. Deploy frontend
cd frontend
npm run build
pm2 start npm --name "jacom-frontend" -- start
# or
npm start
```

### Day 1-7: Monitor
- [ ] Check error logs daily
- [ ] Monitor response times
- [ ] Track user feedback
- [ ] Fix critical issues immediately

### Metrics to Track
- API response time: _____ ms (target: < 500ms)
- Error rate: _____ % (target: < 1%)
- Uptime: _____ % (target: > 99%)
- User complaints: _____ (target: 0)

---

## Week 2: 50% Rollout (Days 8-14)

### Day 8: Increase Traffic
- [ ] Review Week 1 metrics
- [ ] Fix any issues found
- [ ] Increase to 50% traffic
- [ ] Monitor closely

### Day 8-14: Monitor
- [ ] Daily metric reviews
- [ ] Performance optimization
- [ ] User feedback collection
- [ ] Bug fixes

### Metrics to Track
- API response time: _____ ms (target: < 500ms)
- Error rate: _____ % (target: < 0.5%)
- Uptime: _____ % (target: > 99.5%)
- User complaints: _____ (target: 0)

---

## Week 3: 100% Rollout (Days 15-21)

### Day 15: Full Migration
- [ ] Review Week 2 metrics
- [ ] Fix all known issues
- [ ] Enable for 100% traffic
- [ ] Full team on standby

### Day 15-21: Monitor
- [ ] Hourly monitoring (first 24h)
- [ ] Daily reviews
- [ ] Performance tuning
- [ ] User support

### Metrics to Track
- API response time: _____ ms (target: < 500ms)
- Error rate: _____ % (target: < 0.1%)
- Uptime: _____ % (target: > 99.9%)
- User complaints: _____ (target: 0)

---

## Week 4: Cleanup (Days 22-28)

### Remove Frontend API Routes
```bash
cd frontend/app/api
rm -rf industries services insights experts offices content leads careers
```

### Remove Feature Flag
```typescript
// frontend/lib/domain-api.ts
// Before:
const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';
const BASE_URL = USE_BACKEND ? backendUrl : '/api';

// After:
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
```

### Update Documentation
- [ ] Update README.md
- [ ] Update API docs
- [ ] Archive migration docs
- [ ] Update deployment guide

### Final Verification
- [ ] All tests passing
- [ ] No frontend API routes
- [ ] Feature flag removed
- [ ] Documentation updated

---

## Rollback Triggers

### Immediate Rollback If:
- Error rate > 5%
- Response time > 2000ms
- Database corruption
- Critical bug affecting all users
- Security breach

### Rollback Procedure:
```bash
# 1. Revert environment variable
NEXT_PUBLIC_USE_BACKEND=false

# 2. Restart frontend
pm2 restart jacom-frontend

# 3. Verify rollback
curl http://localhost:3000/api/industries

# 4. Notify team
```

---

## Success Criteria

### Technical ✅
- [ ] 99.9% uptime achieved
- [ ] < 500ms average response time
- [ ] < 0.1% error rate
- [ ] Zero data loss
- [ ] All CRUD operations working

### Business ✅
- [ ] Zero critical bugs
- [ ] No user complaints
- [ ] Performance improved
- [ ] Team satisfied
- [ ] Stakeholders happy

---

## Post-Deployment Report

### Metrics Summary
- Total requests: _____
- Average response time: _____ ms
- Error rate: _____ %
- Uptime: _____ %
- Issues resolved: _____

### Lessons Learned
1. _____________________________________
2. _____________________________________
3. _____________________________________

### Recommendations
1. _____________________________________
2. _____________________________________
3. _____________________________________

---

## Sign-Off

- [ ] Technical Lead: _________________ Date: _______
- [ ] DevOps: _________________ Date: _______
- [ ] Product Owner: _________________ Date: _______
- [ ] QA: _________________ Date: _______

---

**Phase 7 Status:** ⏳ Ready to Execute
**Start Date:** _____________
**Expected Completion:** _____________ (4 weeks)
