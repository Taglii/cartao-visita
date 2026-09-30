# Cartão de Visita Digital e Perfil Interativo

Uma aplicação mobile desenvolvida com React Native e Expo que simula um cartão de visita e perfil pessoal interativo. O projeto conta com edição de biografia em tempo real via modal e sistema de notificações temporárias (toast).

---

## Funcionalidades

- **Foto e Informações de Perfil:** Exibição estruturada da foto, nome e cargo.
- **Edição de Bio via Modal:** Interface intuitiva para edição e atualização da biografia do utilizador.
- **Notificações Temporárias (Toast):** Sistema com temporizador (useEffect) que envia lembretes dinâmicos na tela ao ativar a opção nas configurações.
- **Layout Responsivo e Acessível:** Adaptado com SafeAreaView e ajustes específicos para iOS, Android e Web.

---

## Tecnologias Utilizadas

- **React Native** (Componentes nativos)
- **Expo** (Framework e ambiente de desenvolvimento)
- **TypeScript / JavaScript**
- **React Native Safe Area Context** (Tratamento de safe areas e notches)

---

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js** instalado na máquina
- Aplicação **Expo Go** no telemóvel (iOS/Android) ou um emulador configurado

### Passo a Passo

1. **Clone o repositório:**
   bash
   git clone [https://github.com/Taglii/cartao-visita.git](https://github.com/Taglii/cartao-visita.git)

2. **Aceda à pasta do projeto:**
   Bash
   cd cartao-visita-digital

3. **Instale as dependências:**
   Bash
   npm install
   
4. **Inicie o servidor do Expo:**
   Bash
   npx expo start

5. **Execute no dispositivo:**
   Abra a aplicação Expo Go e escaneie o código QR exibido no terminal.

## Estrutura de Pastas
   Plaintext
   ├── assets/
   │   └── images/
   │       └── perfil.jpeg      # Foto de perfil do utilizador
   ├── App.js                   # Componente principal da aplicação
   ├── package.json             # Dependências e scripts do projeto
   └── README.md                # Documentação do projeto

---

## Autor
   Desenvolvido por Matheus Tagliatti.

