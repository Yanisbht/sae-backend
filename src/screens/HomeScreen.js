import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>BUT MMI — Meaux</Text>
        <Text style={styles.title}>Banque des SAé</Text>
        <Text style={styles.desc}>Consultez et ajoutez les réalisations des étudiants MMI</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          onPress={() => navigation.navigate('SAé', { screen: 'SaeList', params: { annee: 'MMI2' } })}
        >
          <Text style={styles.cardIcon}>📘</Text>
          <Text style={styles.cardTitle}>MMI 2</Text>
          <Text style={styles.cardSub}>SAé de 2ème année</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardPurple]}
          onPress={() => navigation.navigate('SAé', { screen: 'SaeList', params: { annee: 'MMI3' } })}
        >
          <Text style={styles.cardIcon}>📗</Text>
          <Text style={styles.cardTitle}>MMI 3</Text>
          <Text style={styles.cardSub}>SAé de 3ème année</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardOrange, styles.cardFull]}
          onPress={() => navigation.navigate('SAé', { screen: 'SaeList' })}
        >
          <Text style={styles.cardIcon}>📚</Text>
          <Text style={styles.cardTitle}>Toutes les SAé</Text>
          <Text style={styles.cardSub}>MMI2 + MMI3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardGold, styles.cardFull]}
          onPress={() => navigation.navigate('Classement')}
        >
          <Text style={styles.cardIcon}>🏆</Text>
          <Text style={styles.cardTitle}>Classement</Text>
          <Text style={styles.cardSub}>Les meilleures notes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  header: { padding: 28, paddingTop: 40 },
  subtitle: { fontSize: 13, color: '#a7a9be', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 34, fontWeight: '800', color: '#fffffe', marginTop: 6 },
  desc: { fontSize: 14, color: '#a7a9be', marginTop: 8, lineHeight: 22 },
  grid: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    borderRadius: 20,
    padding: 20,
    minHeight: 130,
    justifyContent: 'flex-end',
  },
  cardFull: { width: '100%', minHeight: 80, flexDirection: 'row', alignItems: 'center', gap: 16 },
  cardBlue: { backgroundColor: '#2d3561' },
  cardPurple: { backgroundColor: '#3d2361' },
  cardOrange: { backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#ff8906' },
  cardGold: { backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#f9bc60' },
  cardIcon: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fffffe' },
  cardSub: { fontSize: 12, color: '#a7a9be', marginTop: 2 },
});