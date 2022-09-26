import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { windowHeight } from "../../utils/fonts";

export default function ({ navigation, route }) {
    const [playing, setPlaying] = useState(true);
    console.log(route.params.link)


    return (
        <View style={{
            flex: 1,

        }}>
            <YoutubePlayer
                height={windowHeight}
                play={playing}
                videoId={route.params.link}

            />
        </View>
    );
}