import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import colors from '../config/Theme/theme';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Fonts from '../config/Theme/fonts';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {addItem} from '../redux/cartSlice';
const {width} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import {SliderBox} from 'react-native-image-slider-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  addItemToFavourites,
  removeItemFromFavourites,
} from '../redux/favouritesSlice';

const images = [
  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
];

const Carousel = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderPagination = () => (
    <View style={styles.pagination}>
      {data.map((_, index) => (
        <Text
          key={index}
          style={[
            styles.paginationDot,
            index === activeIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleMomentumScrollEnd}
        scrollEventThrottle={16}>
        {data.map((item, index) => (
          // <View key={index} style={styles.slide}>
          <Image
            source={{uri: item.image}}
            style={{
              width: responsiveWidth(80), // Set the width to the full screen width
              height: responsiveHeight(20),
              //   borderRadius: 8,
              //   tintColor: 'gray',
              //   alignSelf: 'center',
              //   marginHorizontal: 10
            }}
            resizeMode="contain"
          />
          // </View>
        ))}
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const data = [
  {
    text: 'Slide 1',
    image: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  },
  {
    text: 'Slide 2',
    image: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
  },
  {
    text: 'Slide 3',
    image: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
  },
  // Add more slides as needed
];

export const CustomButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const Details = ({navigation, route}) => {
  const {item} = route?.params;
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favouritesSlice.favourites);

  const handleOutlineButtonPress = item => {
    const addItems = {...item, quantity: 1};
    dispatch(addItem(addItems));
    navigation?.navigate('Cart2');
    console.log('Outline Button Pressed');
  };

  const handlePrimaryButtonPress = () => {
    console.log('Primary Button Pressed');
  };

  const isFavouritesExist = favourites?.some(obj => obj.id === item?.id);

  const handleAddToFavouritesItem = (item, isExist) => {
    // const updatedIndexes = [...selectedIndexes];

    if (isExist) {
      // updatedIndexes.splice(updatedIndexes.indexOf(index), 1);
      dispatch(removeItemFromFavourites({id: item?.id}));
    } else {
      // updatedIndexes.push(index);
      const addItems = {...item, quantity: 1};
      dispatch(addItemToFavourites(addItems));
    }
    // setSelectedIndexes(updatedIndexes);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background}}>
      <Header text="Hey, Rahul" leftIcon={true} rightIconColor={'black'} />
      <View style={{paddingHorizontal: 15, marginTop: responsiveHeight(4)}}>
        <Text
          style={{
            fontSize: responsiveFontSize(7),
            color: colors.black,
            ...Fonts?.fontSemiBold,
          }}>
          Thin Choise Top Orange
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: responsiveHeight(2),
          }}>
          <Rating count={5} defaultRating={5} imageSize={20} />
          <Text
            style={{
              fontSize: responsiveFontSize(1.7),
              color: colors.lightGray,
              ...Fonts?.fontSemiBold,
            }}>
            117 Reviews
          </Text>
        </View>
        <View style={{}}>
          <SliderBox
            images={item?.images}
            ImageComponentStyle={{marginVertical: responsiveHeight(1)}}
            dotColor="orange"
            inactiveDotColor="gray"
            circleLoop={true}
            dotStyle={{height: 5, width: 15, borderRadius: responsiveWidth(5), marginBottom: responsiveHeight(2.50),}}
            paginationBoxStyle={{alignSelf: 'flex-start'}}
            imageLoadingColor="black"
          />
          <View
            style={{
              width: responsiveWidth(15), // Adjust the size as needed
              height: responsiveWidth(15), // Adjust the size as needed
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: responsiveWidth(3),
              position: 'absolute',
              right: responsiveWidth(1),
              top: responsiveHeight(3),
            }}>
            <Pressable
              onPress={() =>
                handleAddToFavouritesItem(item, isFavouritesExist)
              }>
              <AntDesign
                name={isFavouritesExist ? 'heart' : 'hearto'}
                size={30}
                color={'black'}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: responsiveHeight(3),
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              color: colors.blue,
              ...Fonts?.fontBold,
            }}>
            $34.70/KG
          </Text>
          <View
            style={{
              padding: responsiveWidth(1.5),
              marginLeft: 10,
              paddingHorizontal: responsiveWidth(6),
              backgroundColor: colors.purple,
              borderRadius: responsiveWidth(7),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.6),
                color: colors.background,
                ...Fonts?.fontLight,
              }}>
              $22.04 OFF
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: responsiveHeight(2.6),
            // justifyContent: 'space-between',
          }}>
          <CustomButton
            title="Add To Cart"
            onPress={() => handleOutlineButtonPress(item)}
            buttonStyle={{
              borderWidth: 1,
              borderColor: colors.blue,
              borderRadius: responsiveWidth(5),
              padding: responsiveWidth(5),
              paddingHorizontal: responsiveWidth(9),
              marginRight: 'auto',
            }}
            textStyle={{
              fontSize: responsiveFontSize(2),
              ...Fonts?.fontSemiBold,
              textAlign: 'center',
              color: colors.blue,
            }}
          />

          <CustomButton
            title="Buy Now"
            onPress={handlePrimaryButtonPress}
            buttonStyle={{
              backgroundColor: colors.blue,
              borderRadius: responsiveWidth(5),
              padding: responsiveWidth(5),
              paddingHorizontal: responsiveWidth(14),
            }}
            textStyle={{
              fontSize: responsiveFontSize(2),
              ...Fonts?.fontSemiBold,
              textAlign: 'center',
              color: 'white',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: responsiveFontSize(2.4),
            color: colors.black,
            ...Fonts?.fontRegular,
            marginVertical: responsiveHeight(2),
          }}>
          Details
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2.2),
            color: '#8891A5',
            ...Fonts?.fontMedium,
            paddingBottom: 10,
          }}>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Nullam quis risus eget urna mollis ornare vel eu leo.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    // height: responsiveHeight(29),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  slideText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});
