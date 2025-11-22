import { fileSystem, getCurrentPath } from './FileSystem';
import { handleEasterEgg } from './EasterEggs';

export interface CommandOutput {
    text: string;
    type?: 'success' | 'error' | 'info';
}

export class CommandRegistry {
    private currentPath = '/home/polymath_user/neural_academy';
    private commandHistory: string[] = [];

    executeCommand(input: string): CommandOutput {
        if (!input.trim()) {
            return { text: '' };
        }

        this.commandHistory.push(input);
        const parts = input.trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Check for Easter eggs first
        const easterEgg = handleEasterEgg(command, args);
        if (easterEgg) {
            return { text: easterEgg, type: 'success' };
        }

        // Execute regular commands
        switch (command) {
            case 'help':
                return this.help(args[0]);
            case 'ls':
                return this.ls(args);
            case 'cd':
                return this.cd(args[0]);
            case 'pwd':
                return this.pwd();
            case 'cat':
                return this.cat(args[0]);
            case 'echo':
                return this.echo(args.join(' '));
            case 'clear':
                return { text: 'CLEAR_SCREEN' };
            case 'whoami':
                return this.whoami();
            case 'date':
                return this.date();
            case 'uname':
                return this.uname(args);
            case 'signup':
            case 'apply':
                return this.signup();
            case 'stats':
                return this.stats();
            case 'features':
                return this.features();
            default:
                return { text: `Command not found: ${command}\nType 'help' for available commands.`, type: 'error' };
        }
    }

    private help(command?: string): CommandOutput {
        if (command) {
            const helpText = this.getCommandHelp(command);
            return { text: helpText };
        }

        return {
            text: `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation:
  ls [path]       List directory contents
  cd <dir>        Change directory  
  pwd             Print working directory
  
File Operations:
  cat <file>      Display file contents
  echo <text>     Print text to terminal
  clear           Clear terminal screen
  
System Info:
  whoami          Display current user
  date            Show current date/time
  uname [-a]      System information
  
Polymath:
  signup          Open signup window
  apply           Start application process
  stats           Show detailed statistics
  features        List all features
  
Fun Stuff:
  cowsay <text>   ASCII cow says things
  fortune         Random fortune cookie
  matrix          Matrix rain effect
  sl              Steam locomotive
  coffee          Brew some coffee
  hack            Hack the mainframe
  
Try 'help <command>' for more info
Type 'secrets' to discover Easter eggs 👀
`,
            type: 'info'
        };
    }

    private getCommandHelp(command: string): string {
        const helps: Record<string, string> = {
            ls: 'ls [path] - List directory contents\n\nOptions:\n  -la    Show hidden files',
            cd: 'cd <directory> - Change current directory\n\nExamples:\n  cd secrets\n  cd ..\n  cd ~',
            pwd: 'pwd - Print working directory\n\nShows the current directory path',
            cat: 'cat <file> - Display file contents\n\nExample:\n  cat README.md',
            whoami: 'whoami - Display current user information',
            date: 'date - Show current date and time',
            uname: 'uname [-a] - Show system information\n\nOptions:\n  -a    Show all information',
        };
        return helps[command] || `No help available for: ${command}`;
    }

    private ls(args: string[]): CommandOutput {
        const showHidden = args.includes('-la') || args.includes('-a');
        const current = getCurrentPath(this.currentPath);

        if (!current || current.type !== 'directory') {
            return { text: 'Not a directory', type: 'error' };
        }

        const items: string[] = [];
        const contents = current.contents || {};

        for (const [name, item] of Object.entries(contents)) {
            if (!showHidden && name.startsWith('.')) continue;

            if (item.type === 'directory') {
                items.push(`📁 ${name}/`);
            } else {
                items.push(`📄 ${name}`);
            }
        }

        return { text: items.length > 0 ? items.join('\n') : 'Empty directory' };
    }

    private cd(dir?: string): CommandOutput {
        if (!dir || dir === '~') {
            this.currentPath = '/home/polymath_user/neural_academy';
            return { text: '' };
        }

        if (dir === '..') {
            const parts = this.currentPath.split('/').filter(Boolean);
            parts.pop();
            this.currentPath = '/' + parts.join('/');
            return { text: '' };
        }

        const newPath = this.currentPath + '/' + dir;
        const target = getCurrentPath(newPath);

        if (!target) {
            return { text: `cd: ${dir}: No such file or directory`, type: 'error' };
        }

        if (target.type !== 'directory') {
            return { text: `cd: ${dir}: Not a directory`, type: 'error' };
        }

        this.currentPath = newPath;
        return { text: '' };
    }

