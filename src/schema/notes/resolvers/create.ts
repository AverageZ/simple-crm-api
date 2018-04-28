import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface INoteWriteResult extends r.WriteResult {
  changes: Array<{ new_val: INote, old_val: INote }>;
}

export function createNote(_: any, args: INote): Promise<INote | string> {
  const Connector = new Ctr({ db: 'test', table: 'notes' });

  return new Promise((resolve: (result: INote) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .insert(args, { returnChanges: true })
          .run(conn, (runError: Error, result: INoteWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].new_val);
          });
      }).catch(reject);
  });
}
