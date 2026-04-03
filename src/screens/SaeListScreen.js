import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getSaes, getSaesByAnnee } from '../api/api';

export default function SaeListScreen({ navigation, route }) {
  const [saes, setSaes] = useState([]);
  const [loading, setLoading] = useState(true);
  const annee = route.params?.annee;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = annee ? await getSaesByAnnee(annee) : await getSaes();
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setSaes(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('ERREUR API:', e.message);
        setSaes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [annee]);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ff8906" />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saes}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.header}>
            {annee ? `SAé ${annee}` : 'Toutes les SAé'}
            <Text style={styles.count}> ({saes.length})</Text>
          </Text>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SaeDetail', { sae: item })}
          >
            <View style={styles.cardLeft}>
              <View style={styles.indexBadge}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.titre} numberOfLines={2}>{item.titre ?? 'Sans titre'}</Text>
              <View style={styles.tags}>
                {item.domaine && <View style={styles.tag}><Text style={styles.tagText}>{item.domaine}</Text></View>}
                {item.semestre && <View style={styles.tag}><Text style={styles.tagText}>{item.semestre}</Text></View>}
              </View>
            </View>
            {item.note != null && (
              <View style={styles.noteBadge}>
                <Text style={styles.noteText}>{item.note}</Text>
                <Text style={styles.noteSlash}>/20</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.empty}>Aucune SAé pour l'instant</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0e17' },
  loadingText: { color: '#a7a9be', marginTop: 12, fontSize: 14 },
  list: { padding: 16 },
  header: { fontSize: 24, fontWeight: '800', color: '#fffffe', marginBottom: 16 },
  count: { fontSize: 18, fontWeight: '400', color: '#a7a9be' },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  cardLeft: { marginRight: 12 },
  indexBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2d3561',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: { color: '#fffffe', fontWeight: '700', fontSize: 13 },
  cardBody: { flex: 1 },
  titre: { fontSize: 14, fontWeight: '600', color: '#fffffe', marginBottom: 6 },
  tags: { flexDirection: 'row', gap: 6 },
  tag: { backgroundColor: '#2d3561', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagText: { color: '#a7a9be', fontSize: 11 },
  noteBadge: { alignItems: 'center', marginLeft: 8 },
  noteText: { fontSize: 20, fontWeight: '800', color: '#ff8906' },
  noteSlash: { fontSize: 10, color: '#a7a9be' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { color: '#a7a9be', fontSize: 16 },
});