import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function note(_: any, args: { id: string }): Promise<INote | string> {
  const Connector = new Ctr({ db: 'test', table: 'notes' });

  return new Promise((resolve: (result: INote) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: INote) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      }).catch(reject);
  });
}

export function notes(): Promise<INote[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'notes' });

  return new Promise((resolve: (results: INote[]) => void, reject: (err: string) => void) => {
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
