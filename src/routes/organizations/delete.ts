import * as express from 'express';
import * as r from 'rethinkdb';

export default function deleteOrg(req: express.Request, res: express.Response) {
  r.connect({ host: 'localhost', port: 28015 }, (err: r.ReqlDriverError, conn: r.Connection) => {
    if (err) {
      throw err;
    }

    r
      .db('test')
      .table('organizations')
      .filter(r.row('id').eq(req.params.id))
      .delete()
      .run(conn, (runError: Error, result: r.WriteResult) => {
        if (runError) {
          throw runError;
        }

        res.json(result);
        conn.close();
      });
  });
}
