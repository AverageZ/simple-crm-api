import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function contact(_: any, args: IContact): Promise<IContact | string> {
  const Connector = new Ctr({ db: 'test', table: 'contacts' });

  return new Promise((resolve: (result: IContact) => void, reject: (err: string | Error) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: IContact) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      })
      .catch(reject);
  });
}

export function contacts(): Promise<IContact[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'contacts' });

  return new Promise((resolve: (results: IContact[]) => void, reject: (err: string) => void) => {
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