    private pwd(): CommandOutput {
        return { text: this.currentPath };
    }

    private cat(filename?: string): CommandOutput {
        if (!filename) {
            return { text: 'cat: missing file operand', type: 'error' };
        }

        const current = getCurrentPath(this.currentPath);
        if (!current || current.type !== 'directory') {
            return { text: 'Not in a directory', type: 'error' };
        }

        const file = current.contents?.[filename];
        if (!file) {
            return { text: `cat: ${filename}: No such file or directory`, type: 'error' };
        }

        if (file.type !== 'file') {
            return { text: `cat: ${filename}: Is a directory`, type: 'error' };
        }

        return { text: file.content || '' };
    }

    private echo(text: string): CommandOutput {
        return { text };
    }

    private whoami(): CommandOutput {
        return {
            text: `polymath_user

Status: Early Access Beta Tester
Clearance Level: NEURAL_ARCHITECT
Member Since: ${new Date().getFullYear()}
Courses Enrolled: Unlimited
Job Guarantee: Active ✓`
        };
    }

    private date(): CommandOutput {
        const now = new Date();
        return {
            text: `${now.toDateString()} ${now.toLocaleTimeString()}

Neural Sync: OPTIMAL
System Status: ONLINE
Next Cohort: 6 days`
        };
    }

    private uname(args: string[]): CommandOutput {
        if (args.includes('-a')) {
            return {
                text: `POLYMATH_OS 2.0.1 x86_64 GNU/Linux
Kernel: neural-net-optimized
Build: 20251122-quantum
Architecture: x86_64
Processor: Neural Processing Unit (NPU)
Memory: Unlimited (Cloud-Based)
AI Engine: GPT-5 Enhanced`
            };
        }
        return { text: 'POLYMATH_OS' };
    }

    private signup(): CommandOutput {
        // This will trigger the signup window to focus
        setTimeout(() => {
            const signupWindow = document.getElementById('signup-window');
            if (signupWindow) {
                signupWindow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        return {
            text: `Opening signup terminal...

✓ Redirecting to application portal
✓ Loading neural credentials form

Complete the signup to secure your spot!
Only 23 spots remaining in next cohort.`,
            type: 'success'
        };
    }

    private stats(): CommandOutput {
        return {
            text: `POLYMATH REAL-TIME STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Performance Metrics:
   Job Placement Rate:      98%
   Avg Starting Salary:     $127,000
   Completion Rate:         94%
   Student Satisfaction:    4.9/5.0
   
⚡ Speed Metrics:
   Time to Employment:      2.3 months
   Learning Speed:          4.2x faster
   Course Completion:       16 weeks avg
   
👥 Community:
   Active Students:         1,247
   Alumni Network:          8,932
   Job Offers Secured:      892
   Partner Companies:       156
   
💰 Financial:
   Average ROI:             847%
   Tuition Model:           Pay After Hired
   Refund Rate:             <2%
   
Run 'apply' to join these statistics! 🚀`
        };
    }

    private features(): CommandOutput {
        return {
            text: `POLYMATH FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] AI-PERSONALIZED CURRICULUM
    └─ Adapts to your learning style in real-time
    └─ Neural pathways optimized for YOUR brain
    
[✓] JOB GUARANTEE
    └─ Get hired or get 100% refund
    └─ Average time to offer: 2.3 months
    
[✓] LIVE MENTORSHIP
    └─ 24/7 access to industry experts
    └─ 1-on-1 code reviews
    
[✓] PORTFOLIO BUILDER
    └─ Ship 5 production-ready projects
    └─ Real companies, real impact
    
[✓] NEURAL OPTIMIZATION
    └─ Learn 4.2x faster than traditional
    └─ Retention rate: 94%
    
[✓] FAANG PIPELINE
    └─ Direct recruiting partnerships
    └─ Interview prep included
    
Type 'apply' to get started!`
        };
    }

    getCurrentPath(): string {
        return this.currentPath;
    }

    getHistory(): string[] {
        return this.commandHistory;
    }
}

export default CommandRegistry;
