import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Detail from '../Components/Detail';
import axios from 'axios';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../Components/SliderCardItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPromotionId, setSelectedPromotionId] = useState(33);
  const isCarousel = React.useRef(null);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();
  const [loading, setLoading] = useState(false);
  const [allPromotions, setAllPromotions] = useState([]);
  const [index, setIndex] = React.useState(0);

  const defaultHeader = {
    'X-Country-Id': 'TR',
    'X-Language-Id': 'TR',
    'Content-Type': 'application/json',
  };

  const getAllPromotions = () => {
    setLoading(true);
    axios
      .get('https://api.extrazone.com/promotions/list?Channel=PWA', {
        headers: defaultHeader,
      })
      .then(response => {
        if (response.data) {
          const promotions = [];
          response.data.map(item => {
            const promotion = {
              id: item.Id,
              title: item.Title,
              body: item.BrandPromotionCardParticipationText,
              imgUrl: item.ImageUrl,
              iconUrl: item.BrandIconUrl,
            };
            promotions.push(promotion);
          });
          promotions.push(
            {
              id: '1',
              title: 'Aenean leo',
              body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
              imgUrl: 'https://picsum.photos/id/11/200/300',
              iconUrl: '',
            },
            {
              id: '2',
              title: 'Lorem Ipsum',
              body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
              imgUrl: 'https://picsum.photos/id/12/200/300',
              iconUrl: '',
            },
          );

          if (selectedTag) {
            setAllPromotions(
              promotions.filter(
                promotion => selectedTag?.Name === promotion.title,
              ),
            );
          } else {
            setAllPromotions(promotions);
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  const getTags = () => {
    setLoading(true);
    axios
      .get('https://api.extrazone.com/tags/list', {
        headers: defaultHeader,
      })
      .then(response => {
        if (response.data) {
          let rankedData = [...response.data].sort((a, b) => a.rank - b.rank);
          setTags(rankedData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    getAllPromotions();
  }, [selectedTag]);

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text
              style={{backgroundColor: '#F00000', fontWeight: 900, margin: 1}}>
              D
            </Text>
            <Text
              style={{backgroundColor: '#009239', fontWeight: 900, margin: 1}}>
              A
            </Text>
            <Text
              style={{backgroundColor: '#FF8000', fontWeight: 900, margin: 1}}>
              H
            </Text>
            <Text
              style={{backgroundColor: '#EEDB02', fontWeight: 900, margin: 1}}>
              A
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text
              style={{backgroundColor: '#F00000', fontWeight: 900, margin: 1}}>
              D
            </Text>
            <Text
              style={{backgroundColor: '#009239', fontWeight: 900, margin: 1}}>
              A
            </Text>
            <Text
              style={{backgroundColor: '#FF8000', fontWeight: 900, margin: 1}}>
              H
            </Text>
            <Text
              style={{backgroundColor: '#EEDB02', fontWeight: 900, margin: 1}}>
              A
            </Text>
          </View>
        </View>
        <View>
          <Ionicons
            name="person"
            size={20}
            style={{
              backgroundColor: '#F40000',
              borderRadius: 50,
              color: '#FFF',
              padding: 10,
            }}
          />
        </View>
      </View>
      <ScrollView horizontal={true}>
        {tags?.map(item => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTag(item);
              /* setAllPromotions(
                allPromotions.filter(
                  promotion => selectedTag?.Name === promotion.Title,
                ),
              ); */
            }}
            style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={
                selectedTag?.Id === item.Id ? styles.activeTag : styles.tag
              }
              key={item.Id}>
              <Image
                style={styles.brandIcon}
                source={{
                  uri: item?.IconUrl,
                }}
                resizeMode="contain"
              />
              <Text>{item?.Name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Detail
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedPromotionId={selectedPromotionId}
      />
      <Carousel
        layout="default"
        layoutCardOffset={5}
        keyExtractor={item => item.id}
        ref={isCarousel}
        data={allPromotions}
        extraData={selectedTag?.Id}
        renderItem={({item, index}) => (
          <SliderCardItem
            item={item}
            index={index}
            setModalVisible={setModalVisible}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={allPromotions.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.paginationIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  brandIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  tag: {
    width: 120,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#ECEEEF',
    margin: 5,
    padding: 10,
  },
  activeTag: {
    width: 120,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#F40000',
    margin: 5,
    padding: 10,
  },
  paginationIndex: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
