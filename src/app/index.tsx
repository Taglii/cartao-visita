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

// Frases randômicas para simular o recebimento de notificações temporárias
const NOTIFICACOES_MENSAGENS = [
  'Lembrete: Hidrate-se! 💧',
  'Respire fundo e continue. 🌊',
  'Dica: Faça uma pausa breve. ⏱️️',
  'Mantenha uma boa postura! 🧘',
];

export default function App() {
  // --- ESTADOS DA APLICAÇÃO ---
  const [bio, setBio] = useState('');
  const [tempBio, setTempBio] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);

  // --- LÓGICA DE UX: TEMPORIZADOR DE NOTIFICAÇÕES ---
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (receiveNotifications) {
      const triggerNotification = () => {
        const randomIndex = Math.floor(Math.random() * NOTIFICACOES_MENSAGENS.length);
        setCurrentNotification(NOTIFICACOES_MENSAGENS[randomIndex]);
      };

      triggerNotification(); // Exibe imediatamente ao ativar
      timerId = setInterval(triggerNotification, 5000); // Repete a cada 5 segundos
    } else {
      setCurrentNotification(null); // Esconde ao desligar
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [receiveNotifications]);

  // --- LÓGICA DO MODAL ---
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
        <StatusBar barStyle="dark-content" backgroundColor="#f4f5f7" />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* SEÇÃO 1: FOTO & NOME */}
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

          {/* SEÇÃO 2: BIO */}
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

          {/* SEÇÃO 3: CONFIGURAÇÕES */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Configurações</Text>

            {/* SWITCH: RECEBER NOTIFICAÇÕES */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Receber Notificações</Text>
              <Switch
                value={receiveNotifications}
                onValueChange={setReceiveNotifications}
                trackColor={{ false: '#e2e8f0', true: '#93c5fd' }}
                thumbColor={receiveNotifications ? '#2563eb' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* SEÇÃO 4: BOTÃO PRINCIPAL */}
          <Pressable style={styles.primaryButtonFull} onPress={handleSaveMain}>
            <Text style={styles.primaryButtonFullText}>Salvar</Text>
          </Pressable>
        </ScrollView>

        {/* COMPONENTE DE FEEDBACK DE UX: TOAST INFERIOR */}
        {receiveNotifications && currentNotification && (
          <View style={styles.toastBanner}>
            <Text style={styles.toastText}>{currentNotification}</Text>
          </View>
        )}

        {/* COMPONENTE DE INTERAÇÃO DE UX: MODAL DE EDIÇÃO */}
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
                placeholderTextColor="#6b7280"
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

// --- ESTILIZAÇÃO FIXA ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    paddingTop: Platform.OS === 'android' 
      ? (StatusBar.currentHeight || 24) + 12 
      : Platform.OS === 'web' 
      ? 24 
      : 12,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 90,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
  },
  userRole: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  bioBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#111827',
  },
  primaryButtonSmall: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#111827',
  },
  primaryButtonFull: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonFullText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastBanner: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  toastText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    color: '#111827',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 100,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontWeight: '600',
    color: '#374151',
  },
});