try {
    const init = () => {
        const unreadNotifications = document.querySelectorAll('.notification-list-item-unread');
        const notificationBadge = document.querySelector('.notification-count');
        const markAllRead = document.querySelector('.mark-all-read');

        let notificationCount = unreadNotifications.length;

        const onNotificationClick = (notification) => {
            
            notification.classList.remove('notification-list-item-unread');
            // hide notification circle
            notification.querySelector('.notify-circle').style.display = 'none';
            // decrease the notification count on badge
            --notificationCount;
            notificationBadge.textContent = notificationCount;
            if(notificationCount === 0){
                notificationBadge.style.display = 'none';
                markAllRead.style.display = 'none';
            }

        }
        // click event for unread notifications
        unreadNotifications.forEach((notification) => {
            notification.addEventListener('click', (event) => {
                onNotificationClick(notification)
            })
        })

        // mark all unread notifications as read
        markAllRead.addEventListener('click', () => {
            unreadNotifications.forEach((notification) => {
                onNotificationClick(notification)
            })
        })
    
    }    
    init();
} catch (error) {
    console.log('Error message', error);
}

