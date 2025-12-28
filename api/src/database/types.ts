import { Connection } from "./connection";

/**
 * Type-safe search criteria
 */
export type SearchCriteria<T> = {
    [K in keyof Partial<T>]?: T[K] | T[K][];
};

/**
 * Options for queries
 */
export interface QueryOptions {
    limit?: number;
    offset?: number;
    order?: Array<{ field: string; direction?: 'asc' | 'desc' }>;
    fields?: string[];
}

/**
 * Abstract Base DAO for Create, Read, Update, Delete operations
 */
export abstract class BaseDAO<T, Insert = Partial<T>, Update = Partial<T>> {
    
    /**
     * Override this to return the table name
     */
    protected abstract getTableName(): string;
    
    /**
     * Get the Massive.js table object
     */
    protected getTable(db: Connection): any {
        const tableName = this.getTableName();
        return db[tableName];
    }
    
    /**
     * Execute a SQL script from the scripts folder
     * Scripts should be in: database/scripts/{tableName}/{scriptName}.sql
     */
    protected async executeScript<R = any>(
        db: Connection,
        scriptName: string,
        params: any[] | Record<string, any>
    ): Promise<R> {
        const tableName = this.getTableName();
        const scriptPath = db[tableName]?.[scriptName];
        
        if (!scriptPath) {
            throw new Error(`Script ${scriptName} not found for table ${tableName}`);
        }
        
        return await scriptPath(params);
    }
    
    /**
     * Find a single record by primary key
     */
    async findById(db: Connection, id: number | string): Promise<T | null> {
        const table = this.getTable(db);
        return await table.findOne({ id });
    }
    
    /**
     * Find a single record by criteria
     */
    async findOne(db: Connection, criteria: SearchCriteria<T>): Promise<T | null> {
        const table = this.getTable(db);
        return await table.findOne(criteria);
    }
    
    /**
     * Find all records matching criteria
     */
    async find(
        db: Connection,
        criteria?: SearchCriteria<T>,
        options?: QueryOptions
    ): Promise<T[]> {
        const table = this.getTable(db);
        return await table.find(criteria || {}, this.buildQueryOptions(options));
    }
    
    /**
     * Find all records
     */
    async findAll(db: Connection, options?: QueryOptions): Promise<T[]> {
        return this.find(db, {}, options);
    }
    
    /**
     * Count records matching criteria
     */
    async count(db: Connection, criteria?: SearchCriteria<T>): Promise<number> {
        const table = this.getTable(db);
        const result = await table.count(criteria || {});
        return parseInt(result || '0', 10);
    }
    
    /**
     * Insert a single record
     */
    async insert(db: Connection, data: Insert): Promise<T | null> {
        const table = this.getTable(db);
        return await table.insert(data);
    }
    
    /**
     * Insert multiple records
     */
    async insertMany(db: Connection, data: Insert[]): Promise<T[]> {
        if (data.length === 0) return [];
        const table = this.getTable(db);
        return await table.insert(data);
    }
    
    /**
     * Update a record by ID
     */
    async updateById(db: Connection, id: number | string, data: Update): Promise<T | null> {
        const table = this.getTable(db);
        return await table.update({ id }, data);
    }
    
    /**
     * Update records matching criteria
     */
    async update(
        db: Connection,
        criteria: SearchCriteria<T>,
        data: Update
    ): Promise<T[]> {
        const table = this.getTable(db);
        return await table.update(criteria, data);
    }
    
    /**
     * Delete a record by ID
     */
    async deleteById(db: Connection, id: number | string): Promise<T | null> {
        const table = this.getTable(db);
        return await table.destroy({ id });
    }
    
    /**
     * Delete records matching criteria
     */
    async delete(db: Connection, criteria: SearchCriteria<T>): Promise<T[]> {
        const table = this.getTable(db);
        return await table.destroy(criteria);
    }
    
    /**
     * Save (upsert) - insert if new, update if exists
     */
    async save(db: Connection, data: Insert): Promise<T | null> {
        const table = this.getTable(db);
        return await table.save(data);
    }
    
    /**
     * Build Massive.js query options from our QueryOptions
     */
    private buildQueryOptions(options?: QueryOptions): any {
        if (!options) return {};
        
        const massiveOptions: any = {};
        
        if (options.limit) massiveOptions.limit = options.limit;
        if (options.offset) massiveOptions.offset = options.offset;
        if (options.fields) massiveOptions.fields = options.fields;
        if (options.order) {
            massiveOptions.order = options.order.map(o => ({
                field: o.field,
                direction: o.direction || 'asc'
            }));
        }
        
        return massiveOptions;
    }
}

export function transaction<T>(db: Connection, callback: (db: Connection) => Promise<T>): Promise<T> {
    return db.withTransaction(async (tx) => {
        return await callback(tx);
    });
}

/**
 * Read-only DAO (no insert/update/delete)
 */
export abstract class ReadOnlyDAO<T> extends BaseDAO<T, never, never> {
    
    async insert(): Promise<never> {
        throw new Error('Insert not supported on read-only DAO');
    }
    
    async insertMany(): Promise<never> {
        throw new Error('Insert not supported on read-only DAO');
    }
    
    async updateById(): Promise<never> {
        throw new Error('Update not supported on read-only DAO');
    }
    
    async update(): Promise<never> {
        throw new Error('Update not supported on read-only DAO');
    }
    
    async deleteById(): Promise<never> {
        throw new Error('Delete not supported on read-only DAO');
    }
    
    async delete(): Promise<never> {
        throw new Error('Delete not supported on read-only DAO');
    }
    
    async save(): Promise<never> {
        throw new Error('Save not supported on read-only DAO');
    }
}