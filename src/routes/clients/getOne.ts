import * as express from 'express';
import * as r from 'rethinkdb';

export default function getOne(req: express.Request, res: express.Response) {
  r.connect({ host: 'localhost', port: 28015 }, (err: r.ReqlDriverError, conn: r.Connection) => {
    if (err) {
      throw err;
    }

    r
      .db('test')
      .table('clients')
      .filter(r.row('id').eq(req.params.id))
      // Needs to get orgs, notes, etc.
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
