import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    this.pool = createPool({
      host: 'localhost',
      // NOTE: portはデフォルトで3306だったので指定不要 ※設定方法を覚えておくためにコメントアウトで残しておく
      // port: 3306,
      user: 'root',
      password: 'secret',
      database: 'sampledb',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.query(sql, params);
    return rows as T[];
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
