import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import RenderHtml from 'react-native-render-html';
export const SLIDER_WIDTH = Dimensions.get('window').width + 10;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const SliderCardItem = ({item, index, setModalVisible}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      key={index}
      onPress={() => setModalVisible(true)}>
      <Image source={{uri: item.imgUrl}} style={styles.image} />
      <Image
        style={styles.brandIcon}
        source={{
          uri: item?.iconUrl,
        }}
      />
      {/* <Text style={styles.header}>{item.title}</Text> */}
      <RenderHtml
        contentWidth={Dimensions.get('window').width - 50}
        source={{
          html: `<div>${item.title}</div>`,
        }}
      />
      {/* <Text style={styles.body}>{item.body}</Text> */}
      {/* <RenderHtml
        contentWidth={Dimensions.get('window').width - 50}
        source={{
          html: `<div>${item.body}</div>`,
        }}
      /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    borderBottomLeftRadius: 120,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  brandIcon: {
    /* position: 'absolute',
    top: -60,
    left: 10, */
    position: 'absolute',
    top: 240,
    left: 10,
    width: 55,
    height: 55,
    zIndex: 999,
  },
});

export default SliderCardItem;
