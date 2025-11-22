// Virtual file system for terminal navigation
export const fileSystem = {
    '/home/polymath_user/neural_academy': {
        type: 'directory',
        contents: {
            'README.md': {
                type: 'file',
                content: `# POLYMATH OS
Welcome to the future of education.

Our AI-powered platform replaces traditional universities with
personalized learning paths that adapt to YOUR brain.

Run 'help' for available commands.
Run 'features' to see what makes us different.
Run 'apply' to start your journey.

"The best investment you can make is in yourself." - Warren Buffett`
            },
            'features.txt': {
                type: 'file',
                content: `POLYMATH FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] AI-PERSONALIZED CURRICULUM
    Adapts to your learning style in real-time
    
[✓] JOB GUARANTEE
    Get hired or get 100% refund
    
[✓] LIVE MENTORSHIP
    24/7 access to industry experts
    
[✓] PORTFOLIO BUILDER
    Ship 5 production-ready projects
    
[✓] NEURAL OPTIMIZATION
    Learn 4.2x faster than traditional methods`
            },
            'stats.log': {
                type: 'file',
                content: `POLYMATH STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Job Placement Rate:     98%
Average Starting Salary: $127,000
Completion Rate:        94%
Student Satisfaction:   4.9/5.0
Time to Employment:     2.3 months
Active Students:        1,247
Courses Completed:      8,932
Job Offers Secured:     892`
            },
            'secrets': {
                type: 'directory',
                contents: {
                    '.hidden_jobs': {
                        type: 'file',
                        content: `🔒 CONFIDENTIAL - FAANG HIRING PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Companies actively recruiting Polymath grads:

Google:    23 open positions ($180k-$250k)
Meta:      18 open positions ($175k-$240k)
Amazon:    31 open positions ($160k-$220k)
Netflix:   12 open positions ($200k-$280k)
Apple:     15 open positions ($185k-$255k)

Average offer: $210,000
Acceptance rate: 87%

Run 'apply' to get fast-tracked 🚀`
                    },
                    'salary_boost.sh': {
                        type: 'file',
                        content: `#!/bin/bash
# Polymath Salary Multiplier Algorithm

base_salary=65000
polymath_multiplier=2.1

new_salary=$((base_salary * polymath_multiplier))

echo "Traditional grad salary: $$base_salary"
echo "Polymath grad salary: $$new_salary"
echo "Difference: $$(($new_salary - $base_salary))"
echo ""
echo "ROI: INFINITE (you pay AFTER getting hired)"`
                    }
                }
            }
        }
    }
};

export const getCurrentPath = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    let current: any = fileSystem;

    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        } else {
            return null;
        }
    }

    return current;
};
