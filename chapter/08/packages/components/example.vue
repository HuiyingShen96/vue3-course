<template>
  <Box class="example">
    <div :style="{ padding: '10px' }">这是开发模式下的 基础组件</div>
    <Button @click="onClick">点击换主题色</Button>
    <Button @click="showMessage">Message</Button>
    <Button @click="showDialog">Dialog</Button>
  </Box>
</template>

<script setup lang="ts">
import { Button, Box, Message, Dialog } from './src';
import { prefixName } from './src/theme/index';

const onClick = () => {
  const darkThemeName = `${prefixName}-theme-dark`;
  const html = document.querySelector('html');
  if (html?.classList.contains(darkThemeName)) {
    html?.classList.remove(darkThemeName);
  } else {
    html?.classList.add(darkThemeName);
  }
};
const showMessage = () => {
  Message.open({
    text: 'I\'m a message.',
    type: 'success',
    duration: 0
  });
}
const showDialog = () => {
  const dialog = Dialog.createDialog({
    text: 'I am a dialog.',
    onOk() {
      dialog.close();
    }
  })
};
</script>

<style>
.example {
  height: 100%;
  padding: 100px;
  box-sizing: border-box;
  text-align: center;
}
</style>
