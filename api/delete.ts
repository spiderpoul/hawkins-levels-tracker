import { client, q, verifyToken } from '../client';

module.exports = async (req, res) => {
    try {
        verifyToken(req.body?.token);
        const dbs: any = await client.query(
            q.Delete(q.Ref(q.Collection('levels-data'), req.body?.id))
        );
        // ok
        res.status(200).json(dbs?.data);
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
