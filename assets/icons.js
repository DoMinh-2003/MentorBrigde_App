import { AntDesign, Feather } from "@expo/vector-icons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export const icons = {
    Home: (props)=> <AntDesign name="home" size={26} {...props} />,
    HomeStudent: (props)=> <AntDesign name="hearto" size={26} {...props} />,
    Profile: (props)=> <SimpleLineIcons name="handbag" size={26} {...props} />,
}