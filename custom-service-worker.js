// eslint-disable-next-line no-restricted-globals
const serviceWorkerScope = self;

serviceWorkerScope.onnotificationclick = function handleNotificationClick(
    event
) {
    event.notification.close();

    const { title, body } = event.notification;
    const inAppNotification = { title, body };

    const origin = serviceWorkerScope.location.origin;
    event.waitUntil(
        serviceWorkerScope.clients
            .matchAll({ type: 'window' })
            .then((windowClientList) => {
                const focusClient = windowClientList.find((client) =>
                    client.url.includes(origin)
                );
                if (focusClient) {
                    focusClient.focus();
                    focusClient.postMessage(inAppNotification);
                } else {
                    if (serviceWorkerScope.clients.openWindow) {
                        serviceWorkerScope.clients
                            .openWindow(serviceWorkerScope.location.origin)
                            .then((windowClient) => {
                                windowClient.postMessage(inAppNotification);
                            });
                    }
                }
            })
    );
};

const notificationIllustration = `{
  "notification": {
    "title": "A title for your push notification",
    "body": "A body for the push notification"
  }
}`;

serviceWorkerScope.addEventListener('push', function showPushNotification(
    event
) {
    try {
        const { notification = {} } = event.data.json();
        const { title = 'no title', body = 'no body' } = notification;
        const options = {
            body,
            icon:
                'data:image/png;base64,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',
        };
        event.waitUntil(
            serviceWorkerScope.registration.showNotification(title, options)
        );
    } catch (err) {
        console.error(err);
        console.log(
            'expected something like: \n',
            notificationIllustration,
            '\nbut received: \n',
            event.data.text()
        );
    }
});

serviceWorkerScope.addEventListener('message', function skipWaiting(event) {
    if (event.data === 'skipWaiting') serviceWorkerScope.skipWaiting();
});

serviceWorkerScope.addEventListener('install', () => {
    serviceWorkerScope.skipWaiting();
});
