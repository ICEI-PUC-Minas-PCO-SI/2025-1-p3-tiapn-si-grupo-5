interface LogDetails {
    [key: string]: string | number | boolean | null | undefined | Error | LogDetails;
}

interface ErrorDetails extends LogDetails {
    message?: string;
    stack?: string;
    error?: Error;
}

interface AuthDetails extends LogDetails {
    email?: string;
    success: boolean;
    timestamp: string;
}

interface CrudDetails extends LogDetails {
    resourceType: string;
    resourceId: string | number;
    data?: LogDetails;
    changes?: LogDetails;
}

interface FileUploadDetails extends LogDetails {
    filename: string;
    timestamp: string;
}

interface LogEntry {
    timestamp: string;
    level: string;
    service: string;
    operation: string;
    userId?: number;
    userInfo: string;
    details?: LogDetails;
}

export class Logger {
    private static instance: Logger;
    private logs: LogEntry[] = [];
    private maxLogs: number = 1000;

    constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private addLog(level: string, service: string, operation: string, userId?: number, details?: LogDetails): void {
        const timestamp = new Date().toISOString();
        const userInfo = userId ? `[User: ${userId}]` : '[System]';
        
        const logEntry: LogEntry = {
            timestamp,
            level,
            service,
            operation,
            userId,
            userInfo,
            details
        };

        this.logs.push(logEntry);
        
        // mantém apenas os últimos maxLogs registros
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // console output para desenvolvimento
        const message = `[${level}] ${timestamp} ${userInfo} ${service}: ${operation}`;
        switch (level) {
            case 'ERROR':
            case 'CRITICAL':
                console.error(message, details || '');
                break;
            case 'WARN':
                console.warn(message, details || '');
                break;
            default:
                console.log(message, details || '');
        }
    }

    info(service: string, operation: string, userId?: number, details?: LogDetails): void {
        this.addLog('INFO', service, operation, userId, details);
    }

    warn(service: string, operation: string, userId?: number, details?: LogDetails): void {
        this.addLog('WARN', service, operation, userId, details);
    }

    error(service: string, operation: string, userId?: number, error?: Error): void {
        const errorDetails: ErrorDetails = { 
            message: error?.message, 
            stack: error?.stack,
            error: error 
        };
        this.addLog('ERROR', service, operation, userId, errorDetails);
    }

    critical(service: string, operation: string, userId?: number, details?: LogDetails): void {
        this.addLog('CRITICAL', service, operation, userId, details);
    }

    // métodos específicos para operações CRUD
    logCreate(service: string, resourceType: string, resourceId: string | number, userId?: number, data?: LogDetails): void {
        const crudDetails: CrudDetails = {
            resourceType,
            resourceId,
            data
        };
        this.info(service, `CREATE_${resourceType.toUpperCase()}`, userId, crudDetails);
    }

    logUpdate(service: string, resourceType: string, resourceId: string | number, userId?: number, changes?: LogDetails): void {
        const crudDetails: CrudDetails = {
            resourceType,
            resourceId,
            changes
        };
        this.info(service, `UPDATE_${resourceType.toUpperCase()}`, userId, crudDetails);
    }

    logDelete(service: string, resourceType: string, resourceId: string | number, userId?: number): void {
        const crudDetails: CrudDetails = {
            resourceType,
            resourceId
        };
        this.critical(service, `DELETE_${resourceType.toUpperCase()}`, userId, crudDetails);
    }

    logAuth(operation: string, userId?: number, email?: string, success: boolean = true): void {
        const authDetails: AuthDetails = {
            email,
            success,
            timestamp: new Date().toISOString()
        };
        this.info('AuthService', operation, userId, authDetails);
    }

    logFileUpload(userId: number, filename: string, service: string): void {
        const uploadDetails: FileUploadDetails = {
            filename,
            timestamp: new Date().toISOString()
        };
        this.info(service, 'FILE_UPLOAD', userId, uploadDetails);
    }

    // métodos para consultar logs
    getAllLogs(): LogEntry[] {
        return [...this.logs];
    }

    getLogsByUser(userId: number): LogEntry[] {
        return this.logs.filter(log => log.userId === userId);
    }

    getLogsByService(service: string): LogEntry[] {
        return this.logs.filter(log => log.service === service);
    }

    getLogsByLevel(level: string): LogEntry[] {
        return this.logs.filter(log => log.level === level);
    }

    getRecentLogs(limit: number = 50): LogEntry[] {
        return this.logs.slice(-limit);
    }

    clearLogs(): void {
        this.logs = [];
    }
}

export const logger = Logger.getInstance();