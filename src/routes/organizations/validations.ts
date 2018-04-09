import * as Joi from 'joi';

interface IOrganization {
  id: string;
  name: string;
  updated: string;
  email: string;
  phone: string;
  reps: string[]; // ids of the assiged rep
  notes: string[]; // ids of notes assigned
  // tags: ITag[];
  organizations: string[]; // ids of child organizations
  clients: string[]; // ids of clients assigned
}

const schema = {
  clients: Joi.array().items(Joi.string()),
  email: Joi.string().email(),
  name: Joi.string().min(1),
  notes: Joi.array().items(Joi.string()),
  organizations: Joi.array().items(Joi.string()),
  phone: Joi.string(),
  reps: Joi.array().items(Joi.string()),
  updated: Joi.string(),
};

export default function validateClient(org: IOrganization) {
  Joi.validate(org, schema, (err: Joi.ValidationError, value: any) => {
    if (err) {
      throw err;
    }

    return value;
  });
}
