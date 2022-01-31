import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';

import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();

  const { top } = useSafeAreaInsets();

  const { setMainColors } = useContext( GradientContext );

  const getPosterColors = async( index: number ) => {
    const movie =  nowPlaying[index];

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary='green', secondary='orange'] = await getImageColors( uri );

    setMainColors({primary , secondary})
  }

  useEffect(() => {
    if(nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if ( isLoading ) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignContent:'center'}}>
        <ActivityIndicator color='orange' size={80} />
      </View>
    )
  }

  return(
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
            <View style={{ height: 440 }}>
              <Carousel
                data={ nowPlaying }
                renderItem={ ({ item }: any)=> <MoviePoster movie={ item } /> }
                sliderWidth={ windowWidth }
                itemWidth={ 300 }
                //super importante esta propiedad para quitar los marcos transparentes a los contenedores
                inactiveSlideOpacity={0.9}
                onSnapToItem={  index => getPosterColors( index ) }
              />
            </View>

            {/* peliculas categorias */}
            {/* signo de exclamacion para decirle a typeScript que estoy  seguro de lo que estoy mandando */}
            <HorizontalSlider title='Popular' movies={ popular } />
            <HorizontalSlider title='TopRated' movies={ topRated } />
            <HorizontalSlider title='Upcoming' movies={ upcoming } />

        </View>
      </ScrollView>
    </GradientBackground>
  )
};