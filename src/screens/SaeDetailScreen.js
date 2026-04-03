import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SaeDetailScreen({ route }) {
  const { sae } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.hero}>
          <View style={styles.tags}>
            {sae.annee && <View style={styles.tag}><Text style={styles.tagText}>{sae.annee}</Text></View>}
            {sae.semestre && <View style={styles.tag}><Text style={styles.tagText}>{sae.semestre}</Text></View>}
            {sae.domaine && <View style={[styles.tag, styles.tagOrange]}><Text style={styles.tagText}>{sae.domaine}</Text></View>}
            {sae.ue && <View style={[styles.tag, styles.tagGreen]}><Text style={styles.tagText}>{sae.ue}</Text></View>}
          </View>
          <Text style={styles.titre}>{sae.titre}</Text>
          {sae.description && <Text style={styles.description}>{sae.description}</Text>}
        </View>

        {(sae.dateDebut || sae.dateFin) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Période</Text>
            <View style={styles.statsRow}>
              {sae.dateDebut && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{sae.dateDebut}</Text>
                  <Text style={styles.statLabel}>Début</Text>
                </View>
              )}
              {sae.dateFin && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{sae.dateFin}</Text>
                  <Text style={styles.statLabel}>Fin</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {(sae.note != null || sae.tauxReussite != null || sae.ue) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Résultats</Text>
            <View style={styles.statsRow}>
              {sae.note != null && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{sae.note}</Text>
                  <Text style={styles.statLabel}>Note /20</Text>
                </View>
              )}
              {sae.tauxReussite != null && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{sae.tauxReussite}%</Text>
                  <Text style={styles.statLabel}>Réussite</Text>
                </View>
              )}
              {sae.ue && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{sae.ue}</Text>
                  <Text style={styles.statLabel}>UE</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {sae.competences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Compétences</Text>
            {sae.competences.map((c, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.dot} />
                <Text style={styles.listText}>{c}</Text>
              </View>
            ))}
          </View>
        )}

        {sae.groupe && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👥 Ressources humaines</Text>
            <Text style={styles.groupNom}>{sae.groupe.nom}</Text>
            {sae.groupe.membres?.map((m, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.dot} />
                <Text style={styles.listText}>{m}</Text>
              </View>
            ))}
          </View>
        )}

        {(sae.lienSite || sae.lienCode) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔗 Liens</Text>
            {sae.lienSite && (
              <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(sae.lienSite)}>
                <Text style={styles.linkBtnText}>🌐 Voir le site</Text>
              </TouchableOpacity>
            )}
            {sae.lienCode && (
              <TouchableOpacity style={[styles.linkBtn, styles.linkBtnSecondary]} onPress={() => Linking.openURL(sae.lienCode)}>
                <Text style={styles.linkBtnText}>💻 Voir le code</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  scroll: { padding: 20 },
  hero: { marginBottom: 20 },
  tags: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  tag: { backgroundColor: '#2d3561', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagOrange: { backgroundColor: '#3a1f00', borderWidth: 1, borderColor: '#ff8906' },
  tagGreen: { backgroundColor: '#0a2e1a', borderWidth: 1, borderColor: '#2cb67d' },
  tagText: { color: '#a7a9be', fontSize: 12, fontWeight: '600' },
  titre: { fontSize: 26, fontWeight: '800', color: '#fffffe', marginBottom: 10, lineHeight: 34 },
  description: { fontSize: 14, color: '#a7a9be', lineHeight: 22 },
  section: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#fffffe', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: '#0f0e17',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '800', color: '#ff8906' },
  statLabel: { fontSize: 11, color: '#a7a9be', marginTop: 4 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ff8906', marginRight: 10 },
  listText: { fontSize: 14, color: '#a7a9be', flex: 1 },
  groupNom: { fontSize: 15, fontWeight: '700', color: '#fffffe', marginBottom: 8 },
  linkBtn: {
    backgroundColor: '#ff8906',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  linkBtnSecondary: { backgroundColor: '#2d3561' },
  linkBtnText: { color: '#fffffe', fontWeight: '700', fontSize: 14 },
});