import * as express from 'express';
import * as r from 'rethinkdb';

import Ctr from 'controllers/connect';

export default function createClient(req: express.Request, res: express.Response) {
  const Connector = new Ctr({ db: 'test', table: 'clients' });

  Connector
    .makeConnection()
    .then((conn: r.Connection) => {
      Connector
        .accessTable()
        .insert(req.body)
        .run(conn, (runError: Error, result: r.WriteResult) => {
          if (runError) {
            throw runError;
          }

          // Send back the id of the generated client
          res.json(result.generated_keys[0]);
          conn.close();
        });
    })
    .catch(() => {
      res.sendStatus(500);
    });
}
