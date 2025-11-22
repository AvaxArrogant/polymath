export const easterEggs = {
    konami: () => `
🎮 ═══════════════════════════════════════ 🎮
     CHEAT CODE ACTIVATED!
🎮 ═══════════════════════════════════════ 🎮

Unlocking secret features...
████████████████████████████████ 100%

✓ God Mode: ENABLED
✓ All Courses: UNLOCKED  
✓ Job Offers: MAXIMIZED
✓ Tuition Cost: $0.00
✓ Starting Salary: $250,000

Achievement Unlocked: "The Chosen One"
`,

    hack: () => {
        const frames = [
            'Initiating neural firewall bypass...',
            'Scanning for vulnerabilities...',
            'Exploiting education system flaws...',
            'Downloading job_offers.db...',
            'Decrypting salary_data.enc...',
            'Access granted to mainframe.'
        ];
        return `
[UNAUTHORIZED ACCESS DETECTED]
${frames.join('\n')}

████████████████████████████████ 100%

> DATABASE BREACH SUCCESSFUL
> Retrieved: 247 job offers
> Average salary: $210,000
> Your new starting salary: $247,000

Type 'apply' to claim your offer 🚀
`;
    },

    coffee: () => `
      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|  
( C|/\/\/\/\/|
 '-./\/\/\/\/|
   '_________'
    '-------'

Brewing neural-enhanced coffee...
☕ Coffee ready! +50 focus points

Side effects may include:
- Increased productivity
- Sudden urge to code
- Ability to debug in your sleep
`,

    matrix: () => `
Initializing Matrix protocol...

Press Ctrl+C to exit the Matrix

Wake up, Neo...
The Matrix has you...
Follow the white rabbit. 🐰

Knock, knock, Neo.
`,

    train: () => `
                      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
                 (@@@)
             (    )
          (@@@@)

        (   )
    ====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
 |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
 /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____
|      |  |   H  |__--------------------| [___] |   =|                        |
| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/

CHOO CHOO! 🚂
You meant to type 'ls' didn't you?
`,

    cowsay: (text: string) => {
        const message = text || 'Join Polymath!';
        const border = '_'.repeat(message.length + 2);
        return `
 ${border}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
    },

    fortune: () => {
        const fortunes = [
            '"The best time to plant a tree was 20 years ago. The second best time is now. The best time to learn AI? Right now at Polymath."',
            '"Your future self is watching you right now through memories. Make them proud."',
            '"A 4-year degree teaches you what to think. Polymath teaches you HOW to think."',
            '"The only way to do great work is to love what you do. And to get paid $127k for it." - Steve Jobs (probably)',
            '"In 5 years, you will arrive. The question is where? Choose Polymath, choose wisely."',
            '"Traditional education is expensive. Polymath is an investment that pays YOU back."',
            '"The future belongs to those who learn more skills and combine them in creative ways." - Robert Greene',
            '"Your salary is the bribe they give you to forget your dreams. Unless you work at FAANG. Then it\'s just a really good bribe."'
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    sudo: (command: string) => {
        if (command === 'make me a sandwich') {
            return `
[sudo] password for polymath_user: ****

Making you a sandwich... 🥪

Ingredients:
- Neural-optimized bread
- AI-generated lettuce  
- Quantum tomatoes
- Blockchain bacon
- Cloud-sourced mayo

Your sandwich is ready!
Nutritional info: +100 IQ points
`;
        }
        return `[sudo] password for polymath_user: ****
Sorry, you don't have permission to ${command}.
But you DO have permission to change your life.
Run 'apply' to get started.`;
    },

    secrets: () => `
🔐 SECRET COMMANDS UNLOCKED 🔐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Easter Eggs:
  konami      - Activate cheat code (↑↑↓↓←→←→BA)
  hack        - Hack the mainframe
  coffee      - Brew neural coffee
  matrix      - Enter the Matrix
  sl          - Steam locomotive
  cowsay      - Wise cow wisdom
  fortune     - Random fortune
  sudo        - Superuser commands

Hidden Directories:
  cd secrets  - View confidential files
  ls -la      - Show hidden files

Try them all! 🎮
`,

    dev: () => `
🔧 DEVELOPER MODE ACTIVATED 🔧
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Access Level: NEURAL_ARCHITECT
Clearance: MAXIMUM

Unlocked Features:
✓ Source code access
✓ API documentation  
✓ Beta features
✓ Debug console
✓ Performance metrics
✓ A/B test controls

GitHub: github.com/polymath/neural-os
API Docs: api.polymath.ai/docs
Discord: discord.gg/polymath-dev

Welcome to the inner circle. 🚀
`,

    timewarp: () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 5);
        return `
⚠️  TEMPORAL DISPLACEMENT DETECTED ⚠️

Current Date: ${futureDate.toDateString()}

Your Polymath Journey:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Graduation: 5 years ago
Current Role: Senior AI Architect @ Google
Salary: $380,000/year
Projects Shipped: 47
Patents Filed: 3
Conference Talks: 12

Life Status: Living the dream ✨

Press Ctrl+C to return to present.
Time to make this future real. Run 'apply'.
`;
    }
};

export const handleEasterEgg = (command: string, args: string[] = []): string | null => {
    switch (command.toLowerCase()) {
        case 'konami':
            return easterEggs.konami();
        case 'hack':
        case 'hacker':
            return easterEggs.hack();
        case 'coffee':
        case 'brew':
            return easterEggs.coffee();
        case 'matrix':
            return easterEggs.matrix();
        case 'sl':
            return easterEggs.train();
        case 'cowsay':
            return easterEggs.cowsay(args.join(' '));
        case 'fortune':
            return easterEggs.fortune();
        case 'sudo':
            return easterEggs.sudo(args.join(' '));
        case 'secrets':
        case 'easter':
            return easterEggs.secrets();
        case 'dev':
        case 'developer':
            return easterEggs.dev();
        case 'timewarp':
        case 'future':
            return easterEggs.timewarp();
        default:
            return null;
    }
};
