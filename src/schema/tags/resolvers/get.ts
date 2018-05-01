import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

export function tag(_: any, args: { id: string }): Promise<ITag | string> {
  const Connector = new Ctr({ db: 'test', table: 'tags' });

  return new Promise((resolve: (result: ITag) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .run(conn, (runError: Error, result: ITag) => {
            if (runError) {
              throw runError;
            }

            resolve(result);
          });
      }).catch(reject);
  });
}

export function tags(): Promise<ITag[] | string> {
  const Connector = new Ctr({ db: 'test', table: 'tags' });

  return new Promise((resolve: (results: ITag[]) => void, reject: (err: string) => void) => {
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
