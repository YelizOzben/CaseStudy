import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Button} from '@react-native-material/core';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detail({
  modalVisible,
  setModalVisible,
  selectedPromotionId,
}) {
  const defaultHeader = {
    'X-Country-Id': 'TR',
    'X-Language-Id': 'TR',
    'Content-Type': 'application/json',
  };

  const [loading, setLoading] = useState(false);
  const [promotion, setPromotion] = useState();

  const getSelectedPromotion = id => {
    setLoading(true);
    axios
      .get(`https://api.extrazone.com/promotions?Id=${id}`, {
        headers: defaultHeader,
      })
      .then(response => {
        if (response.data) {
          setPromotion(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (selectedPromotionId) {
      getSelectedPromotion(selectedPromotionId);
    }
  }, [selectedPromotionId]);

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={{display: 'flex'}}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{position: 'absolute', zIndex: 999, left: 20, top: 40}}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: promotion?.ImageUrl,
              }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Image
              style={styles.brandIcon}
              source={{
                uri: promotion?.BrandIconUrl,
              }}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={{paddingHorizontal: 20, paddingBottom: 50}}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <RenderHtml
                  contentWidth={Dimensions.get('window').width - 50}
                  source={{
                    html: `<div >${promotion?.Title}</div>`,
                  }}
                />
                <RenderHtml
                  contentWidth={Dimensions.get('window').width - 50}
                  source={{
                    html: `<div>${promotion?.Description}</div>`,
                  }}
                />
              </>
            )}
          </ScrollView>
        </View>
      </View>
      <Button title="Hemen Katıl" style={styles.button} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 360,
  },
  brandIcon: {
    position: 'absolute',
    top: -60,
    left: 10,
    width: 55,
    height: 55,
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 120,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#F40000',
    width: Dimensions.get('window').width - 10,
    marginLeft: 5,
    borderRadius: 40,
    position: 'absolute',
    bottom: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
