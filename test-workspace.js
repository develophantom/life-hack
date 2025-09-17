// Test workspace dependency resolution
try {
  const db = require('@hack-life/db');
  console.log('✅ Workspace dependency resolved successfully');
  console.log('Available exports:', Object.keys(db));
} catch (error) {
  console.log('❌ Workspace dependency failed to resolve');
  console.log('Error:', error.message);
}
