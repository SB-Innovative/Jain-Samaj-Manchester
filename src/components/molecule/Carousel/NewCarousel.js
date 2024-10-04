import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {CourselItem} from './CarouselItem';

function LibCarousel({sliderData}) {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        style={{marginRight: 20, paddingHorizontal: 10, height: 300}}
        autoPlay={true}
        data={sliderData}
        scrollAnimationDuration={2000}
        onSnapToItem={index => {}}
        renderItem={({index, item}) => <CourselItem item={item} />}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
    </View>
  );
}

export default LibCarousel;
