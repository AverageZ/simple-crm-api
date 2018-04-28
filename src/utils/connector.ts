import * as r from 'rethinkdb';

interface IConnector {
  makeConnection(): Promise<string | r.Connection>;
  accessTable(): r.Table;
}

interface IConnectorOpts {
  db: string;
  table: string;
}

export default class Connector implements IConnector {
  private opts: IConnectorOpts;

  constructor(opts: IConnectorOpts) {
    this.opts = opts;
  }

  public accessTable = (): r.Table => (
    r.db(this.opts.db).table(this.opts.table)
  )

  public makeConnection = (): Promise<string | r.Connection> => (
    new Promise((resolve: any, reject: any) => {
      r.connect({ host: 'localhost', port: 28015 }, (err: r.ReqlDriverError, conn: r.Connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    })
  )
}
