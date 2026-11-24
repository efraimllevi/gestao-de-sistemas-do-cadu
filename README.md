# Firebase — configuração necessária

O formulário público foi preparado para **enviar solicitações à coleção `orcamentos` do Firestore**. Sem configuração e publicação das regras, **nenhuma solicitação será enviada**.

## Passos no Console Firebase

1. Abra [console.firebase.google.com](https://console.firebase.google.com), crie ou selecione seu projeto.
2. Em **Configurações do projeto → Seus apps**, adicione um **app Web** e copie os valores `apiKey`, `authDomain`, `projectId` e `appId` para `firebase-config.js`. A configuração Web pode ficar no frontend; **não** cole uma chave privada de conta de serviço.
3. Em **Authentication → Sign-in method**, ative o provedor **Anônimo** para identificar cada envio. Autenticação anônima **não** significa login administrativo.
4. Em **Firestore Database**, crie o banco em modo de produção, escolhendo a região adequada. Na aba **Regras**, copie o conteúdo de `firestore.rules` e **publique**.
5. Hospede o projeto por HTTPS (Firebase Hosting, GitHub Pages ou equivalente) e configure os domínios autorizados do Authentication, se necessário.
6. Faça um teste com dados fictícios e confira no Firestore se o documento aparece na coleção `orcamentos`, com `status: "recebido"`.

## Restrições antes do uso real

- O site recebe orçamento e grava dados no Firestore **somente após** a configuração acima.
- O preço exibido é uma **estimativa calculada no navegador, não confiável para cobrança**. Antes de aprovar ou gerar contratos, é necessário recalcular no backend com uma tabela de preços protegida.
- O site não realiza cobrança, comprovação de pagamento nem assinatura eletrônica.
- O painel `admin.html` foi preservado, mas **ainda é um protótipo local sem login**. Não tem acesso aos orçamentos do Firestore. A leitura da coleção foi restrita nas regras a usuários com a custom claim `admin: true`, atribuída apenas via backend autorizado.
- **Não habilite leituras públicas** da coleção: ela contém nomes, contatos e informações do evento.
- Em produção, adote **Firebase App Check**, limites antiabuso e validações em Cloud Functions, consentimento/aviso de privacidade e política de retenção (LGPD). Contas anônimas não são proteção suficiente contra spam.
- Não envie dados pessoais reais de clientes até conferir os controles e termos de privacidade.
- Horas extras e modalidade de pagamento ainda exigem definição comercial.

---

# Gestão de Segurança & Eventos — Interface Premium 0.2

Sistema de orçamentos para serviços de segurança, apoio, limpeza, equipe e estrutura de eventos. O nome comercial definitivo ainda não foi escolhido. Desenvolvido como projeto da **LUMS DIGITAL**.

## Abrir

Abra `index.html` em um navegador ou publique a branch `main` via GitHub Pages. A aplicação roda sem build nem dependências de JavaScript.

## Base comercial: planilha FSE

Referência: arquivo `ORÇAMENTO FSE - 04 A 15-11-2026 - CONSTÂNCIO VIEIRA.xlsx` fornecido pelo cliente (arquivo original não incluído no repositório).

- **34 serviços** importados da aba `Serviços`, incluindo valores base e modalidade de cálculo.
- **Diária**: preço × quantidade × número de dias, com as duas datas inclusas.
- **Consulta diária**: mesma fórmula, mas exige valor manual negociado quando preço cadastrado é zero.
- **Unidade**: preço × quantidade, independentemente de dias.
- **Fixo**: preço × quantidade, independentemente de dias.
- **Público**: material de limpeza completo calculado em R$ 2,00 por participante, mínimo de R$ 250,00. Um valor manual pode substituir essa regra para uma proposta.
- **Preço manual**: substitui o valor base do item na proposta; não altera o catálogo.
- **Nota fiscal**: quando selecionada, acréscimo de 15% sobre a soma dos serviços. A célula de cálculo da aba Montagem usa 15% apesar de o rótulo da aba Orçamento apresentar 13%. Por segurança, a aplicação identifica explicitamente 15% e essa divergência deve ser confirmada pelo responsável antes de uso comercial.
- **Jornada**: planilha informa referência de 8 horas; excedentes a R$ 30,00/hora por profissional. **Não são somados automaticamente** porque o arquivo não traz campos de jornada/hora excedente por item.

## Caso de teste fornecido

Evento CBG — Constâncio Vieira — 04/11/2026 a 15/11/2026.

| Item | Total |
|---|---:|
| Apoio de limpeza, 2 × 5 × R$ 250 | R$ 2.500 |
| Apoio de limpeza, 4 × 7 × R$ 250 | R$ 7.000 |
| Segurança, 2 × 2 × R$ 280 (override) | R$ 1.120 |
| Bombeiro civil, 2 × 5 × R$ 270 | R$ 2.700 |
| Material de limpeza completo (override) | R$ 3.000 |
| Segurança, 2 × 1 × R$ 280 (override) | R$ 560 |
| Segurança, 4 × 5 × R$ 280 (override) | R$ 5.600 |
| **Serviços** | **R$ 22.480** |
| **Nota fiscal 15%** | **R$ 3.372** |
| **Total** | **R$ 25.852** |

O exemplo já aparece na base demonstrativa.

## Funcionalidades prontas nesta versão

- Dashboard moderno e responsivo;
- Catálogo com os 34 serviços e preços da planilha;
- Alteração de valores base no navegador;
- Criação e edição de propostas por evento;
- Períodos independentes por item e contagem inclusiva dos dias;
- Preços negociados por item;
- Cálculo automático do imposto de emissão;
- Listagem, busca, estados comerciais **manuais**;
- Documento comercial imprimível pelo navegador (Salvar como PDF);
- Persistência no `localStorage`.

## Segurança e limitações

**É um protótipo local.** Não introduza dados pessoais reais de clientes e não o use como sistema de produção.

Não existe autenticação, Firebase, proteção de API, controle de acesso, confirmação bancária de pagamento, assinatura eletrônica nem validação por QR Code. O status comercial é editado manualmente, não representa prova de pagamento. A aplicação não emite nota fiscal. O documento gerado é orçamento, não contrato celebrado.

Para produção: Firebase Auth + Firestore com regras rigorosas; backend para precificação autoritativa; modelo de contrato revisado; plataforma de assinatura eletrônica; pagamentos confirmados por webhook verificado; QR Code com token aleatório e consulta segura sem expor dados sensíveis; auditoria, LGPD e backups.

## Próximas entregas

1. Revalidar tabela e regras com o proprietário da empresa (inclusive divergência 13% vs 15%);
2. Cadastro de clientes e login por papel;
3. Sincronização no Firebase com regras de segurança;
4. Modelos de contrato, versionamento e assinatura eletrônica;
5. Integração de pagamento e conciliação;
6. QR Code e impressão de etiquetas com consulta de contrato e pagamento válidos no backend.
