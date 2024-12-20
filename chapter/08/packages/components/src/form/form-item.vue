<script setup lang="ts">
import Row from '../row';
import Col from '../col';
import { inject, onMounted, ref, toRaw, watch } from 'vue';
import { prefixName } from '../theme';
import { FORM_CONTEXT_KEY } from './common';
import type {
  FormItemInstance,
  FormContext,
  ValidateResult,
  ValidateRule,
} from './type';

const labelCol = 8;
const wrapperCol = 16;

const baseClassName = `${prefixName}-form-item`;
const labelClassName = `${baseClassName}-label`;
const wrapperClassName = `${baseClassName}-wrapper`;

const errorTip = ref('');

// 通过 provide / inject 共享上下文
const formContext = inject<FormContext>(FORM_CONTEXT_KEY);

// props
const props = defineProps<{
  name?: string;
  label?: string;
  rule?: ValidateRule;
}>();

async function validateFieldValue(val: unknown): Promise<ValidateResult> {
  if (props.rule?.validator) {
    const result = await props.rule.validator(val);
    errorTip.value = (result.hasError && result.message) ? result.message : '';
    return {
      ...result,
      name: props.name,
      value: toRaw(val),
    };
  }
  return {
    hasError: false,
  };
}

async function validateField(): Promise<ValidateResult> {
  if (props.rule?.validator && props.name) {
    const result = await validateFieldValue(formContext?.model?.[props.name])
    return result;
  }
  return {
    hasError: false,
  };
}

function resetField() {
  if (formContext?.model && props.name && formContext.model[props.name]) {
    formContext.model[props.name] = undefined;
  }
}

onMounted(() => {
  if (formContext?.model && props.name && formContext.model[props.name]) {
    formContext.addField({
      name: props.name,
      rule: props.rule,
      validateField,
      resetField,
    })

    // 监听字段值变化，实时校验
    watch(
      [() => formContext.model?.[props.name as string]], // sources
      ([newValue]) => validateFieldValue(newValue), // callback
      { immediate: true } // options
    );
  }
});

defineExpose<FormItemInstance>({
  validateField,
  resetField,
});
</script>

<template>
  <div :class="{ [baseClassName]: true }">
    <Row :class="labelClassName">
      <Col :span="labelCol">
        <span>{{ $props.label }}</span>
      </Col>
      <Col :span="wrapperCol"><slot /></Col>
    </Row>
    <Row :class="wrapperClassName" v-if="$props.name">
      <Col :span="labelCol"></Col>
      <Col :span="wrapperCol">
        <span v-if="errorTip" :style="{ fontSize: 12, color: 'red' }">{{ errorTip }}</span>
      </Col>
    </Row>
  </div>
</template>