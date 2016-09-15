import React, {Component} from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Settings extends Component {

    state = {
        text: this.props.url,
        history: []
    }

    componentWillMount() {
        this.fetchHistory();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({text: nextProps.url});
    }

    render() {
        return (
            <Modal animationType={"slide"} transparent={false} visible={this.props.isVisible}>
                <View style={{
                    flex: 1,
                    alignItems: 'stretch'
                }}>
                    <View style={{
                        height: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#334'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff'
                        }}>Settings</Text>

                        <View style={{
                            position: "absolute",
                            right: 15,
                            top: 0,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableHighlight onPress={() => {
                                this.props.close()
                            }}>
                                <Text style={{
                                    color: '#fff'
                                }}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            paddingLeft: 12,
                            paddingRight: 8,
                            backgroundColor: '#fff'
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.props.goBack()
                            }}>
                                <Icon name="ios-arrow-round-back" size={30} color="#000"/>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={{
                            height: 40,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            margin: 4,
                            padding: 4,
                            flex: 1
                        }} onSubmitEditing={this.onSubmit.bind(this)} selectTextOnFocus={true} onChangeText={(text) => this.setState({text})} value={this.state.text} keyboardType="web-search" autoCorrect={false} autoCapitalize="none"/>
                        <View style={{
                            justifyContent: 'center',
                            paddingLeft: 8,
                            paddingRight: 12,
                            backgroundColor: '#fff'
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.props.reload()
                            }}>
                                <Icon name="ios-refresh" size={30} color="#000"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        borderTopWidth: 1,
                        borderColor: '#ddd'
                    }}>
                        {this.renderHistory()}
                    </View>
                </View>
            </Modal>
        );
    }

    onSubmit() {
        var url = this.state.text;

        if (url === this.props.url) {
            this.props.reload()
        } else {
            if (!/^[a-zA-Z-_]+:/.test(url)) {
                url = 'http://' + url;
            }
            this.saveHistory(url);
            this.props.load(url);
        }

    }

    renderHistory() {
        return this.state.history.map((item, i) => {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.load(item.url);
                }} key={i}>
                    <View style={{
                        padding: 10
                    }}>
                        <Text>{item.url}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    saveHistory(url) {
        var history = [
            {
                url: url
            }
        ];
        this.setState({history: history});
        AsyncStorage.setItem('history', JSON.stringify(history)).then(() => {
            console.log('History saved');
        }).catch(() => {
            console.log('Can not save history');
        });
    }

    fetchHistory() {
        AsyncStorage.getItem('history').then((json) => {
            if (json !== null) {
                var history = [];
                try {
                    history = JSON.parse(json);
                } catch (e) {}
                this.setState({history: history});
            } else {
                console.log('History empty');
            }
        });
    }
}

module.exports = Settings;
