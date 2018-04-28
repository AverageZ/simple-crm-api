import * as r from 'rethinkdb';

import Ctr from 'utils/connector';

interface INoteWriteResult extends r.WriteResult {
  changes: Array<{ new_val: INote, old_val: INote }>;
}

export function deleteNote(_: any, args: INote): Promise<INote | string> {
  const Connector = new Ctr({ db: 'test', table: 'reps' });

  return new Promise((resolve: (result: INote) => void, reject: (err: string) => void) => {
    Connector
      .makeConnection()
      .then((conn: r.Connection) => {
        Connector
          .accessTable()
          .get(args.id)
          .delete({ returnChanges: true })
          .run(conn, (runError: Error, result: INoteWriteResult) => {
            conn.close();

            if (runError) {
              throw runError;
            }

            resolve(result.changes[0].old_val);
          });
      }).catch(reject);
  });
}
