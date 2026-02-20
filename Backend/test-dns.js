const dns = require('dns').promises;

async function run() {
  const name = '_mongodb._tcp.cluster0.oqkm1c1.mongodb.net';
  console.log('Testing SRV resolve for', name);
  try {
    const srv = await dns.resolveSrv(name);
    console.log('SRV records:', srv);
  } catch (err) {
    console.error('SRV resolve error:', err);
  }

  try {
    const addrs = await dns.resolve4('cluster0.oqkm1c1.mongodb.net');
    console.log('A records:', addrs);
  } catch (err) {
    console.error('A resolve error:', err);
  }
}

run();
