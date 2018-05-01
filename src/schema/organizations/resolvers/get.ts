import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function organization(_: any, args: { id: string }): Promise<IOrganization | string> {
  const Connector = new Ctr({ db: 'test', table: 'organizations' });

  return new Promise((resolve: (result: IOrganization) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: IOrganization) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      }).catch(reject);
  });
}

export function organizations(_: any): Promise<IOrganization[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'organizations' });

  return new Promise((resolve: (results: IOrganization[]) => void, reject: (err: string) => void) => {
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
