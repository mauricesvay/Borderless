import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    WebView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsView from './components/Settings';

var homepage = 'about:blank';

class Borderless extends Component {

    state = {
        url: homepage,
        currentUrl: homepage,
        isModalVisible: false
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <SettingsView isVisible={this.state.isModalVisible} url={this.state.currentUrl} load={this.load.bind(this)} goBack={this.goBack.bind(this)} reload={this.reload.bind(this)} close={this.closeModal.bind(this)}></SettingsView>
                <WebView style={styles.webview} ref="MAIN_WEBVIEW" source={{
                    uri: this.state.url
                }} onNavigationStateChange={this.onNavigationStateChange.bind(this)} onError={this.onError.bind(this)}></WebView>
                <View style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    bottom: 5,
                    right: 5
                }}>
                    <TouchableOpacity onPress={this.onSettingsButtonClicked.bind(this)} style={{}}>
                        <View style={{
                            width: 20,
                            height: 20,
                            backgroundColor: '#333344CC',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name="ios-cog" size={14} color="#fff"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onNavigationStateChange(navState) {
        this.setState({currentUrl: navState.url});
    }

    onError(event) {
        console.log('onError');
        console.log(event);
    }

    reload() {
        if (this.state.url.indexOf('about:blank') !== 0) {
            this.refs['MAIN_WEBVIEW'].reload();
        }
        this.closeModal();
    }

    goBack() {
        this.refs['MAIN_WEBVIEW'].goBack();
        this.closeModal();
    }

    load(url) {
        this.setState({url: url, isModalVisible: false});
    }

    onSettingsButtonClicked() {
        this.setState({isModalVisible: true});
    }

    closeModal() {
        this.setState({isModalVisible: false});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    webview: {}
});

AppRegistry.registerComponent('Borderless', () => Borderless);
