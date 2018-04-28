import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function rep(_: any, args: IRep): Promise<IRep | string> {
  const Connector = new Ctr({ db: 'test', table: 'reps' });

  return new Promise((resolve: (result: IRep) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: IRep) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      }).catch(reject);
  });
}

export function reps(): Promise<IRep[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'reps' });

  return new Promise((resolve: (results: IRep[]) => void, reject: (err: string) => void) => {
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
