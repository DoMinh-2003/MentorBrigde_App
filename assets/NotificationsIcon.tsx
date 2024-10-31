
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import useNotificationService from '@/service/useNotificationService';
import { useFocusEffect } from 'expo-router';
import { Badge, BadgeText } from '@/components/ui/badge';
import { StyleSheet, View } from 'react-native';
import { useStateValue } from '@/context/stateProvider';

const NotificationsIcon = (props: any) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { getNotifications } = useNotificationService();
  const {  realtime } = useStateValue();

  useFocusEffect(
    // Giả sử hàm getUnreadNotificationsCount là hàm API bạn đã định nghĩa để lấy số lượng thông báo chưa đọc
    useCallback(() => {
        const fetchNotifications = async () => {
            const response = await getNotifications();
            const unreadNotifications = response.filter(
                (notification: any) => !notification.isRead
              );
             
              console.log(unreadNotifications);
              setUnreadCount(unreadNotifications.length);
          };
      
          fetchNotifications();
    },[realtime])
  );

  return (
   <View>
     
      <Ionicons name="notifications-outline" size={26} color="black" {...props} />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Badge variant="solid" className="bg-red-600">
            <BadgeText className="text-black">{unreadCount}</BadgeText>
          </Badge>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    iconContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default NotificationsIcon;
