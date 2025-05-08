// app/pet/[id].js
import {Stack, useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {FontAwesome6} from '@expo/vector-icons';

const allPetsData = {
    shibata: {
        id: 'shibata',
        name: '柴田',
        age: '5岁',
        avatar: require('../../assets/images/shibata_avatar.png'),
        banner: require('../../assets/images/shibata_banner.png'),
        breed: '柴犬',
        weight: '10.3kg',
        birthday: '2019/04/01',
        gender: '女',
        abnormalities: 1,
        nextSchedule: {
            activity: '洗澡',
            person: '马哥',
            time: '2023/09/13 18:00',
            icon: 'bath',
            color: '#32ADE6',
        },
        todayStatus: {
            liveImageUrl: require('../../assets/images/pet_live_feed.png'),
            statusText: '静止',
            lastUpdated: '12:25',
        },
        activityLog: [
            {id: '1', time: '11:13', description: '吃午饭', icon: 'utensils', type: 'normal'},
            {id: '2', time: '8:53 - 11:12', description: '坐在客厅中央', icon: 'person-walking', type: 'normal'},
            {id: '3', time: '提醒', description: '频繁抓挠屁股', icon: 'circle-exclamation', type: 'alert'},
            {id: '4', time: '6:34', description: '起床', icon: 'bed', type: 'normal'},
        ],
        activitySummary: {
            duration: '32 min',
            weather: '多云',
            temperature: '12°C'
        }
    },
};

export default function PetDetailScreen() {
    const {id} = useLocalSearchParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        if (id) {
            const currentPet = allPetsData[id];
            setPet(currentPet);
        }
    }, [id]);

    if (!pet) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading pet details...</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: pet.name,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => console.log('Edit/Share pressed')}>
                            <FontAwesome6 name="pen-to-square" size={24} color="#007AFF" style={{marginRight: 15}}/>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ScrollView style={styles.container}>
                <Image source={pet.banner} style={styles.petbanner}/>

                <View style={[styles.card, styles.infoCard]}>
                    <View style={styles.infoCardHeader}>
                        <Text style={styles.petNameLarge}>{pet.name} <Text
                            style={styles.petAgeSmall}>{pet.age}</Text></Text>
                    </View>
                    <View style={styles.infoDetailsRow}>
                        <InfoDetailItem label="种族" value={pet.breed}/>
                        <View style={styles.separator}/>
                        <InfoDetailItem label="体重" value={pet.weight}/>
                        <View style={styles.separator}/>
                        <InfoDetailItem label="生日" value={pet.birthday}/>
                        <View style={styles.separator}/>
                        <InfoDetailItem label="性别" value={pet.gender}/>
                    </View>
                    {pet.abnormalities > 0 && (
                        <View style={styles.abnormalitySection}>
                            <FontAwesome6 name={'circle-exclamation'} size={14} color={'red'}/>
                            <Text style={styles.abnormalityText}>{pet.abnormalities}处异常</Text>
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{pet.name}的下一日程</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={styles.scheduleContent}>
                            <FontAwesome6 key={pet.nextSchedule.icon} name={pet.nextSchedule.icon} size={32}
                                          color={pet.nextSchedule.color}
                                          style={styles.scheduleIcon}/>
                            <View>
                                <View style={styles.scheduleIntro}>
                                    <Text style={styles.scheduleActivity}>{pet.nextSchedule.activity}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                                        <FontAwesome6 name={'circle-user'} solid={true} size={14} color={'#999999'}/>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            color: '#999999'
                                        }}>{pet.nextSchedule.person}</Text>
                                    </View>
                                </View>
                                <Text style={styles.scheduleTime}>{pet.nextSchedule.time}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreText}>查看更多 ></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{pet.name}今天怎么样?</Text>
                    </View>

                    <View style={styles.liveFeedContainer}>
                        <Image source={pet.todayStatus.liveImageUrl} style={styles.liveImage}/>
                        <View style={styles.liveOverlayTop}>
                            <View style={styles.liveBadge}>
                                <Text style={styles.liveText}>● LIVE</Text>
                            </View>
                            <Text
                                style={styles.liveStatusTime}>{pet.todayStatus.statusText} {pet.todayStatus.lastUpdated}</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, {paddingHorizontal: 32}]}>
                    <View style={[styles.infoDetailsRow, {width: '80%', paddingBottom: 12, borderBottomColor: '#EBEDF0', borderBottomWidth: 1,  alignSelf: 'center'}]}>
                        <InfoDetailItem label="动作持续" value={pet.activitySummary.duration}/>
                        <View style={styles.separator}/>
                        <InfoDetailItem label="天气" value={pet.activitySummary.weather}/>
                        <View style={styles.separator}/>
                        <InfoDetailItem label="活动" value={pet.activitySummary.temperature}/>
                    </View>
                    {pet.activityLog.map(log => (
                        <View key={log.id} style={[styles.logItem, log.type === 'alert' && styles.logItemAlert]}>
                            <FontAwesome6 name={log.icon} size={20}
                                                    color={log.type === 'alert' ? 'red' : '#555'}
                                                    style={styles.logIcon}/>
                            <View style={styles.logTextContainer}>
                                <Text style={styles.logTime}>{log.time}</Text>
                                <Text style={styles.logDescription}>{log.description}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={styles.logFooterButtons}>
                        <TouchableOpacity style={styles.logFooterButton}>
                            <FontAwesome6 name={'video'} size={20}
                                          color={'#34C759'} />
                            <Text style={{color: '#34C759', fontSize: 18}}>视频</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logFooterButton}>
                            <FontAwesome6 name={'file-medical'} size={20}
                                          color={'red'} />
                            <Text style={{color: 'red', fontSize: 18}}>检查</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </>
    );
}

