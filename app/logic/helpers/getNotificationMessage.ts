import { NotificationType } from '../../types/common/notification-type';
import { Item } from '../../types/strapi/base/base';
import { Notification } from '../../types/strapi/models/notification';

export const getMessageByType = (item: Notification) => {
  const username = item.me.data.attributes.username;
  const eventTitle = item?.event?.data?.attributes?.title;
  const postDescription = item?.post?.data?.attributes?.description;
  console.log(item.post);

  switch (item.type) {
    case 'follow_user':
      return `@${username} kullanıcısı sizi takip etti.`;
    case 'like_event':
      return `@${username} kullanıcısı ${eventTitle} etkinliğinizi beğendi.`;
    case 'comment_event':
      return `@${username} kullanıcısı ${eventTitle} etkinliğinizi yorum yaptı.`;
    case 'comment_post':
      return `@${username} kullanıcısı ${postDescription} gönderinize yorum yaptı.`;
    case 'like_post':
      return `@${username} kullanıcısı ${postDescription} gönderinizi beğendi.`;
    default:
      return '';
  }
};