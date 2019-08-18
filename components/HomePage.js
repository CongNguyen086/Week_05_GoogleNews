import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NewsList from './NewsList';
import MainHeader from './MainHeader';
// import Header from './Header';

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articles: [],
            pageNumber: 1,
            hasError: false,
            lastPageReached: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Latest News';
        let drawerIcon = () => (
            <FontAwesome name="newspaper-o" size={27} color="white" />
        );
        return { drawerLabel, drawerIcon };
      }

    componentDidMount() {
        this.getNews();
    }

    getNews = async () => {
        try {
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6512f785cd944160a9791e2069ce06f8&page=${this.state.pageNumber}`
            );
            const jsonData = await response.json();
            const hasMoreArticles = jsonData.articles.length > 0;
            if (hasMoreArticles) {
                const newArticlesList = this.state.articles.concat(jsonData.articles);
                const UniqueArticlesList = this.filterUniqueArticles(newArticlesList);
                this.setState({
                    articles: UniqueArticlesList,
                    pageNumber: this.state.pageNumber + 1,
                });
            } else {
                this.setState({ lastPageReached: true }, () => { if (this.state.lastPageReached) return; });
            }
        } catch (error) {
            this.setState({ hasError: true }, alert(`Error Occured!`));
        }
        this.setState({ loading: false });
    }

    filterUniqueArticles = arr => {
        const uniqueList = [];
        arr.forEach(element1 => {
            let unique = true;
            uniqueList.forEach(element2 => {
                let isEqual = JSON.stringify(element1) === JSON.stringify(element2);
                if (isEqual) { unique = false }
            });
            if (unique) uniqueList.push(element1);
        });
        return uniqueList;
    }

    onPress = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert(`Cannot find the URL`);
            }
        });
    }

    render() {
        const { articles, loading, hasError, lastPageReached } = this.state;
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' animating={loading} />
                </View>
            );
        } else if (hasError) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' />
                    <Text style={{ fontSize: 20 }}>Please reload the page.</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <MainHeader {...this.props} articles={articles} />
                <NewsList articles={articles}
                    getNews={this.getNews}
                    onPress={this.onPress}
                    lastPageReached={lastPageReached}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});
