import React from 'react';
import { View, Text, FlatList } from 'react-native';
import currencyFormatter from 'currency-formatter';
import { MovieFull } from '../interfaces/movieInterfaces';
import { Cast } from '../interfaces/creditsInterface';
import   Icon   from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return(
      <>
        {/* Detalles */}
        <View style={{ marginHorizontal: 20 }}>
            <Icon
                name='star-outline'
                color='grey'
                size={ 16 }
            />
            <Text>{ movieFull.vote_average }</Text>

            <Text style={{ marginLeft: 5 }}>- { movieFull.genres.map( g =>  g.name ).join(',')}</Text>
        </View>

        {/* historia */}

        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
            Historia
        </Text>

        <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>
            { movieFull.overview }
        </Text>

         {/* historia */}

        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
            Presupuesto
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>{  currencyFormatter.format( movieFull.budget, { code:'USD' }) }</Text>

        {/* Casting */}
        <View style={{ marginTop: 10, marginBottom: 100  }}>
            <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                Actores
            </Text>


            <FlatList
                data={ cast }
                //porque no me pide un num sino string
                keyExtractor={ (item) => item.id.toString() }
                renderItem={ ({ item }) => <CastItem actor={ item } /> }
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
                style={{ marginTop: 10, height: 70 }}
            />
        </View>
      </>
    )
};
