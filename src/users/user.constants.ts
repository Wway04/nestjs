export const USER_QUEUE = {
    name: 'user-queue',
    jobs: {
        SEND_WELCOME_EMAIL: 'send-welcom-email',
        RESIZE_AVATAR: 'resize-avatar',
    },
} as const;