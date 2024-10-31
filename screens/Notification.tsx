import { Box } from "@/components/ui/box";
// import { Text } from "@/components/ui/text";
import useNotificationService from "@/service/useNotificationService";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import Entypo from "@expo/vector-icons/Entypo";
import { Divider } from "@/components/ui/divider";
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
    <>
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center gap-3 w-4/6">
          <Avatar size="lg">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABHEAABBAEBBQQGCAMGAgsAAAABAAIDBAURBhIhMUETUWGBBxQiMnGRFSNCUnKhscEzYtEkJUNTgvAWsiY2Y2Rzg5KToqPh/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAwUCBv/EACkRAAICAQMDAwQDAQAAAAAAAAABAgMRBBIhBRMxMkFRFCJhcRUkgZH/2gAMAwEAAhEDEQA/AOvIiLEGwiIgAiIgAtW9egpNBmdxd7rRzK2XHdaSeQGq5B6VNoLsFcNqiRrbRLTOOUbR0HcT/VXU173yGSQ2n9LVajlIauLgFmON+luVx0AHVrdOZ8Vac3ZjzGBhdVk36N+IhxHIhw5H81+Zzp05LqPoj2gMtexsxcfwe101He6OHFzB+o8032opoH4OZ3KzqluepIPagkcw+RWB2m446dFbvSTjRU2g9ZY32LTN/l9ocCqrHE6eRkEY1fK4MaPEnT91cSvB+msZKcTsfiYWkCRtOGNuvTRgXHvSjtJayOQZiW2Xvr1TvSgu4Ok//B+Z8F07bHIR4unJK531dODQD+bTl+i/PViaSxPJLId6SV5c495J4quMElkhLLLjsd6Rsts7K2GzK+/jzw7GV2rox3tcf0K7vs9m6O0GNZfx0vaROOhBGhaRzB8VwLYHYa5tXa7SQOgxcZ+tn04v/lb3nx6L9C4rG1MTQipY+BsFeJujWN/U958UvqHD/STbREShAREQAREQAREQAREQiQiBEEBERABERBIIBGh5Hmq7m9moLsEwbGySJ40fDIOB+CsLntY0uc4ADmSeSir+ep1I3uDmvDPecXaNb5q6pyT+1HLOFbXbC2cW+SzjWvmrc3xO9+L+oVToXJ8dkIL1VxbPBIHsPiP96ea7bf2vgyk5bjKs+SlHACnESwfF50b+aq2T2Eyueui2yhWxG9qXh8++XH8LRoPmnJXVwWZySJinLgzbfGHaLZWDNUtNGETFoHuh3B7fIqk7D0xf2xw8D/c9ZbI74M9o/ouk4nYTIUMZLj3Zxhrzb2+xtXvGhGpP7Lxi/RrHircdulmLUdiMENeI2cNRoeY7ks+o6VcbyxUywRPpbzRd2ePjdo+w8zzfh14D5/oof0ebC2NqbLbVprocTG725Osx+639yrVlPRo7J2TasZuaSctA1lhaRoOQ4aK0Y520+Iqw1q/0PZhiG6yPs3QaD4jUaqPr6JLEZB25JeC40adahViq04WwwRt3WMaNAAthVP8A4vs1CfpjAXa7B709UiyweTfa/JTWJzuKzDS7GXobBHvNa7R7fi08Qqms8rk5w15JJE6aouCAiIggIiIAIiIAIiIRIREQQERDwCABIHNad/Iw0xo4kynkwdfiseWyAps0jIM5Hs68h4rn8tu7n7s1TFzlkbXFtm/prud7Wd7vHomIVxS3zeERzLhG5l9o7Vy6cfj4jbvc/V2HSOEd7z/sr5V2UbZkbY2gndfkHFsA9mCM+DevxKtGB2WrYzHthpN7IHi5xG86Q97yeZWeJkUT5WTaFwPNJazU3eIfbF+5dWof6acMUcDBHBG2Jg5NYAAveqO03jpy1XxeclKTbbY2sYPpXxEXBITQHmiKQAJB8FH3sNQvSCWWARzt92eE9nI34OCkEVlds63mDwQ0n5NKLIZbDgCx2mUpjm5rdJ2D4cn+XFWHF5OllqrbOPnZNEToS0+6eoI6HwKi/wAlFXsbPHb+ksNL6tkNPbB/h2QPsvHU9zuYWvptfGeIW8P5KJ0+6Lrqih9n85Fl4pGPYa96A7tiq88WHvHe09CphaDTXkXfwERFBAREQAREQiQiIggLDbsMqwOmk5AcPFZlVtrspDVZJJK76iqwvfp1P+9Araa98uQZWNobtvJ5BmGx8u7cte1PKD/Ah6n49ArNjMdWxVKKnRjDIIm6N7z4k95URsZjZK9R+TvM/vC+e0l1+w37LPIKxLI6prN8+1B8Iapr2rLN2LJTxxCMNDvErTc9znl79C4nXkvKLNs1FlkVGT8FihFPKR9PEr4iKk7CIigAiIgAiIgAvup718RSBH5LGusSMu0JfVslAPqpxycPuPHVp7lN7PZlmWrvEkZr3YDu2azjqY3d472nmCtQ8tOiisvBZrStzOLZrfrDR0YOgsxcyw+PUdx+JWtoNZl9qx/ootrzyi6otLD5OtmKEN2m/ehkGuhHFp6g9xBW6tVrAqERFABERCJAREQBjsSCGF8juTRquZ5ppy+cx2J11Y95uWv/AA2Hg0/FxHyV92glMdLcB4yOA/dUfZEeuZrNZTiWiRtWI/ys4n8z+StnNU6aVhNa3TwWzXhwAHgviAADgi8g235HwiIoAIiIAIiIAIiIAIiIAIiIAJ11RFK4Ag6srtl9pGnU/RGVkDXDpXsHkfBruXx0V81HmqrlKMWSoT05h7MrSNerT0I8QeKi8RtzJUg9Sy+OuvmpaQ27UMYc0EcnaDjppxXpNHd9RVz5QpbDD4L8i57Y20ydq5VvYyGOLBm7FW3pmnfsB7w0ub90AnzXQhy4piUGioIiLlAAvEsrImF0hDQBqV7ULtK9wihYPdc47y7rhvlggjtp8lFJWMkLiRAx7na8tVD+j6Hstk6MhHt2A6d/xe4n91W7MectUM3PRtvsOhsPryUJGDdMe6CCzqDofyUps5s/NlcVRfne3irRwhlajHI6MMAHvu0IJcVOvVTp7blhFtEWnkuaKn4vaF2NZPh7cFq3dqSmKJsTC50kfNrieXLhqT0Uxj83JZv+pXsdPRnfGZYxI5pD2jnpp1GoXnrNBbBvb4GlImETiox9e5tBlZMTTnkq067Qb1mPg8lw1EbD0JHEnoNO9V6TSz1M9kSJzUFlme1lcdSfuWrkLH/cLtXDy5rxUzeMuSCKvdhdKeTN7QnyKtWG2fxmJrmGhTiiafeO7q5573OPEnxK+5fDYvJVXQZKpBLH0LgAW+IPMHxC3v4OpRxu5+RT6z4INFERw2NnczHh7U77NK00uoWJDq8acTG49dBxB56BS6wtZpZaazZIbrmprIRESh2EREe4GC9cho1zNZcQzUNa0DVznHkABxJXiPH7T3hvwxUMfGeIFjelk08Q0gD5laRt1a+0FrI5NxFPC0hOABr7b9Rvad+g0HxKl9htvsXtfJPDSingmhAcYpgNS09QQSvVdO6bT2lOay2JX3STxE1Z6G0uPb2k0dK/CPf9Wa6ORo66NJIPzCyVLMNuu2eB+9G7ryIPUHz4FXU8QqTka/0ZtW6OL2a2ShdPudGzMIDiPxNc0/EHvXPU+nVdt2VrDRFF7b2yM/Xlqq9lSMRnquVGor3C2ra7g4n6t58+HmrCVo5yh9J4e5S10dLE4MPc7TVp+YCw9Hbstx7PgcaNTauMDENkI0bBarzH4NkaVeB39SqHh5htHslGLXsm1WMU3e12mhPx14qzbLXpr2Ii9b09cr6wWQP8xnAn4Hn5rY032wdb8pi9y8Ml0RFeikKK2hi3qYf91wKleijs4/cx7+u+Q0DzVlLxYiGUnZlxG1G0DG8I92s8j+ctIP5AK0a9+vkqrsJ9e/O3XcTLkXMaf5WNaB+6tKw+rSzqpDtXoR5DGB5fut3zzcBzHcVXs6JYtp8BNwEG/JE5xOnEt1A/JWRVTbyc+r4yrCNZ5shD2bjyaQ7VV6Fyldhs7fgtXXUcj0WzsLuvqZJ/+I7Izdp5aBv/AMQFrOcOZIWhjMnFs9n5223BmMyj2ubOTo2KwGhpDj0DgBoe8LQ6Niu6SYvqYtwOgDgFzD05Us3aw1J2HbZkrxyuNqOvrvcR7JIHEjn+S6c14LQQdRpqvhII5gFenM1PDOPYurlq/o4xNnNtmFyvlIDXE4O+2N8gZoevFrirl1OnXiFqbWX25nKUsLRe2WOtZZYvyNOrYtz2ms1+8XaHTuW3odOHDQ6LzPXJxdkUvJpaWLUcsJ4qJvZGeW8MThYmTZFzd6Rzwdys370hHXubzKyt2GFsb+by2QtTHiRDMYYweoDW/vqk9P02c47pvBZK1R4JHnyRRFj0eQRML8TmMnSnHFrjYdI3za48VGRZy9s/aNDbHcY0j6jJRNPYy+DiPdK7u6XJRzVLJEbkyQt167czLFlR/deXrepzO103JATu6nprqePfopPYL0fUNjrFmzBbmuTTtDd+UBu63npoFhbPi8xVfFHPVuVpBo5rZGvBHiAUqtzeNa2PH5US1hyjvRdoWju3wQdPitPQ65VV7LljBRdS5vMS+kjwVDzl1t/bONkDga+Kqv7V+vAzSkaM17w1up+IW063mrMZjtXIImEaf2WMg6fEkqPdVipRMr1mCONuriNdS5x5k95V1utpvzTDnJOl0st6cjd9aiPIr21wc3gRoeqjBotiq8lxb38h3LI1XTo1R7kWak6klwRGyQ9UyObxgGjYrfbRg/dkG9+pKlsPKaW189Yu0iyFcTBo/wAxh0d+RHyUbWb2O3Nsj3LVKN3m1xH7he89Kaec2duDhpd7F57w9pGnz0V1c/7S+JIQsWYMvqJx8uiJ33FhzUPtK/dpsH82v5FTGuirm2Eu7XAHSN7vyVunWbEcsrHo247NGbrLcncf/Xp+ytSq/o0GmxlI/ffK7/7HK0LzfUXnUz/Y/D0odVA7aY51/BWHVh/aqwFiAjmHM9ofop5fHAEcfkqdPa6rFJHTIDEZL6WxdW8D/HjDi0dD1HzWzKyOaN0M0bXwvGjmPGocD0IUNhIPojK5LDcRA1/rFUd0b+YHwKnWt3jo3iV6putR3IbhtcOTBWwZrRtGIymQx8ZH8KKbfjb8Gu1A8llfh7VmMx5HOZS1Hr7hlEYPx3ANVJxNLGNB5gLzbkfHVmlb77GFzfiBwWG9fqHPZGXAlKuGXwQ0mSo4iSPE4eibNw+5TqgcO8vPJo66lb1XD7R3tHXrtfHRO5xVW78g8N88PkFh9E9OMbLtybtJLuQe6axKfecSeWvcO5XXTxWoqK63ysv5FZWSfCI/E4eniKpr0o9xpO895OrpHfecepXnE0r1Ke0LV82673A1+0aA+MdWkjmO7qpJF3uycGjmscMrjJ6JsS1xM3dMkJ0cB10PTu81kgoV4qDKPZNdWYwRhj/aBA7+9bSI3PAFbm2D2WlkLzhKrXE+8wFp/IqKnpSbMZilBDZlmxd5xiZFO8vdDIASNCehAPAq8qn7S/3htZi6P2KjHW368N4nVjQPmT8lE/vg1Pxg7rbySKwWIe2GvVZzz4r4vMV2SrnuiPJuPJoitJ4fNbNeIxDvJWXgnHpzTNuuttjtfg7lY5cEFI4O21rtbzbQeXebxp+hWDb13Z4ylP1iyFdwP/mBMZra20y1kH2K0MVYfi94/qF59ILS7CQNHN16uB/7gT1fGqrj+BeXpZ0Vp1aD3r6vMfBjQe5elpPyJhVbbIHs3j/u7/3VpVb2rYXkD70TgrtNjuHLK76NP+pOOB56P/53KzKs+jY/9EKrT9iWVnykcrMvMa9f2Z/s0I+lBOoPciJM6K7tSG07eNy277MEvZTk/wCU/gfkdCrA1rW+60adNFpZ6o29hrdV7dRLGW/ktTY7InJbN05pSTOxvZS/jad0/otGUpS0iefTwRyngmkIBBDhqDwIRFnJ48EkDs92+y+0UeL3jJisrK91Zn2q8uhc5v4SAVflTq8Zt7a0gfco1Xzbvc953QflvK4r1UJuVcXLzgRnhS4CIik4CIiACrG2mNmMMeaxrd7I48FwYP8AGi+2zzHEeIVnQgcdRrqpTSJTwVfH3a+RowXKj9+CZge0/sfELYVXw8ZwW1mTwGmlOc+uUvAH32D4FWlef11HZtaXh+B6EsrJ8WvkbsOPpT3LDtI4GFzvHToPis0kjImF0jgAASeKrFeU7VZUPZr9D0ZA4O6WZQeA8Wt/VRpad0u5L0olskdlaM1XF9rcbpbtPdYn14kOdx08hoFg2qj9atYKl9qXJRnT8Grz/wAqn9NTwUTUay/t5DHrqMdUMru7fkOg89Afmm9C3dqnY/yV2PbHBdhy80RFre4oAoTaSMn1d3dq0qbC0M1X7ei/T3mDeC7pltmmQ/BRPR28MxeQpn3quRmZ5Eh37q1Kl7OTfR+3GXoP4MvQx2ox/MODv9+CunTxWH1atw1LfyO1PMEERFmFh4nH1L/AKmbHTmjls9QA9iO2JGjuDxqrnN/Cf+ErnbKd2ztzlxj7jqsnq0Uh0YHB/ADiD+y1NBFWV2QfgHxydGjeJBq3iO9etFTPWtp6Z9unVthv2oZDG4/6T/VZY9qco07s+AvNPe0sd+64/j5t5i01+yWyb2Om9c2m2gm04Quirg/hbvfq5XJc89Ft3tbmfZKx0Uz73aFj9A4atC6Gt2cduF+BCfqCIi4OAiIgAh5IvMj2xtJceAGqCTn/AKQ3+rZ7B3oxpIy2ISR9prmnUfos2W2noY09lNK3tz7sLTvyO/0hRm2W5tFnaWKjeXdnIbNjsjxY0AhoJHIklSuI2coY129XrRxvPvO5ud8XHiltb2Eo9zyN1JqJDtq5PaiVjsiH0cYPer6/WTfiPQeCttWCKrAyCvG2OKNu61jRoAFlA0Gg4BPgsa/UysW1cL4LcHx7mtaXPdutA1Lj0Heo30bRuuV8jn5maHJ2S6HXpC32W/PTVau1ck1ipHhqLv7XkndiD9xn23+QVzxlGHHUIKdZu7BBG2Ng7gBoFr9Pr7dLk/LFrpextIiJtFAC+OAcCCAde9fUKEByrbutLhMpSzddpBoy7sug96F/P5H9Vcq00diBk0RDmPaHNcDzBW9tDjWZCk9hYHndIII13m9QudbP5OXZi8MFlXO+j5D/AHfacOA/7Nx/T4LjqFH1NKnH1Itpnh4ZekXlr2uGrXAjvCSPaxuruS8w00OYz4Mdt4ZA7U6EjQKsbOwh+2+csD3Y68EZ+JGqmbdgua54DnBo4NbzKx7M4+WlVns2wBcuymaYfd6Nb5NAT9Eu1p5v54CUSVkhjk4uYPILA6k37DyPiFtIkVJrGAyVC/Uu7O5p2ex8Lp4JWht2KEe0NOUjR106hXLB7TY/LV2vr2GPPXR3I9xHReOGnHkq7k9kaFmwbNYS1LLuJnrP7N39D5rZ03UYtKNv/SmdSkX5s0bxqHtPwK9b7ehHzXMDito6p0qbRSuaOXrdVryf9QXnc2xadPpbGEd5rOCeVtD8TRV2JHUS9o5kDzXkzxN4ukaPNczMW1jxocxj2HvZTJ/UrwMLmbI/t20d546sqxNiH7qHdSvM0SqGXzIbQUaMbnz2I2AcS57g0fmqfkNr72b1rbOVnOD/AGfW5WlsTPEa8XH8kqbJ4+NzZH1zK8HXtbTjK7XzVggrMiAa0cvBK2dSqgvs5ZZGlLyR2zmCiwtZ533T3J3b9ixIdXSO/ophEWNbbK2TlItXCI/MOvwRCzjg2Uxe0+u7nIPA9/6qO/4mquxD8l27WQNBLt4aOaR9nT73TRWHx4eaom02Jp4jaKhnbEDpcWbDXXK4OjWv5CXTrpwJ+C0NFGi9qua5OZyaWS37FYyzI5+dyjC2zZbpBE/nBF0HgTzKti8QvZJE18RDmOG81w5EHkQva138IRby8sIiKEACIiAB5aKu7SbOV8tXla6FkjXjV0Z6nvHcVPTzxV2b8z2tb4lajcpSc12kwBA1G9qAfMq2renmJDOZSyZDZiSCoC/IRTyiGvC47s7Xd2vJwHedFaIobEzGOkhdE4jix5BLfDgSoGKQ5P0iB0vtMo1DL4do86Dz01Vy00WV1jtwsUYrkdom9prQ1GtOsnE+C2URYpa3kIiKCAiIgAvO4wni1pPwXpFKJyz5uN6NaPgF9HwREBlhERQGQiIggLVylWK7j5q07N+J7C1ze8FbS+OG80jvC7rk4TUkH4Ib0Z5KWJlrZq+/WzjD9S8/4kJ90j4clelybPWDgdocVtA07sTJfV7fjE7hx+HPyXWA4O4jiDxB716rdvgrF7iVkdssH1ERco4P/9k=",
              }}
            />
          </Avatar>
          <View className="flex-col gap-1">
            <Text className="font-bold font-medium-cereal text-base">
              {item?.title}
            </Text>
            <Text className="font-medium">{item?.message}</Text>
            <Text className="font-medium">
              {new Date(item?.createdAt)?.toLocaleString()}
            </Text>
          </View>
        </View>

        <Entypo name="dot-single" size={30} color="green" />
      </View>
      <Divider />
    </>
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

      {/* <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center gap-3 w-4/6">
          <Avatar size="lg">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </Avatar>
          <View className="flex-col gap-1">
            <Text className="font-bold font-medium-cereal text-base">
              Phản hồi của mentor
            </Text>
            <Text className="font-medium">
              Mentor LamNN dax chap nhan yeu cau cua ban
            </Text>
            <Text className="font-medium">30-10-2024</Text>
          </View>
        </View>

        <Entypo name="dot-single" size={30} color="green" />
      </View>
      <Divider /> */}
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
    // marginTop: 20,
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
