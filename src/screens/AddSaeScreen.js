import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addSae, login } from '../api/api';

export default function AddSaeScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titre: '',
    semestre: '',
    annee: '',
    domaine: '',
    ue: '',
    description: '',
    note: '',
    tauxReussite: '',
    lienSite: '',
    lienCode: '',
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.titre || !form.annee || !form.semestre) {
      Alert.alert('Champs manquants', 'Titre, année et semestre sont obligatoires');
      return;
    }
    try {
      setLoading(true);
      await login();
      await addSae({
        ...form,
        note: form.note ? parseFloat(form.note) : null,
        tauxReussite: form.tauxReussite ? parseFloat(form.tauxReussite) : null,
      });
      Alert.alert('✅ Succès', 'SAé ajoutée avec succès !');
      setForm({
        titre: '', semestre: '', annee: '', domaine: '',
        ue: '', description: '', note: '', tauxReussite: '',
        lienSite: '', lienCode: '',
      });
    } catch (e) {
      Alert.alert('Erreur', 'Impossible d\'ajouter la SAé');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'titre', placeholder: 'Titre *', icon: '📝' },
    { key: 'annee', placeholder: 'Année (MMI2 / MMI3) *', icon: '🎓' },
    { key: 'semestre', placeholder: 'Semestre (S3, S4, S5, S6) *', icon: '📅' },
    { key: 'domaine', placeholder: 'Domaine (Web, DI, 3D...)', icon: '🏷️' },
    { key: 'ue', placeholder: 'UE correspondante', icon: '📌' },
    { key: 'note', placeholder: 'Note (/20)', icon: '⭐', keyboard: 'numeric' },
    { key: 'tauxReussite', placeholder: 'Taux de réussite (%)', icon: '📊', keyboard: 'numeric' },
    { key: 'lienSite', placeholder: 'Lien du site', icon: '🌐' },
    { key: 'lienCode', placeholder: 'Lien du code', icon: '💻' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>➕ Ajouter une SAé</Text>
        <Text style={styles.subheader}>Les champs marqués * sont obligatoires</Text>

        {fields.map(({ key, placeholder, icon, keyboard }) => (
          <View key={key} style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>{icon}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#a7a9be"
              value={form[key]}
              onChangeText={(v) => update(key, v)}
              keyboardType={keyboard || 'default'}
            />
          </View>
        ))}

        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📄</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Description"
            placeholderTextColor="#a7a9be"
            value={form.description}
            onChangeText={(v) => update('description', v)}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#0f0e17" />
            : <Text style={styles.btnText}>Ajouter la SAé</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  scroll: { padding: 20 },
  header: { fontSize: 24, fontWeight: '800', color: '#fffffe', marginBottom: 6 },
  subheader: { fontSize: 13, color: '#a7a9be', marginBottom: 24 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    paddingHorizontal: 14,
  },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: {
    flex: 1,
    color: '#fffffe',
    fontSize: 14,
    paddingVertical: 14,
  },
  textarea: { height: 100, textAlignVertical: 'top', paddingTop: 14 },
  btn: {
    backgroundColor: '#ff8906',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  btnText: { color: '#0f0e17', fontSize: 16, fontWeight: '800' },
});