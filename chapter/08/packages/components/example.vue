<template>
  <Box class="example">
    <div :style="{ padding: '10px' }">这是开发模式下的 基础组件</div>
    <Button @click="onClick">点击换主题色</Button>
    <Button @click="showMessage">Message</Button>
    <Button @click="showDialog">Dialog</Button>
  </Box>
  <Row>
    <Col class="gird" :span="24">col-24</Col>
  </Row>
  <Row>
    <Col class="gird" :span="12">col-12</Col>
    <Col class="gird gird-dark" :span="12">col-12</Col>
  </Row>
  <Row>
    <Col class="gird" :span="8">col-8</Col>
    <Col class="gird gird-dark" :span="8">col-8</Col>
    <Col class="gird" :span="8">col-8</Col>
  </Row>
  <Row>
    <Col class="gird" :span="6">col-6</Col>
    <Col class="gird gird-dark" :span="6">col-6</Col>
    <Col class="gird" :span="6">col-6</Col>
    <Col class="gird gird-dark" :span="6">col-6</Col>
  </Row>
  <Row>
    <Col class="gird" :span="4">col-4</Col>
    <Col class="gird gird-dark" :span="4">col-4</Col>
    <Col class="gird" :span="4">col-4</Col>
    <Col class="gird gird-dark" :span="4">col-4</Col>
    <Col class="gird" :span="4">col-4</Col>
    <Col class="gird gird-dark" :span="4">col-4</Col>
  </Row>
  <Row>
    <Col class="gird" :span="3">col-3</Col>
    <Col class="gird gird-dark" :span="3">col-3</Col>
    <Col class="gird" :span="3">col-3</Col>
    <Col class="gird gird-dark" :span="3">col-3</Col>
    <Col class="gird" :span="3">col-3</Col>
    <Col class="gird gird-dark" :span="3">col-3</Col>
    <Col class="gird" :span="3">col-3</Col>
    <Col class="gird gird-dark" :span="3">col-3</Col>
  </Row>
  <Row>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
    <Col class="gird" :span="2">col-2</Col>
    <Col class="gird gird-dark" :span="2">col-2</Col>
  </Row>
</template>

<script setup lang="ts">
import { Button, Box, Message, Dialog,
  Col, Row,
 } from './src';
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
  /* height: 100%; */
  padding: 100px;
  box-sizing: border-box;
  text-align: center;
}
</style>

<style lang="less">
.gird {
  background: #0092ff6b;
  border: 1px #0092ff6b solid;
  margin-bottom: 10px;
  height: 50px;
  color: #035593;
  font-size: 18px;
  // font-weight: bolder;
  text-align: center;
  line-height: 50px;
  &.gird-dark {
    background: #068aed;
    border: 1px #068aed solid;
    color: #ffffff;
    margin-bottom: 10px;
  }
}
</style>
