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
import CircularIcon from '../components/CircularIconButton';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from './Details';
const {width} = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/cartSlice';
import { addItemToFavourites, removeItemFromFavourites } from '../redux/favouritesSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Favourites = () => {
  const favourites = useSelector((state) => state.favouritesSlice.favourites);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddToFavouritesItem = (item, index,isExist) => {
    // const updatedIndexes = [...selectedIndexes];

    if (isExist) {
      // updatedIndexes.splice(updatedIndexes.indexOf(index), 1);
      dispatch(removeItemFromFavourites({ id: item?.id }));
    } else {
      // updatedIndexes.push(index);
      const addItems = {...item, quantity: 1};
      dispatch(addItemToFavourites(addItems));
    }
    // setSelectedIndexes(updatedIndexes);
  };


  const renderItem = ({item,index}) => {
    const isFavouritesExist = favourites?.some(obj => obj.id === item?.id);

    return (
        <View key={item?.id?.toString()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: responsiveHeight(2),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={{
                uri: item?.thumbnail,
              }}
              style={{width: 50, height: 50, marginRight: 10, borderRadius: 25}}
              resizeMode="cover"
            />
            {/* View with Texts */}
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: '#1E222B',
                  ...Fonts?.fontMedium,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: '#1E222B',
                  ...Fonts?.fontRegular,
                }}>
                {item.price}
              </Text>
            </View>
          </View>
      
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: 10
            }}>
                <Pressable onPress={() => handleAddToFavouritesItem(item,index, isFavouritesExist)}>
                <AntDesign name={isFavouritesExist ? "heart" : 'hearto'}  size={30} color={'red'}  />
                </Pressable>
          </View>
        </View>
      )
  };

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 15,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
        <CircularIcon
          onPress={() => navigation.goBack()}
          containerStyles={{padding: responsiveWidth(3)}}
          color="#E7ECF0"
          iconColor="#A9B4BC"
          size={14}
          iconName="left"
        />
        <Text
          style={{
            fontSize: responsiveFontSize(2.5),
            color: '#1E222B',
            ...Fonts?.fontMedium,
            marginLeft: responsiveWidth(7),
          }}>
          favourites ({favourites?.length})
        </Text>
      </View>
      <View style={{}}>
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginTop: responsiveHeight(3)}}
        />
      </View>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
