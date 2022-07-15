import { NotificationType } from '../../types/common/notification-type';
import { Item } from '../../types/strapi/base/base';
import { Notification } from '../../types/strapi/models/notification';

export const getMessageByType = (type: NotificationType, data: Item<Notification>) => {
  switch (type) {
    case 'follow_user':
      return `@${data.data.attributes.me.data.attributes.username} kullanıcısı sizi takip etti.`;
    case 'like_event':
      return `@${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.event.data.attributes.title} etkinliğinizi beğendi.`;
    case 'comment_event':
      return `@${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.event.data.attributes.title} etkinliğinizi yorum yaptı.`;
    case 'comment_post':
      return `@${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.post.data.attributes.description} gönderinize yorum yaptı.`;
    case 'like_post':
      return `@${data.data.attributes.me.data.attributes.username} kullanıcısı ${data.data.attributes.post.data.attributes.description} gönderinize beğendi.`;
    default:
      return '';
  }
};
