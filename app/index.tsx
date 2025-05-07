import {Link} from "expo-router";
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from "react-native";

export default function Index() {
    const petsData = [
        {
            id: 'shibata',
            name: '柴田',
            age: '5岁',
            avatar: require('../assets/images/shibata_avatar.png'),
            breed: '柴犬',
            weight: '10.3kg',
            birthday: '2019/04/01',
            gender: '女',
        },
        {
            id: 'haha',
            name: '哈哈',
            age: '2岁',
            avatar: require('../assets/images/haha_avatar.jpg'),
            breed: '拉布拉多',
            weight: '15kg',
            birthday: '2023/01/10',
            gender: '男',
        },
        {
            id: 'shibata',
            name: '柴田',
            age: '5岁',
            avatar: require('../assets/images/shibata_avatar.png'),
            breed: '柴犬',
            weight: '10.3kg',
            birthday: '2019/04/01',
            gender: '女',
        },
        {
            id: 'shibata',
            name: '柴田',
            age: '5岁',
            avatar: require('../assets/images/shibata_avatar.png'),
            breed: '柴犬',
            weight: '10.3kg',
            birthday: '2019/04/01',
            gender: '女',
        },
        {
            id: 'shibata',
            name: '柴田',
            age: '5岁',
            avatar: require('../assets/images/shibata_avatar.png'),
            breed: '柴犬',
            weight: '10.3kg',
            birthday: '2019/04/01',
            gender: '女',
        },
        {
            id: 'shibata',
            name: '柴田',
            age: '5岁',
            avatar: require('../assets/images/shibata_avatar.png'),
            breed: '柴犬',
            weight: '10.3kg',
            birthday: '2019/04/01',
            gender: '女',
        },
    ];

    const renderPetItem = ({item}) => (
        <PetCard pet={item}/>
    );

    return (

        <ScrollView style={styles.container}>
            <Text style={styles.title}>Petopia</Text>

            <FlatList
                data={petsData}
                renderItem={renderPetItem}
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addPetButton}>
                        <Image source={require('../assets/images/paw_icon.png')} style={styles.addPetIcon}/>
                        <Text style={styles.addPetText}>新增宠物</Text>
                        <Image source={require('../assets/images/plus_icon.png')} style={styles.addPetIcon}/>
                    </TouchableOpacity>
                }
                style={styles.petList}
            />


        </ScrollView>
    );
}

const PetCard = ({pet}) => {
    return (
        <Link
            href={{
                pathname: '/pet/[id]',
                params: {id: pet.id}
            }}
            asChild
        >
            <TouchableOpacity style={styles.petCard}>
                <View style={styles.petCardContent}>
                    <View style={styles.intro}>
                        <Image source={pet.avatar} style={styles.avatar}/>
                        <View>
                            <Text style={styles.petName}>{pet.name}</Text>
                            <Text style={styles.petAge}>{pet.age}</Text>
                        </View>
                    </View>
                    <View style={styles.petDetailsRow}>
                        <PetDetail label="种族" value={pet.breed}/>
                        <View style={styles.separator}/>
                        <PetDetail label="体重" value={pet.weight}/>
                        <View style={styles.separator}/>
                        <PetDetail label="生日" value={pet.birthday}/>
                        <View style={styles.separator}/>
                        <PetDetail label="性别" value={pet.gender}/>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const PetDetail = ({label, value}) => (
    <View style={styles.petDetailItem}>
        <Text style={styles.petDetailLabel}>{label}</Text>
        <Text style={styles.petDetailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },

    petCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        margin: 6,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 5,
    },
    petCardContent: {
        flexDirection: "column",
        alignItems: 'flex-start',
    },
    intro: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '100%',
        marginRight: 15,
    },
    petInfo: {
        flex: 1,
    },
    petName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    petAge: {
        fontSize: 14,
        color: 'gray',
    },
    petDetailsRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    petDetailItem: {
        alignItems: 'center',
    },
    petDetailLabel: {
        fontSize: 12,
        color: 'gray',
    },
    petDetailValue: {
        fontSize: 12,
        color: 'rgba(27,31,38,0.7)',
        fontWeight: 'bold',
    },
    separator: {
        width: 1,
        height: '60%',
        backgroundColor: '#999999',
        alignSelf: 'center',
        marginHorizontal: 5,
    },

    addPetButton: {
        borderWidth: 2,
        borderColor: '#d0d0d0',
        borderStyle: 'dashed',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addPetIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    addPetText: {
        fontSize: 18,
        color: '#d0d0d0',
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
});
