#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  // Add docs folder to git
  execSync('git add docs/', { cwd: __dirname, stdio: 'inherit' });
  
  // Commit changes
  execSync('git commit -m "Deploy to GitHub Pages" || true', { cwd: __dirname, stdio: 'inherit' });
  
  // Push to main branch
  execSync('git push user_github main', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('Deploy successful!');
} catch (err) {
  console.error('Deploy failed:', err);
  process.exit(1);
}
