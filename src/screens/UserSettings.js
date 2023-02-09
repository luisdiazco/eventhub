import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { theme, mocks } from '../constants';
import { Button, Block, Text} from '../components';
export default class Browse extends React.Component {
    render(){
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Settings</Text>
                    <Button>
                        <Image source={profile.avatar} style={styles.avatar}/>
                    </Button> 
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>Username</Text>
                                <Text bold>{profile.username}</Text>
                            </Block>
                            <Text medium secondary>
                                Edit
                            </Text>
                        </Block>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>Location</Text>
                                <Text bold>{profile.location}</Text>
                            </Block>
                            <Text medium secondary>
                                Edit
                            </Text>
                        </Block>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>E-mail</Text>
                                <Text bold>{profile.email}</Text>
                            </Block>
                            <Text medium secondary>
                                Edit
                            </Text>
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        );
    }   
  
}
Browse.defaultProps = {
    profile : mocks.profile,
}
const styles = StyleSheet.create({
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
});