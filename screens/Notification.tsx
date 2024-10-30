import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import useNotificationService from "@/service/useNotificationService";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Dữ liệu thông báo
// const notifications = [
//   {
//     id: "060f3e28-df58-46b8-9c38-5c74627fc416",
//     title: "Phản hồi của Mentor",
//     message: "Mentor đã chấp nhận booking của bạn",
//     createdAt: "2024-10-30T00:41:08.800948",
//     isRead: true,
//   },
//   {
//     id: "0780a726-799a-4afc-97f4-1cdad5bf9c5f",
//     title: "Phản hồi của Mentor",
//     message: "Mentor đã chấp nhận booking của bạn",
//     createdAt: "2024-10-29T17:14:24.387817",
//     isRead: true,
//   },
//   // Thêm các thông báo khác ở đây...
// ];

const Notification = () => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState();

  const { getNotifications } = useNotificationService();

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const data = await getNotifications();
        setNotifications(data);
      };
      loadData();
    }, [])
  );

  const renderItem = ({ item }) => (
    <Box
      style={styles.notificationItem}
      p={4}
      borderWidth={1}
      borderColor="#ccc"
      borderRadius="lg"
      bg="#f9f9f9"
      mb={3}
    >
      <Text fontWeight="bold">{item.title}</Text>
      <Text>{item.message}</Text>
      <Text fontSize="sm" color="#999">
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </Box>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Thông Báo</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notificationItem: {
    marginBottom: 12,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  notificationTitle: {
    fontWeight: "bold",
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default Notification;
