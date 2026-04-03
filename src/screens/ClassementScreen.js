import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getClassement } from '../api/api';

export default function ClassementScreen() {
  const [saes, setSaes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getClassement();
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
  }, []);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#f9bc60" />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  );

  const medals = ['🥇', '🥈', '🥉'];
  const topColors = ['#f9bc60', '#a7a9be', '#cd7f32'];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saes}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.header}>🏆 Classement</Text>
        }
        renderItem={({ item, index }) => (
          <View style={[styles.card, index < 3 && { borderColor: topColors[index] }]}>
            <Text style={styles.rank}>
              {index < 3 ? medals[index] : `#${index + 1}`}
            </Text>
            <View style={styles.info}>
              <Text style={styles.titre} numberOfLines={1}>{item.titre ?? 'Sans titre'}</Text>
              <View style={styles.tags}>
                {item.annee && <View style={styles.tag}><Text style={styles.tagText}>{item.annee}</Text></View>}
                {item.domaine && <View style={styles.tag}><Text style={styles.tagText}>{item.domaine}</Text></View>}
              </View>
            </View>
            <View style={styles.noteBadge}>
              <Text style={[styles.note, index < 3 && { color: topColors[index] }]}>
                {item.note ?? '—'}
              </Text>
              <Text style={styles.noteSlash}>/20</Text>
            </View>
          </View>
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
  rank: { fontSize: 24, marginRight: 12, width: 40, textAlign: 'center' },
  info: { flex: 1 },
  titre: { fontSize: 14, fontWeight: '600', color: '#fffffe', marginBottom: 6 },
  tags: { flexDirection: 'row', gap: 6 },
  tag: { backgroundColor: '#2d3561', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagText: { color: '#a7a9be', fontSize: 11 },
  noteBadge: { alignItems: 'center', marginLeft: 8 },
  note: { fontSize: 20, fontWeight: '800', color: '#ff8906' },
  noteSlash: { fontSize: 10, color: '#a7a9be' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { color: '#a7a9be', fontSize: 16 },
});