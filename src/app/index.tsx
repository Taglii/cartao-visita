import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const NOTIFICACOES_MENSAGENS = [
  'Lembrete: BEBE AGUAAA 💧',
  'Respire fundo e bora pra frente. 🌊',
  'Da um tempo, e continue! ⏰',
  'Arruma a coluna!! 🦴 ',
];

export default function App() {
  const [bio, setBio] = useState('');
  const [tempBio, setTempBio] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | null = null;

    if (receiveNotifications) {
      const triggerNotification = () => {
        const randomIndex = Math.floor(Math.random() * NOTIFICACOES_MENSAGENS.length);
        setCurrentNotification(NOTIFICACOES_MENSAGENS[randomIndex]);
      };

      triggerNotification();
      timerId = setInterval(triggerNotification, 5000);
    } else {
      setCurrentNotification(null);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [receiveNotifications]);

  const handleOpenModal = () => {
    setTempBio(bio);
    setIsModalOpen(true);
  };

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsModalOpen(false);
    Alert.alert('Sucesso', 'Bio atualizada!');
  };

  const handleSaveMain = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#e8e8e2" />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/perfil.jpeg')}
              style={styles.avatar}
            />
            <Text style={styles.userName}>
              Aluno Matheus Tagliatti
            </Text>
            <Text style={styles.userRole}>
              Desenvolvedor & Estudante
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bio</Text>
            <View style={styles.bioBox}>
              <Text style={styles.bioText}>
                {bio || 'Nenhuma biografia definida.'}
              </Text>
            </View>
            <Pressable style={styles.primaryButtonSmall} onPress={handleOpenModal}>
              <Text style={styles.primaryButtonText}>Editar bio</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Configurações</Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Receber Notificações</Text>
              <Switch
                value={receiveNotifications}
                onValueChange={setReceiveNotifications}
                trackColor={{ false: '#93a3af', true: '#93c5fd' }}
                thumbColor={receiveNotifications ? '#1d4ed8' : '#cdcdc3'}
              />
            </View>
          </View>

          <Pressable style={styles.primaryButtonFull} onPress={handleSaveMain}>
            <Text style={styles.primaryButtonFullText}>Salvar</Text>
          </Pressable>
        </ScrollView>

        {receiveNotifications && currentNotification && (
          <View style={styles.toastBanner}>
            <Text style={styles.toastText}>{currentNotification}</Text>
          </View>
        )}

        <Modal
          visible={isModalOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Bio</Text>

              <TextInput
                style={styles.modalInput}
                multiline={true}
                numberOfLines={4}
                value={tempBio}
                onChangeText={setTempBio}
                placeholder="Digite sua biografia..."
                placeholderTextColor="#71717a"
                textAlignVertical="top"
              />

              <View style={styles.modalActions}>
                <Pressable
                  style={styles.secondaryButton}
                  onPress={() => setIsModalOpen(false)}
                >
                  <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={styles.primaryButtonSmall} onPress={handleSaveBio}>
                  <Text style={styles.primaryButtonText}>Salvar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8e8e2',
    paddingTop: Platform.OS === 'android' 
      ? (StatusBar.currentHeight || 24) + 8 
      : Platform.OS === 'web' 
      ? 20 
      : 8,
  },
  scrollContainer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 14,
    borderWidth: 4,
    borderColor: '#dfdfd7',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#18181b',
    letterSpacing: -0.5,
  },
  userRole: {
    fontSize: 14,
    fontWeight: '500',
    color: '#52525b',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: '#dfdfd7',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#d0d0c6',
    elevation: 2,
    shadowColor: '#18181b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
    color: '#27272a',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bioBox: {
    borderWidth: 1,
    borderColor: '#c4c4b8',
    backgroundColor: '#d5d5cb',
    borderRadius: 12,
    padding: 14,
    minHeight: 90,
    marginBottom: 14,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#18181b',
  },
  primaryButtonSmall: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27272a',
  },
  primaryButtonFull: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonFullText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  toastBanner: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#09090b',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  toastText: {
    color: '#fafafa',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 9, 11, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#dfdfd7',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 14,
    color: '#18181b',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#c4c4b8',
    backgroundColor: '#d5d5cb',
    color: '#18181b',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    minHeight: 110,
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: '#d5d5cb',
    borderWidth: 1,
    borderColor: '#b8b8ac',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  secondaryButtonText: {
    fontWeight: '600',
    color: '#3f3f46',
  },
});