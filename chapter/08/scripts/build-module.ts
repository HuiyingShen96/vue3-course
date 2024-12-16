/**
 * @file
 * 将 TypeScript 和 Vue3 源码编译为支持 ES Module 和 CommonJS 模块的两种 JavaScript 代码文件。
 * 【输入】源码（*.ts,*.vue）
 * 【输出】支持 ESM 和 CJS 两种模块格式的 js 文件
 * 【实现思路】基于 Rollup 来遍历所有源码文件，再进行一一对应的编译
 *  1. 用 fast-glob 模块来获取组件目录，也就是所有组件路径。
 *  2. 把所有组件路径封装成 Rollup 编译入口。
 *  3. 配置 Rollup 的编译配置，区分 ESM 和 CJS 两种输出结果。
 *  4. 执行 Rollup 编译，编译出两种结果。
 */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'node:fs';
import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import glob from 'fast-glob';
import type { OutputOptions } from 'rollup';
import { resolvePackagePath } from './util';

const getExternal = async (pkgDirName: string) => {
  const pkgPath = resolvePackagePath(pkgDirName, 'package.json');
  const manifest = require(pkgPath) as any;
  const {
    dependencies = {},
    peerDependencies = {},
    devDependencies = {}
  } = manifest;
  const deps: string[] = [
    ...new Set([
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),
      ...Object.keys(devDependencies)
    ])
  ];
  return (id: string) => {
    if (id.endsWith('.less')) {
      return true;
    }
    return deps.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};

const build = async (pkgDirName: string) => {
  const pkgDistPath = resolvePackagePath(pkgDirName, 'dist');
  if (fs.existsSync(pkgDistPath) && fs.statSync(pkgDistPath).isDirectory()) {
    fs.rmSync(pkgDistPath, { recursive: true });
  }

  const input = await glob(['**/*.{js,jsx,ts,tsx,vue}', '!node_modules'], {
    cwd: resolvePackagePath(pkgDirName, 'src'),
    absolute: true,
    onlyFiles: true
  });

  const bundle = await rollup({
    input,
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: true
          }),
          vueJsx: vueJsx()
        }
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2015',
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    external: await getExternal(pkgDirName),
    treeshake: false
  });

  const options: OutputOptions[] = [
    {
      format: 'cjs',
      dir: resolvePackagePath(pkgDirName, 'dist', 'cjs'),
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: resolvePackagePath(pkgDirName, 'src'),
      sourcemap: true,
      entryFileNames: '[name].cjs'
    },
    {
      format: 'esm',
      dir: resolvePackagePath(pkgDirName, 'dist', 'esm'),
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: resolvePackagePath(pkgDirName, 'src'),
      sourcemap: true,
      entryFileNames: '[name].mjs'
    }
  ];
  return Promise.all(options.map((option) => bundle.write(option)));
};

console.log('[TS] 开始编译所有子模块···');
await build('components');
await build('business');
console.log('[TS] 编译所有子模块成功！');
