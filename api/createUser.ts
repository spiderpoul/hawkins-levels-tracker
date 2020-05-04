import { client, q } from './client';

module.exports = async (req, res) => {
    try {
        const dbs: any = await client.query(
            q.Create(q.Ref(q.Collection('users'), q.NextId()), {
                data: { ...req.body, id: q.NextId() },
            })
        );
        // ok
        res.status(200).json({ userId: dbs?.data?.id });
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
