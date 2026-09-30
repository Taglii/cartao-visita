# Cartão de Visita Digital e Perfil Interativo

Uma aplicação mobile desenvolvida com React Native e Expo que simula um cartão de visita e perfil pessoal interativo.

O projeto conta com edição de biografia em tempo real através de um modal e um sistema de notificações temporárias (Toast) para exibição de lembretes ao usuário.

---

## Funcionalidades

* **Foto e Informações de Perfil**

  * Exibição da foto de perfil.
  * Nome e cargo do usuário.
  * Layout organizado e intuitivo.

* **Edição de Bio via Modal**

  * Permite editar a biografia do usuário.
  * Atualização da bio em tempo real.
  * Interface simples e intuitiva.

* **Notificações Temporárias (Toast)**

  * Exibição de mensagens temporárias na tela.
  * Utilização de `useEffect` e temporizadores.
  * Lembretes dinâmicos ativados através das configurações.

* **Layout Responsivo e Acessível**

  * Compatível com diferentes tamanhos de tela.
  * Utilização de `SafeAreaView`.
  * Ajustes para iOS, Android e Web.

---

## Tecnologias Utilizadas

* **React Native** — Desenvolvimento da interface mobile.
* **Expo** — Framework e ambiente de desenvolvimento.
* **JavaScript / TypeScript** — Linguagem utilizada no projeto.
* **React Native Safe Area Context** — Tratamento de Safe Areas e áreas seguras dos dispositivos.

---

## Como Rodar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/)
* [Expo Go](https://expo.dev/go) no celular Android ou iOS.

Também é possível utilizar um emulador Android/iOS ou executar a aplicação na Web.

### 1. Clone o repositório

```bash
git clone https://github.com/Taglii/cartao-visita.git
```

### 2. Acesse a pasta do projeto

```bash
cd cartao-visita
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor do Expo

```bash
npx expo start
```

### 5. Execute no dispositivo

Após iniciar o Expo:

1. Abra o aplicativo Expo Go no celular.
2. Certifique-se de que o computador e o celular estejam conectados à mesma rede Wi-Fi.
3. Escaneie o QR Code exibido pelo Expo.
4. Aguarde o carregamento da aplicação.

---

## Estrutura de Pastas

```text
cartao-visita/
│
├── assets/
│   └── images/
│       └── perfil.jpeg
│
├── App.js
├── package.json
├── README.md
└── ...
```

### Principais arquivos

| Arquivo                     | Descrição                               |
| --------------------------- | --------------------------------------- |
| `App.js`                    | Componente principal da aplicação       |
| `package.json`              | Dependências e configurações do projeto |
| `assets/images/perfil.jpeg` | Foto utilizada no perfil                |
| `README.md`                 | Documentação do projeto                 |

---

## Conceitos Utilizados

Durante o desenvolvimento foram utilizados conceitos importantes do React Native, como:

* Componentização;
* `useState`;
* `useEffect`;
* Modal;
* Gerenciamento de estado;
* Eventos de interação;
* Temporizadores;
* Safe Area;
* Layout responsivo;
* Componentes nativos do React Native.

---

## Autor

Desenvolvido por **Matheus Tagliatti**.

