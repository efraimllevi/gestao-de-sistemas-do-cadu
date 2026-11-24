# Sistema de Gestão de Segurança e Eventos — MVP 0.1

Protótipo funcional da primeira etapa do projeto do Cadu, produzido pela LUMS DIGITAL.

## Como executar

Abra `index.html` em um navegador moderno (Chrome, Edge, Firefox ou Safari). Não é preciso instalar dependências.

## Funcionalidades disponíveis

- Painel com indicadores e orçamentos recentes.
- Cadastro e edição de serviços e preços por profissional/hora.
- Calculadora de orçamentos por quantidade de profissionais e horas.
- Cadastro e acompanhamento de propostas.
- Impressão de propostas em PDF pela opção **Imprimir > Salvar como PDF**.
- Geração de **minuta demonstrativa** de contrato para impressão.
- Controle **manual** de andamento e situação de pagamento.
- Layout responsivo para computador e celular.
- Persistência local no navegador via `localStorage`.

## Limitações importantes

Este protótipo não deve ser usado em produção com dados reais de clientes: não há autenticação, backend, controle de acesso entre usuários ou sincronização entre dispositivos. O status de pagamento é apenas manual e não atesta recebimento; os contratos são minutas e não há assinatura eletrônica. O QR Code de validação ainda **não está implementado**, pois exige um servidor que valide tokens e consulte dados confiáveis. Os valores de serviços pré-configurados são exemplos e devem ser ajustados à operação do cliente.

## Próximas etapas

1. Definição das entidades e regras comerciais (clientes, eventos, serviços, propostas, contratos, pagamentos e etiquetas).
2. Firebase Authentication, Firestore e regras de segurança; segregação de acesso administrativo e público.
3. Geração de contratos a partir de modelo revisado por profissional jurídico e integração com provedor de assinatura eletrônica.
4. Integração de pagamento via provedor compatível com confirmação por webhook autenticado.
5. Token aleatório para cada contrato/etiqueta, QR Code com link de consulta e validação no servidor sem divulgação excessiva de dados pessoais.
6. Histórico de auditoria e backups.

## Observação

A implementação final depende da confirmação do fluxo das etiquetas: crachá do funcionário ou identificação do contrato/cliente.
