# 🚀 Guia Completo de Integração Mercado Pago - Shape365

## ✅ O que já foi implementado:

1. **Webhook endpoint** criado em `/api/webhook/mercadopago`
2. **Sistema de verificação de assinatura** em `/api/subscription/check`
3. **Tela de planos** atualizada com redirecionamento para Mercado Pago
4. **Estrutura de banco de dados** preparada para gerenciar assinaturas

---

## 📋 Dados que você precisa fornecer:

### 1. Access Token do Mercado Pago
- **Onde encontrar:** 
  - Acesse: https://www.mercadopago.com.br/developers/panel
  - Vá em: **Suas integrações** → **Credenciais**
  - Copie o **Access Token** (começa com `APP_USR-` ou `TEST-` para testes)

### 2. Links de Pagamento (os 3 que você já criou)
- Link do plano **Mensal** (R$ 39,90/mês)
- Link do plano **Semestral** (R$ 179,40 a cada 6 meses)
- Link do plano **Anual** (R$ 238,80/ano)

---

## 🔧 Configuração Passo a Passo:

### PASSO 1: Adicionar variáveis de ambiente

Adicione estas variáveis no arquivo `.env.local`:

```env
# Mercado Pago - Access Token
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui

# Links de Pagamento
NEXT_PUBLIC_MERCADOPAGO_LINK_MONTHLY=https://link-do-plano-mensal
NEXT_PUBLIC_MERCADOPAGO_LINK_SEMESTER=https://link-do-plano-semestral
NEXT_PUBLIC_MERCADOPAGO_LINK_ANNUAL=https://link-do-plano-anual
```

### PASSO 2: Criar tabela no Supabase

Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Criar tabela de assinaturas
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  payment_id TEXT,
  mercadopago_payment_id TEXT,
  amount DECIMAL(10, 2),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email ON subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at ON subscriptions(expires_at);
```

### PASSO 3: Configurar Webhook no Mercado Pago

1. **Acesse o painel do Mercado Pago:**
   - https://www.mercadopago.com.br/developers/panel

2. **Vá em: Suas integrações → Webhooks**

3. **Clique em "Criar webhook"**

4. **Configure assim:**
   - **URL de produção:** `https://seu-dominio.vercel.app/api/webhook/mercadopago`
   - **Eventos a receber:** Selecione apenas **"Pagamentos"**
   - **Modo:** Produção (ou Teste se estiver testando)

5. **Salve a configuração**

### PASSO 4: Configurar metadata nos links de pagamento

Para cada link de pagamento que você criou, adicione estas configurações:

1. **Acesse cada link de pagamento no painel do Mercado Pago**

2. **Em "Configurações avançadas" ou "Metadata", adicione:**
   - `plan_type`: `monthly` (ou `semester` ou `annual`)
   - `user_email`: Será preenchido automaticamente pelo app

**Importante:** O app já adiciona o email do usuário automaticamente na URL como `external_reference`.

---

## 🔄 Como funciona o fluxo completo:

1. **Usuário escolhe um plano** na tela de planos do Shape365
2. **Clica em "Assinar Plano"** e é redirecionado para o Mercado Pago
3. **Completa o pagamento** na plataforma do Mercado Pago
4. **Mercado Pago envia notificação** para o webhook do Shape365
5. **Webhook processa o pagamento:**
   - Verifica se foi aprovado
   - Cria/atualiza registro na tabela `subscriptions`
   - Define data de expiração baseada no plano
6. **Usuário é liberado automaticamente** ao fazer login novamente

---

## 🧪 Como testar:

### Teste 1: Verificar se o webhook está funcionando
```bash
curl https://seu-dominio.vercel.app/api/webhook/mercadopago
```
Deve retornar: `{"message":"Webhook do Mercado Pago está funcionando"}`

### Teste 2: Fazer um pagamento de teste
1. Use o **modo sandbox** do Mercado Pago
2. Use cartões de teste: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing
3. Faça um pagamento e verifique se a assinatura foi criada no Supabase

### Teste 3: Verificar assinatura
```bash
curl -X POST https://seu-dominio.vercel.app/api/subscription/check \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@exemplo.com"}'
```

---

## 🐛 Troubleshooting:

### Problema: Webhook não está recebendo notificações
- Verifique se a URL está correta no painel do Mercado Pago
- Certifique-se de que o app está publicado (não funciona em localhost)
- Verifique os logs no Vercel: `vercel logs`

### Problema: Assinatura não está sendo criada
- Verifique se a tabela `subscriptions` foi criada no Supabase
- Verifique se o `SUPABASE_SERVICE_ROLE_KEY` está configurado
- Verifique os logs do webhook no Vercel

### Problema: Usuário não consegue acessar após pagamento
- Verifique se o email do usuário está correto
- Verifique se a assinatura está com status `active` no Supabase
- Peça para o usuário fazer logout e login novamente

---

## 📊 Monitoramento:

### Ver assinaturas ativas no Supabase:
```sql
SELECT * FROM subscriptions WHERE status = 'active';
```

### Ver pagamentos recentes:
```sql
SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 10;
```

### Ver assinaturas que vão expirar em breve:
```sql
SELECT * FROM subscriptions 
WHERE status = 'active' 
AND expires_at < NOW() + INTERVAL '7 days'
ORDER BY expires_at;
```

---

## 🔐 Segurança:

- ✅ Webhook valida origem das notificações
- ✅ Access Token nunca é exposto no frontend
- ✅ Service Role Key usada apenas no servidor
- ✅ Verificação de assinatura em tempo real

---

## 📞 Próximos passos:

1. **Me forneça os dados solicitados** (Access Token e links)
2. **Eu atualizo o `.env.local`** com suas credenciais
3. **Você cria a tabela no Supabase** (SQL fornecido acima)
4. **Você configura o webhook** no painel do Mercado Pago
5. **Testamos juntos** com um pagamento real

---

## ✨ Recursos adicionais implementados:

- ✅ Verificação automática de assinatura ao fazer login
- ✅ Atualização de status quando assinatura expira
- ✅ Suporte para cancelamento de assinatura
- ✅ Metadata do usuário enviada automaticamente
- ✅ Sistema de logs para debugging

---

**Está pronto para começar? Me envie o Access Token e os 3 links de pagamento!** 🚀
