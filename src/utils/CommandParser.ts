export interface Command {
    name: string;
    args: string[];
    flags: Record<string, boolean>;
}

export const parseCommand = (input: string): Command => {
    const parts = input.trim().split(/\s+/);
    const name = parts[0] || '';
    const args: string[] = [];
    const flags: Record<string, boolean> = {};

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        if (part.startsWith('-')) {
            flags[part.replace(/^-+/, '')] = true;
        } else {
            args.push(part);
        }
    }

    return { name, args, flags };
};
