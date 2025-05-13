// app/video/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {Ionicons, MaterialCommunityIcons, FontAwesome6} from '@expo/vector-icons'; // 示例图标库
// 如果你需要视频播放/处理，可能需要导入如 expo-av 或 react-native-video
// import { Video } from 'expo-av';

const allPetsData = {
    shibata: {
        id: 'shibata',
        name: '柴田',
        avatar: require('../../assets/images/shibata_avatar.png'),
        videoStreamImage: require('../../assets/images/pet_video_placeholder.jpg'),
    },
};

export default function VideoCallScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [pet, setPet] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);

    useEffect(() => {
        if (id) {
            setPet(allPetsData[id]);
        }
    }, [id]);

    const handleEndCall = () => {
        router.back();
    };

    if (!pet) {
        return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerShown: false}}/>

            <View style={styles.topInfoArea}>
                <Image source={pet.avatar} style={styles.avatar}/>
                <View>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.videoStatusText}>Video</Text>
                </View>
            </View>

            <View style={styles.topControlsContainer}>
                <TouchableOpacity style={styles.controlButtonContainer} onPress={() => setIsSpeakerOn(!isSpeakerOn)}>
                    <View style={[
                        styles.controlButton,
                        isSpeakerOn ? styles.controlButtonBgActive : styles.controlButtonBgInactive
                    ]}>
                        <FontAwesome6 name={isSpeakerOn ? "volume-high" : "volume-xmark"} size={24} color={isSpeakerOn ? "black" : "white"}/>
                    </View>
                    <Text style={styles.controlButtonText}>免提</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButtonContainer} onPress={() => setIsCameraOn(!isCameraOn)}>
                    <View style={[
                        styles.controlButton,
                        isCameraOn ? styles.controlButtonBgActive : styles.controlButtonBgInactive
                    ]}>
                        <FontAwesome6 name={isCameraOn ? "video" : "video-slash"} size={24} color={isCameraOn ? "black" : "white"}/>
                    </View>
                    <Text style={styles.controlButtonText}>摄像头</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButtonContainer} onPress={() => setIsMuted(!isMuted)}>
                    <View style={[
                        styles.controlButton,
                        isMuted ? styles.controlButtonBgInactive : styles.controlButtonBgActive
                    ]}>
                        <FontAwesome6 name={isMuted ? "microphone-slash" : "microphone"} size={24} color={isMuted ? "white" : "black"}/>
                    </View>
                    <Text style={styles.controlButtonText}>静音</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButtonContainer} onPress={() => console.log('Share pressed')}>
                    <View style={[
                        styles.controlButton,
                        styles.controlButtonBgInactive
                    ]}>
                        <FontAwesome6 name="slideshare" size={24} color="white"/>
                    </View>
                    <Text style={styles.controlButtonText}>分享</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.endCallButtonContainer} onPress={handleEndCall}>
                    <View style={styles.endCallButton}>
                        <FontAwesome6 name="xmark" size={24} color="white"/>
                    </View>
                    <Text style={styles.controlButtonText}>结束</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.videoArea}>
                <Image source={pet.videoStreamImage} style={styles.videoImagePlaceholder} resizeMode="cover"/>
                {/* 如果使用 expo-av 播放视频:
          <Video
            source={{ uri: 'http://your-video-stream-url.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted} // 可以通过状态控制
            resizeMode="cover"
            shouldPlay
            style={styles.videoPlayer}
          />
        */}
            </View>

            <View style={styles.bottomControlsContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={() => console.log('Capture pressed')}>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        paddingTop: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    topInfoArea: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    petName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    videoStatusText: {
        color: 'lightgray',
        fontSize: 12,
    },
    topControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 15,
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    controlButtonContainer: {
        alignItems: 'center',
        minWidth: 60,
    },

    controlButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    controlButtonBgActive: {
        backgroundColor: 'white',
    },
    controlButtonBgInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    controlButtonText: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
    },
    endCallButtonContainer: {
        alignItems: 'center',
    },
    endCallButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    videoArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    videoImagePlaceholder: {
        borderRadius: 12,
        height: '30%',
        width: '96%',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    bottomControlsContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 0,
        alignItems: 'flex-start',
        zIndex: 10,
    },
    captureButton: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 3,
        borderColor: 'white', // 外圈
        justifyContent: 'center', // 如果内部还有元素
        alignItems: 'center',   //
    }
});