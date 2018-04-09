import * as express from 'express';

import createOrg from './create';
import deleteOrg from './delete';
import getAll from './get';
import getOne from './getOne';
import updateOne from './updateOne';

const router = express.Router();

export default router
  /**
   * Get all orgs
   */
  // @ts-ignore
  .get('/', getAll)

  /**
   * Get an org by id
   */
  .get('/:id', getOne)

  /**
   * Update an org
   */
  .put('/:id', updateOne)

  /**
   * Delete an org by id
   */
  .delete('/:id', deleteOrg)

  /**
   * Create an new org
   */
  .post('', createOrg);
