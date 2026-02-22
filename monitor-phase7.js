#!/usr/bin/env node

/**
 * Phase 7 Deployment Monitor
 * Tracks API health, response times, and deployment metrics
 */

const https = require('https');
const http = require('http');

class DeploymentMonitor {
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
        this.frontendUrl = 'http://localhost:3000';
        this.metrics = {
            timestamp: new Date().toISOString(),
            responseTime: {},
            errorRate: 0,
            uptime: 0,
            totalRequests: 0,
            failedRequests: 0
        };
    }

    async checkEndpoint(url, name) {
        const startTime = Date.now();
        
        try {
            const response = await this.makeRequest(url);
            const responseTime = Date.now() - startTime;
            
            this.metrics.responseTime[name] = responseTime;
            this.metrics.totalRequests++;
            
            if (response.statusCode >= 400) {
                this.metrics.failedRequests++;
                return { success: false, responseTime, status: response.statusCode };
            }
            
            return { success: true, responseTime, status: response.statusCode };
        } catch (error) {
            this.metrics.failedRequests++;
            this.metrics.totalRequests++;
            return { success: false, error: error.message, responseTime: Date.now() - startTime };
        }
    }

    makeRequest(url) {
        return new Promise((resolve, reject) => {
            const client = url.startsWith('https') ? https : http;
            
            const req = client.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    res.body = data;
                    resolve(res);
                });
            });
            
            req.on('error', reject);
            req.setTimeout(5000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    async runHealthCheck() {
        console.log('🔍 PHASE 7 DEPLOYMENT MONITOR');
        console.log('================================');
        console.log(`Timestamp: ${this.metrics.timestamp}`);
        console.log(`Backend URL: ${this.baseUrl}`);
        console.log(`Frontend URL: ${this.frontendUrl}`);
        console.log('');

        const endpoints = [
            { url: `${this.baseUrl}/industries`, name: 'Industries' },
            { url: `${this.baseUrl}/services`, name: 'Services' },
            { url: `${this.baseUrl}/insights`, name: 'Insights' },
            { url: `${this.baseUrl}/experts`, name: 'Experts' },
            { url: `${this.baseUrl}/offices`, name: 'Offices' },
            { url: `${this.baseUrl}/content`, name: 'Content' },
            { url: `${this.baseUrl}/careers`, name: 'Careers' },
            { url: `${this.frontendUrl}/api/health`, name: 'Frontend Health' }
        ];

        console.log('📊 API Health Check Results:');
        console.log('-----------------------------');

        for (const endpoint of endpoints) {
            const result = await this.checkEndpoint(endpoint.url, endpoint.name);
            const status = result.success ? '✅' : '❌';
            const time = `${result.responseTime}ms`;
            
            console.log(`${status} ${endpoint.name.padEnd(20)} ${time.padStart(8)} ${result.status || 'ERROR'}`);
        }

        this.calculateMetrics();
        this.displayMetrics();
        this.generateReport();
    }

    calculateMetrics() {
        this.metrics.errorRate = (this.metrics.failedRequests / this.metrics.totalRequests) * 100;
        this.metrics.uptime = ((this.metrics.totalRequests - this.metrics.failedRequests) / this.metrics.totalRequests) * 100;
        
        const responseTimes = Object.values(this.metrics.responseTime);
        this.metrics.avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    }

    displayMetrics() {
        console.log('');
        console.log('📈 Deployment Metrics:');
        console.log('----------------------');
        console.log(`Total Requests: ${this.metrics.totalRequests}`);
        console.log(`Failed Requests: ${this.metrics.failedRequests}`);
        console.log(`Error Rate: ${this.metrics.errorRate.toFixed(2)}% (Target: < 1%)`);
        console.log(`Uptime: ${this.metrics.uptime.toFixed(2)}% (Target: > 99%)`);
        console.log(`Avg Response Time: ${this.metrics.avgResponseTime.toFixed(0)}ms (Target: < 500ms)`);
        console.log('');

        // Status indicators
        const errorStatus = this.metrics.errorRate < 1 ? '✅' : '⚠️';
        const uptimeStatus = this.metrics.uptime > 99 ? '✅' : '⚠️';
        const responseStatus = this.metrics.avgResponseTime < 500 ? '✅' : '⚠️';

        console.log('🎯 Target Achievement:');
        console.log('----------------------');
        console.log(`${errorStatus} Error Rate: ${this.metrics.errorRate < 1 ? 'PASS' : 'FAIL'}`);
        console.log(`${uptimeStatus} Uptime: ${this.metrics.uptime > 99 ? 'PASS' : 'FAIL'}`);
        console.log(`${responseStatus} Response Time: ${this.metrics.avgResponseTime < 500 ? 'PASS' : 'FAIL'}`);
        console.log('');

        // Rollback warning
        if (this.metrics.errorRate > 5 || this.metrics.avgResponseTime > 2000) {
            console.log('🚨 ROLLBACK TRIGGER ACTIVATED!');
            console.log('Critical thresholds exceeded. Consider immediate rollback.');
            console.log('Run: Set NEXT_PUBLIC_USE_BACKEND=false');
            console.log('');
        }
    }

    generateReport() {
        const report = {
            phase: 'Phase 7 - Week 1 (10% Rollout)',
            timestamp: this.metrics.timestamp,
            metrics: this.metrics,
            status: this.getOverallStatus(),
            recommendations: this.getRecommendations()
        };

        console.log('📋 Deployment Report:');
        console.log('---------------------');
        console.log(`Phase: ${report.phase}`);
        console.log(`Overall Status: ${report.status}`);
        console.log('');
        console.log('Recommendations:');
        report.recommendations.forEach((rec, i) => {
            console.log(`${i + 1}. ${rec}`);
        });
        console.log('');
        console.log('Report saved to: deployment-metrics.json');

        // Save to file
        require('fs').writeFileSync(
            'deployment-metrics.json', 
            JSON.stringify(report, null, 2)
        );
    }

    getOverallStatus() {
        if (this.metrics.errorRate > 5) return '🚨 CRITICAL';
        if (this.metrics.errorRate > 1) return '⚠️ WARNING';
        if (this.metrics.avgResponseTime > 1000) return '⚠️ SLOW';
        return '✅ HEALTHY';
    }

    getRecommendations() {
        const recommendations = [];
        
        if (this.metrics.errorRate > 1) {
            recommendations.push('Investigate error logs for failed requests');
        }
        
        if (this.metrics.avgResponseTime > 500) {
            recommendations.push('Optimize API response times');
        }
        
        if (this.metrics.uptime < 99) {
            recommendations.push('Check server stability and connection issues');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('All metrics within target ranges - proceed to Week 2');
        }
        
        return recommendations;
    }
}

// Run monitor
const monitor = new DeploymentMonitor();
monitor.runHealthCheck().catch(console.error);