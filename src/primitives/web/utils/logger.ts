/*
 * Derived from heroui-react/packages/react/src/utils/logger.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
 
/**
 * Logger utility for HeroUI Core
 * Provides formatted console output with levels and prefixes
 */

const colors = {
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
} as const;

type LogLevel = "info" | "success" | "warn" | "error" | "debug";

interface LoggerOptions {
  enabled?: boolean;
  prefix?: string;
}

const levelColors: Record<LogLevel, string> = {
  debug: colors.magenta,
  error: colors.red,
  info: colors.blue,
  success: colors.green,
  warn: colors.yellow,
};

const levelEmojis: Record<LogLevel, string> = {
  debug: "🔍",
  error: "❌",
  info: "ℹ️",
  success: "✅",
  warn: "⚠️",
};

export class Logger {
  private enabled: boolean;
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.enabled = options.enabled ?? true;
    this.prefix = options.prefix ?? "HeroUI";
  }

  private formatMessage(level: LogLevel, message: string): string {
    const color = levelColors[level];
    const emoji = levelEmojis[level];

    return `${color}[${this.prefix}]${colors.reset} ${emoji}  ${message}`;
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.enabled) return;

    const formattedMessage = this.formatMessage(level, message);

    switch (level) {
      case "error":
        console.error(formattedMessage, ...args);
        break;
      case "warn":
        console.warn(formattedMessage, ...args);
        break;
      default:
        console.log(formattedMessage, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    this.log("info", message, ...args);
  }

  success(message: string, ...args: any[]): void {
    this.log("success", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log("error", message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log("debug", message, ...args);
  }

  divider(char: string = "=", length: number = 80): void {
    if (!this.enabled) return;
    console.log(char.repeat(length));
  }

  newline(): void {
    if (!this.enabled) return;
    console.log();
  }
}
