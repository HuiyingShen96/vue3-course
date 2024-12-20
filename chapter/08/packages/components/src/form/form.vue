<template>
  <form :class="{ [className]: true }" @submit="handleSubmit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { reactive, provide, toRaw } from 'vue';
import { prefixName } from '../theme';
import { FORM_CONTEXT_KEY } from './common'
import type {
  FormInstance,
  FormContext,
  FormItemContext
} from './type';

const className = `${prefixName}-form`;

// props
const props = defineProps<{
  model?: FormContext['model']
}>();

// 对外暴露的属性
const fieldList: FormItemContext[] = [];
const addField = (field: FormItemContext) => {
  fieldList.push(field);
};
const resetFields = () => {
  fieldList.forEach((field: FormItemContext) => {
    field.resetField?.();
  })
}
defineExpose<FormInstance>({
  addField,
  resetFields,
});

// emits
const emits = defineEmits<{
  (event: 'submit', e: Event): void;
  (event: 'finish', e: unknown): void;
  (event: 'finishFail', e: unknown): void;
}>();

// 通过 provide / inject 共享上下文
const formContext = reactive<FormContext>({
  model: props.model,
  addField,
  resetFields,
});
provide<FormContext>(FORM_CONTEXT_KEY, formContext);

// 表单提交前，处理所有字段校验
const validateFields = async () => {
  const errorList = [];
  for (let i = 0; i < fieldList.length; i++) {
    const field = fieldList[i];
    const result = await field.validateField();
    if (result.hasError) {
      errorList.push(result);
    }
  }
  return errorList;
}

// 统一处理表单提交
const handleSubmit = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  emits('submit', e);
  if (props.model) {
    validateFields()
      .then((errorList) => {
        if (errorList.length > 0) {
          emits('finishFail', errorList);
        } else {
          emits('finish', toRaw(props.model));
        }
      })
      .catch((e) => {
        emits('finishFail', e);
      })
  }
}
</script>