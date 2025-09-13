import fs from 'node:fs';
import { describe, it, expect } from 'vitest';

describe('package manifest contribution', () => {
  it('contributes renderx plugin manifest', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    
    // Verify keywords includes 'renderx-plugin'
    expect(pkg.keywords).toContain('renderx-plugin');
    
    // Verify renderx.plugins exists and contains LibraryComponentPlugin
    const plugins = pkg.renderx?.plugins ?? [];
    expect(plugins).toHaveLength(1);
    
    const entry = plugins.find((p: { id?: string }) => p?.id === 'LibraryComponentPlugin');
    expect(entry).toBeDefined();
    expect(entry?.runtime?.module).toBe('@renderx-plugins/library-component');
    expect(entry?.runtime?.export).toBe('register');
    
    // Verify existing renderx.sequences is preserved
    expect(pkg.renderx?.sequences).toEqual(['json-sequences']);
  });

  it('maintains existing package structure', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    
    // Verify essential package properties are maintained
    expect(pkg.name).toBe('@renderx-plugins/library-component');
    expect(pkg.main).toBe('./dist/index.js');
    expect(pkg.exports['.']).toBe('./dist/index.js');
    
    // Verify files array includes necessary items
    expect(pkg.files).toContain('dist');
    expect(pkg.files).toContain('src');
    expect(pkg.files).toContain('json-sequences');
  });
});
