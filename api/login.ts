import { client, q } from './client';

module.exports = async (req, res) => {
    try {
        const dbs: any = await client.query(
            q.Get(q.Match(q.Index('find_user_by_login'), req?.body?.login))
        );

        if (dbs && dbs?.data?.password === req?.body?.password) {
            res.status(200).json({ userId: dbs?.data?.id });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
