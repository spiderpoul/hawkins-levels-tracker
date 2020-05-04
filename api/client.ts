import faunadb from 'faunadb';

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY as string;
export const q = faunadb.query

export const client = new faunadb.Client({ secret })