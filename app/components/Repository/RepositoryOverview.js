import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { graphql } from 'react-apollo';
import trackRepositoryName from '../../graphql/trackRepositoryName';

class RepositoryOverview extends React.Component {
  handleTitlePress = () => {
    const { navigation, handlePress, name } = this.props;
    handlePress(name);
    navigation.navigate('RepositoryDetailScreen', { repositoryName: name });
  };

  render() {
    const { name, description } = this.props;

    return (
      <View style={styles.container}>
        <Button
          title={name}
          iconRight={{ name: 'call-made', color: '#222' }}
          small
          onPress={this.handleTitlePress}
          textStyle={[styles.repoName, styles.fontColor, styles.flexWrap]}
          color="#222"
          backgroundColor="#FFF"
          buttonStyle={styles.button}
          containerViewStyle={styles.buttonContainer}
        />
        <View style={styles.repoDescriptionContainer}>
          <Text style={[styles.fontColor, styles.flexWrap]}>{description}</Text>
        </View>
      </View>
    );
  }
}

export default graphql(trackRepositoryName, {
  props: ({ mutate }) => ({
    handlePress: name => mutate({ variables: { name } }),
  }),
})(RepositoryOverview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  repoName: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    fontSize: 20,
  },
  repoDescriptionContainer: {
    borderTopColor: '#222',
    borderTopWidth: 1,
    paddingTop: 3,
    alignSelf: 'stretch',
  },
  fontColor: {
    color: '#222',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  button: {
    paddingLeft: 0,
    paddingBottom: 3,
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0,
    maxWidth: '100%',
  },
});
