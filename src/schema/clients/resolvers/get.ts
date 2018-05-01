import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function client(_: any, args: IClient): Promise<IClient | string> {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  return new Promise((resolve: (result: IClient) => void, reject: (err: string | Error) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: IClient) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      })
      .catch(reject);
  });
}

export function clients(): Promise<IClient[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  return new Promise((resolve: (results: IClient[]) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .run(conn, (runError: Error, cursor: r.Cursor) => {
            if (runError) {
              throw runError;
            }

            resolve(cursor.toArray());
          });
      }).catch(reject);
  });
}
