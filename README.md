# E-commerce App

## Descrição do Projeto

Este é um projeto para criar um aplicativo de comércio eletrônico de móveis usando **React Native**. O aplicativo inclui um backend Node.js utilizando do **Express**, um servidor separado para **Stripe** e uma interface de usuário React Native. O projeto abrange as seguintes funcionalidades:

### Funcionalidades do Aplicativo

1. **Registro por e-mail**: Os usuários podem se registrar usando seu endereço de e-mail.

2. **Login por e-mail**: Os usuários podem fazer login usando seu endereço de e-mail.

3. **Visualização de Produtos**: Os usuários podem visualizar os últimos produtos disponíveis.

4. **Camada de Proteção para Usuários Não Logados**: As funcionalidades do aplicativo são protegidas para usuários não logados.

5. **Armazenamento de Dados com AsyncStorage**: Os dados do aplicativo são armazenados localmente usando AsyncStorage.

6. **Adição e Remoção de Favoritos**: Os usuários podem adicionar e remover produtos dos favoritos.

7. **Adição e Remoção de Produtos no Carrinho**: Os usuários podem adicionar e remover produtos do carrinho de compras.

8. **Visualização do Carrinho**: Os usuários podem visualizar o conteúdo do carrinho de compras.

9. **Visualização de Pedidos e Status de Entrega**: Os usuários podem visualizar seus pedidos e o status de entrega.

10. **Pagamento com Stripe**: Os usuários podem fazer pagamentos usando Stripe.

11. **Pesquisa**: Os usuários podem pesquisar produtos.

12. **Logout**: Os usuários podem fazer logout de suas contas.

13. **Limpeza de Dados em Cache**: Os dados em cache podem ser limpos.

### Frontend

O aplicativo móvel foi desenvolvido usando React Native, um popular framework para construir aplicativos multiplataforma. O processo de design focou na incorporação dos seguintes componentes-chave: `Text`, `TouchableOpacity`, `TextInput`, `StyleSheet`, `Image`, `ActivityIndicator`, `View`, `SafeAreaView`, `ScrollView`, `FlatList` e `Alert`.

Para garantir a limpeza e organização do código, os estilos foram extraídos para um arquivo separado e importados nos componentes relevantes onde são utilizados. Essa abordagem promove a modularidade e a facilidade de manutenção do código.

### Gerenciamento de Estado

Nos componentes React, existem dois tipos de dados que governam seu comportamento: props, state. As props são definidas pelo componente pai e permanecem fixas durante a vida útil do componente. Por outro lado, o state é usado para dados que podem mudar ao longo do tempo. No caso de um campo de texto, por exemplo, o state é modificado cada vez que um usuário digita algo no campo, usando `setState` para armazenar o conteúdo do TextInput.

Como boa prática, o estado é inicializado no construtor de um componente. Quando você deseja modificar o estado, usa o método `setState` fornecido pelo React. Além disso, foi utilizado o `context API` para gerenciar a quantidade de itens que existe no carrinho para que, sempre que atualizar, o contador altera seu valor.

### Backend

Para o desenvolvimento do backend deste aplicativo, optei por usar Node.js com o framework Express. Utilizei os seguintes pacotes para melhorar a funcionalidade: jsonwebtoken, nodemon, express, mongoose, cryptojs e dotenv.

No desenvolvimento deste projeto, ganhei proficiência em:

1. **Node Mongo (CRUD)**: Executar operações de Criar, Ler, Atualizar e Excluir em um banco de dados MongoDB usando Node.js e mongoose.

2. **Obter token de acesso com JWT**: Gerar e validar JWTs para autenticação e autorização do usuário em sua aplicação Node.js.

3. **API RESTful do Node.js**: Construir APIs RESTful usando Node.js e Express, lidar com solicitações HTTP, implementar operações CRUD e fornecer respostas JSON.

### Stripe

