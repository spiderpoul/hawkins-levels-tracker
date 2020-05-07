import { verifyToken, client, q } from '../client';
import webPush from 'web-push';

webPush.setVapidDetails(
    'https://hawkins-levels-tracker.now.sh/',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);
function sendNotification(subscription) {
    return webPush.sendNotification(subscription);
}

module.exports = async (req, res) => {
    try {
        const {
            user: { userId },
        } = verifyToken(req.body?.token);
        const subscriptions: any = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index('user-subscriptions-by-userid'), userId)
                ),
                (ref) => q.Get(ref)
            )
        );

        if (subscriptions?.data?.length) {
            await Promise.all(
                subscriptions?.data?.map((d) =>
                    sendNotification(d.data.subscription)
                )
            );
        }
        res.status(200);
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message });
    }
};
