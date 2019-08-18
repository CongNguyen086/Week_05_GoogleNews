import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

const CardNews = ({ articles: { title, url, urlToImage, source, content, publishedAt }, onPress }) => {
    return (
        <Card title={title} image={{ uri: urlToImage }}>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.row}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Source</Text>
                </View>
                <Text style={styles.info}>{source.name}</Text>
            </View>
            <View style={[styles.row, styles.lastRow]}>
                <Text style={styles.label}>Published</Text>
                <Text style={styles.info}>
                    {moment(publishedAt).format('LLL')}
                </Text>
            </View>
            <Button icon={<Icon />}
                title="Read more"
                backgroundColor="#03A9F4"
                onPress={() => onPress(url)}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    lastRow: {
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold',
    },
    labelWrapper: {
        width: 84,
    },
    info: {
        fontSize: 16,
        color: 'grey',
    },
    content: {
        marginVertical: 5,
        textAlign: "justify",
    },
});

export default CardNews;

