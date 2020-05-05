import { client, q, verifyToken } from './client';

module.exports = async (req, res) => {
    try {
        const {
            user: { userId },
        } = verifyToken(req.body?.token);
        const dbs: any = await client.query(
            q.Map(
                // iterate each item in result
                q.Paginate(
                    // make paginatable
                    q.Match(
                        // query index
                        q.Index('levels_by_date_id'),
                        req?.query?.date,
                        userId
                    )
                ),
                (ref) => q.Get(ref) // lookup each result by its reference
            )
        );
        // ok
        res.status(200).json(dbs?.data);
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
