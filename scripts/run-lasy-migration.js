const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não encontrada');
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔗 Conectando ao banco Lasy Cloud...');
    await client.connect();
    console.log('✅ Conectado!');

    const sqlPath = path.join(__dirname, 'lasy-cloud-schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🚀 Executando schema...');
    await client.query(sql);
    console.log('✅ Schema criado com sucesso!');

    // Verificar tabelas criadas
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('\n📋 Tabelas criadas no banco:');
    result.rows.forEach(row => console.log(`  ✓ ${row.table_name}`));

    // Verificar planos inseridos
    const plans = await client.query('SELECT plan_type, price FROM subscription_plans ORDER BY price');
    console.log('\n💰 Planos cadastrados:');
    plans.rows.forEach(p => console.log(`  ✓ ${p.plan_type}: R$ ${p.price}`));

  } catch (err) {
    console.error('❌ Erro na migração:', err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔒 Conexão encerrada.');
  }
}

runMigration();
