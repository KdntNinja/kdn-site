import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

exports.sendNotification = functions.firestore
    .document('groups/{groupId}/posts/{postId}')
    .onCreate(async (snap: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
        const post = snap.data();
        if (!post) {
            console.error('Post data is undefined');
            return;
        }
        const groupId = context.params.groupId;

        const usersSnapshot = await admin.firestore().collection('users').where('group', '==', groupId).get();

        const payload = {
            notification: {
                title: `New post by ${post.userName}`,
                body: post.title,
                icon: post.imageUrl,
            }
        };

        usersSnapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
            const user = doc.data();
            if (user.userId !== post.userId) {
                admin.messaging().sendToDevice(user.fcmToken, payload);
            }
        });
    });