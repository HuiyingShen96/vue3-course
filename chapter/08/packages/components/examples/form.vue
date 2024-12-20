<template>
  <div class="example">
    <Form ref="formRef" :model="model" @finish="handleFinish" @finishFail="handleFinishFail">
      <FormItem label="数据1（数字校验）" name="data1" :rule="rule1">
        <input v-model="model.data1" />
      </FormItem>

      <FormItem label="数据2（字母校验）" name="data2" :rule="rule2">
        <input v-model="model.data2" />
      </FormItem>

      <FormItem>
        <button type="submit">submit</button>
        <button type="button" @click="handleReset">reset</button>
      </FormItem>
    </Form>

    <div>
      <div>data1: {{ model.data1 }}</div>
      <div>data2: {{ model.data2 }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, ValidateRule } from '../src'
import { FormInstance } from '../src';
import { ref, reactive } from 'vue';

const { FormItem } = Form;

const formRef = ref<FormInstance>();
const model = reactive({
  data1: 'data 123',
  data2: 'abc',
});

const rule1: ValidateRule = {
  validator: (value: unknown) => {
    const hasError = /^[0-9]{1,}$/gi.test(`${value || ''}`) !== true;
    return {
      hasError,
      message: hasError ? '仅支持0-9的数字' : ''
    };
  }
}

const rule2: ValidateRule = {
  validator: (val: unknown) => {
    const hasError = /^[a-z]{1,}$/gi.test(`${val || ''}`) !== true;
    return {
      hasError,
      message: hasError ? '仅支持a-z的大小写字母' : '',
    };
  }
};

const handleFinish = (e: unknown) => {
  // eslint-disable-next-line no-console
  console.log('finish', e);
}

const handleFinishFail = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('fail =', e);
};

const handleReset = () => {
  formRef.value?.resetFields();
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
.example {
  width: 400px;
  margin: 100px auto;
  box-sizing: border-box;
  background: #f0f0f0;
}
</style>