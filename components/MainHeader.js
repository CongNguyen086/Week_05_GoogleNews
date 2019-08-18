import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

const MenuCustom = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.header}>
        <Ionicons name="md-menu" size={27} color="white" />
    </TouchableOpacity >
);

const TitleCustom = ({ articles }) => (
    <Text style={styles.label}>Latest News ({articles.length})</Text>
);

const MainHeader = ({ navigation, articles }) => {
    return (
        <Header
            placement="left"
            leftComponent={<MenuCustom navigation={navigation} />}
            centerComponent={<TitleCustom articles={articles} />}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 8,
    },
    label: {
        fontSize: 20,
        color: 'white',
        marginRight: 10,
        fontWeight: 'bold',
    },
})

export default MainHeader;