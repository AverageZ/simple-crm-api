import * as express from 'express';
import * as r from 'rethinkdb';

import Ctr from 'controllers/connect';

export default function getAll(_: express.Request, res: express.Response) {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  Connector
    .makeConnection()
    .then((conn: r.Connection) => {
      Connector
        .accessTable()
        .run(conn, (runError: Error, cursor: r.Cursor) => {
          if (runError) {
            throw runError;
          }

          cursor.toArray((dataError: Error, result: r.Row[]) => {
            if (dataError) {
              throw dataError;
            }

            res.json(result);
            conn.close();
          });
        });
    });
}
