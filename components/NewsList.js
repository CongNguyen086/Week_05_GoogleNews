import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import CardNews from './CardNews';

const NewsList = ({ articles, getNews, onPress, lastPageReached }) => {
    const FooterContent = () => {
        if (lastPageReached) {
            return (
                <Text style={styles.footer}>End of News</Text>
            );
        } else return <ActivityIndicator size='large' />
    }

    return (
        <FlatList
            data={articles}
            renderItem={({ item }) => <CardNews articles={item} onPress={onPress} />}
            keyExtractor={item => item.title}
            onEndReached={getNews} 
            onEndReachedThreshold={1}
            ListFooterComponent={<FooterContent />}
        />
    );
}

const styles = StyleSheet.create({
    footer: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 15,
        textAlign: 'center',
    }
});

export default NewsList;
