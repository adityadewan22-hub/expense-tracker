import http from 'http';

// Create server instance
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('SERVER IS WORKING PROPERLY!');
});

// Configuration
const PORT = 5000;
const HOST = '0.0.0.0';

// Start server
server.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}/`);
  console.log(`Try these in another terminal:
  1. curl http://localhost:${PORT}
  2. Test-NetConnection -ComputerName 127.0.0.1 -Port ${PORT}`);
});

// Error handling
server.on('error', (err) => {
  console.error('❌ Server failed:', err.message);
  console.log('Troubleshooting:');
  console.log('1. Try a different port (like 3000)');
  console.log('2. Check for port conflicts with: netstat -ano | findstr :${PORT}');
  console.log('3. Temporarily disable firewall');
});

// Verify after 1 second
setTimeout(() => {
  if (!server.listening) {
    console.error('❌ Server failed to start!');
    process.exit(1);
  }
}, 1000);