const InfoDetailItem = ({label, value}) => (
    <View style={styles.infoDetailItemContainer}>
        <Text style={styles.infoDetailLabel}>{label}</Text>
        <Text style={styles.infoDetailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingBottom: 24,
        backgroundColor: '#fff',
    },
    petbanner: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
        marginHorizontal: 24,
        marginTop: 18,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 3,
    },

    infoCardHeader: {
        marginBottom: 10,
    },
    petNameLarge: {
        marginRight: 6,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    petAgeSmall: {
        fontSize: 14,
        color: 'grey',
    },
    infoDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0,
        marginBottom: 10,
    },
    separator: {
        width: 1,
        height: '60%',
        backgroundColor: '#999999',
        alignSelf: 'center',
        marginHorizontal: 5,
    },
    infoDetailItemContainer: {
        alignItems: 'center',
    },
    infoDetailLabel: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 2,
    },
    infoDetailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    abnormalitySection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        paddingVertical: 3,
        alignSelf: 'flex-start',
        borderRadius: 6,
        backgroundColor: '#F5F5F5',
        marginTop: 5,
    },
    abnormalityText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'red',
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    viewMoreText: {
        fontSize: 13,
        color: 'grey',
    },
    scheduleContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleIcon: {
        marginRight: 12,
    },
    scheduleIntro: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    scheduleActivity: {
        fontSize: 15,
        color: '#333',
    },
    scheduleTime: {
        fontSize: 13,
        color: 'grey',
    },

    liveFeedContainer: {
        height: 200,
        backgroundColor: '#000',
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    liveImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    liveOverlayTop: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    liveBadge: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    liveText: {
        color: 'green',
        fontSize: 12,
        fontWeight: 'bold',
    },
    liveStatusTime: {
        color: 'white',
        fontSize: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 3,
    },
    liveOverlayMiddle: {
        position: 'absolute',
        top: '40%',
        right: 10,
        flexDirection: 'column',
    },

    logItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    logItemAlert: {
        backgroundColor: '#ffeeee',
        borderRadius: 6,
        paddingHorizontal: 12,
    },
    logIcon: {
        width: 24,
        marginRight: 10,
    },
    logTextContainer: {
        flex: 1,
    },
    logDescription: {
        fontSize: 12,
        color: 'grey',
    },
    logTime: {
        fontSize: 14,
        color: '#333',
    },
    logFooterButtons: {
        flexDirection: 'row',
        gap: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 5,
    },
    logFooterButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#F5F5F5',
    }
});