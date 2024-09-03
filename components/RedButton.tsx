import { Pressable, StyleSheet, Text } from "react-native"
import ArrowLeftSvg from "../assets/ArrowLeftSvg/ArrowLeftSvg"

const RedButton = ({title, buttonAction}: any) => {
    return <Pressable 
    onPress={buttonAction}
    style={({pressed}) => [
        {
            transform: [{ scale: pressed ? 0.98 : 1 }],
        }, 
        styles.body]}>
        <Text style={styles.text}>{title}
        </Text>
            <ArrowLeftSvg style={styles.svg}/>
    </Pressable>
}

const styles = StyleSheet.create({
    body: {
        width: 261,
        height: 40,
        backgroundColor: "#C32328",
        borderRadius: 12,
        justifyContent: "center",
        flexDirection: "row",
        alignSelf: "center",
        
    },
    text: {
        fontFamily: 'Montserrat-bold',
        color: "white",
        alignSelf: "center",
        
    },
    svg: {
        alignSelf: "center",
        marginLeft: 10,
    }
})

export default RedButton