A aplicação conta com o Stripe integrado para garantir uma experiência de pagamento segura e confiável para os usuários. O Stripe é uma plataforma de pagamentos online amplamente utilizada, conhecida por sua segurança e simplicidade de integração. Abaixo, detalho as funcionalidades e a importância do Stripe em nossa aplicação de comércio eletrônico:

#### Funcionalidades do Stripe

1. **Processamento de Pagamentos Seguros**: O Stripe processa pagamentos de forma segura, protegendo as informações financeiras dos usuários durante as transações.

2. **Integração com Diversos Métodos de Pagamento**: O Stripe permite a integração com várias formas de pagamento, incluindo cartões de crédito e débito, carteiras digitais e até mesmo pagamentos via criptomoedas.

3. **Gestão de Subscrições e Planos**: Podemos criar planos de assinatura e gerenciar subscrições dos usuários, facilitando a venda de produtos ou serviços recorrentes.

4. **Geração de Faturas Automáticas**: O Stripe gera automaticamente faturas para os clientes, proporcionando uma experiência livre de preocupações tanto para os usuários quanto para os comerciantes.

5. **Detecção de Fraudes**: Utilizando poderosos algoritmos, o Stripe ajuda a detectar atividades fraudulentas, garantindo transações seguras e protegendo tanto os usuários quanto os vendedores.

6. **Reembolsos Simples**: Os reembolsos podem ser processados facilmente pelo Stripe, oferecendo uma política de devolução tranquila para os clientes.

## Importância do Stripe

1. **Segurança dos Dados**: O Stripe é conhecido por sua conformidade com padrões de segurança rigorosos. Ao utilizar o Stripe, garantimos que os dados financeiros dos usuários estejam protegidos contra acessos não autorizados.

2. **Confiabilidade nas Transações**: A reputação do Stripe pela confiabilidade nas transações é inestimável. Os usuários confiam em plataformas que utilizam Stripe, resultando em maior confiança do cliente na nossa aplicação.

3. **Experiência do Usuário Aprimorada**: Com pagamentos rápidos e seguros, oferecemos uma experiência de usuário aprimorada. Isso se traduz em satisfação do cliente e fidelização.

4. **Facilidade de Integração**: O Stripe oferece uma documentação detalhada e uma API intuitiva que facilitam a integração do servidor de pagamento com a nossa aplicação, economizando tempo e recursos de desenvolvimento.

5. **Suporte Global**: Com suporte a várias moedas e métodos de pagamento, o Stripe nos permite alcançar uma audiência global, expandindo nosso alcance para além das fronteiras geográficas.

6. **Análises Detalhadas**: O Stripe fornece análises detalhadas das transações, permitindo-nos entender melhor o comportamento do cliente, otimizar preços e melhorar nossas estratégias de vendas.

Ao integrar o Stripe na aplicação, garantimos um ambiente de pagamento seguro, fácil de usar e confiável para os usuários, contribuindo significativamente para o sucesso do nosso negócio de comércio eletrônico.

## Como Executar o Projeto

### Backend

1. Abra o terminal e execute `npm install`.

2. Crie um arquivo `.env` na pasta `backend` com as seguintes chaves e seus respectivos valores:

```env
MONGO_URL=seu_valor_aqui
PORT=seu_valor_aqui
SECRET=seu_valor_aqui
JWT_SECRET=seu_valor_aqui
STRIPE_SECRET_KEY=seu_valor_aqui
STRIPE_WEBHOOK_SECRET=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

3. Execute `npm start` para iniciar o servidor.

### Frontend

1. Abra o terminal e execute `npm install`.

2. Crie um arquivo `.env` na pasta `frontend` com as seguintes chaves e seus respectivos valores:

```env
API_URL=seu_valor_aqui
STRIPE_PUBLIC_KEY=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

3. Execute `npm start`.

4. Para executar o aplicativo no iOS, pressione 'i'. Para executar no Android, pressione 'a'.
