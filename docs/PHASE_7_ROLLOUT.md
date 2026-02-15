# Phase 7: Production Rollout Plan

## Objective
Gradually migrate from frontend API to backend API in production with zero downtime.

---

## Rollout Strategy: 4-Week Gradual Migration

### Week 1: 10% Backend Traffic
```bash
# .env.local (or environment variable)
NEXT_PUBLIC_USE_BACKEND=true
NEXT_PUBLIC_BACKEND_URL=http://localhost/Jacom-Platform/backend
```

**Actions:**
- Enable backend for admin users only
- Monitor error rates
- Track performance metrics
- Collect user feedback

**Success Criteria:**
- Error rate < 1%
- Response time < 500ms
- No critical bugs reported

### Week 2: 50% Backend Traffic
**Actions:**
- Enable for 50% of admin sessions
- Continue monitoring
- Fix any issues found in Week 1

**Success Criteria:**
- Error rate < 0.5%
- Performance stable
- User satisfaction maintained

### Week 3: 100% Backend Traffic
**Actions:**
- Enable for all admin users
- Full monitoring
- Prepare rollback plan

**Success Criteria:**
- Error rate < 0.1%
- All CRUD operations working
- No performance degradation

### Week 4: Cleanup
**Actions:**
- Remove frontend API routes
- Remove feature flag
- Update documentation
- Archive migration docs

---

## Monitoring Checklist

### Performance Metrics
- [ ] API response times (target: < 500ms)
- [ ] Database query performance
- [ ] Server CPU/Memory usage
- [ ] Network latency

### Error Tracking
- [ ] 4xx errors (client errors)
- [ ] 5xx errors (server errors)
- [ ] Failed CRUD operations
- [ ] Auth failures

### User Experience
- [ ] Admin panel load times
- [ ] CRUD operation success rates
- [ ] User-reported issues
- [ ] Browser console errors

---

## Rollback Procedure

### Immediate Rollback (< 5 minutes)
```bash
# .env.local
NEXT_PUBLIC_USE_BACKEND=false
```
Restart Next.js server.

### Code Rollback (< 30 minutes)
```bash
git revert <commit-hash>
git push
# Redeploy
```

### Database Rollback (if needed)
```bash
# Restore from backup
mysql -u root -p jas_consulting < backup.sql
```

---

## Production Deployment Steps

### 1. Pre-Deployment
- [ ] Backup database
- [ ] Test in staging environment
- [ ] Review rollback plan
- [ ] Notify team

### 2. Deployment
```bash
# Backend (PHP)
cd backend
# Already deployed (XAMPP running)

# Frontend (Next.js)
cd frontend
npm run build
npm start
```

### 3. Post-Deployment
- [ ] Verify health endpoints
- [ ] Test critical paths
- [ ] Monitor logs
- [ ] Check error rates

---

## Environment Variables

### Development
```env
NEXT_PUBLIC_USE_BACKEND=false
NEXT_PUBLIC_BACKEND_URL=http://localhost/Jacom-Platform/backend
```

### Staging
```env
NEXT_PUBLIC_USE_BACKEND=true
NEXT_PUBLIC_BACKEND_URL=https://staging-api.example.com
```

### Production
```env
NEXT_PUBLIC_USE_BACKEND=true
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
```

---

## Success Metrics

### Technical
- ✅ 99.9% uptime
- ✅ < 500ms average response time
- ✅ < 0.1% error rate
- ✅ Zero data loss

### Business
- ✅ No user complaints
- ✅ Improved performance
- ✅ Reduced maintenance overhead
- ✅ Simplified architecture

---

## Post-Rollout Cleanup (Week 4)

### Remove Frontend API Routes
```bash
# Delete these files:
frontend/app/api/industries/route.ts
frontend/app/api/services/route.ts
frontend/app/api/insights/route.ts
frontend/app/api/experts/route.ts
frontend/app/api/offices/route.ts
frontend/app/api/content/route.ts
frontend/app/api/leads/route.ts
frontend/app/api/careers/route.ts
```

### Remove Feature Flag
```typescript
// frontend/lib/domain-api.ts
// Remove USE_BACKEND check, always use backend
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
```

### Update Documentation
- [ ] Update README.md
- [ ] Update API documentation
- [ ] Archive migration docs
- [ ] Update deployment guide

---

## Risk Assessment

### Low Risk ✅
- All LIST operations validated
- Relations loading correctly
- Auth working
- Rollback plan ready

### Medium Risk ⚠️
- Some UPDATE operations need monitoring
- Content key handling
- Performance under load

### Mitigation
- Gradual rollout (10% → 50% → 100%)
- Continuous monitoring
- Quick rollback capability
- Team on standby

---

## Communication Plan

### Before Rollout
- Email to admin users
- Slack announcement
- Documentation update

### During Rollout
- Status updates every 2 hours
- Incident response team ready
- User support available

### After Rollout
- Success announcement
- Performance report
- Lessons learned document

---

## Timeline

| Week | Action | Status |
|------|--------|--------|
| Week 1 | 10% rollout | ⏳ Pending |
| Week 2 | 50% rollout | ⏳ Pending |
| Week 3 | 100% rollout | ⏳ Pending |
| Week 4 | Cleanup | ⏳ Pending |

---

## Approval Checklist

- [x] Phase 1-6 complete
- [x] Backend API validated
- [x] Test pass rate acceptable (75%)
- [x] Rollback plan documented
- [x] Monitoring setup ready
- [ ] Staging environment tested
- [ ] Team trained
- [ ] Stakeholder approval

---

**Phase 7 Status:** ⏳ Ready to Start
**Next Action:** Deploy to staging and begin Week 1 rollout
**Owner:** DevOps Team
**Timeline:** 4 weeks
