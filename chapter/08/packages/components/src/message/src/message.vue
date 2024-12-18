<template>
  <Transition :name="fadeClassName">
    <div v-if="show" :class="{ [baseClassName]: true, [typeClassName]: true }">
      <div>{{ props.text }}</div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { IMessageType } from './type';
import { prefixName } from '../../theme/index';

const show = ref<boolean>(false);

onMounted(() => {
  show.value = true;
});

const props = withDefaults(
  defineProps<{
    text?: string;
    type?: IMessageType;
  }>(),
  {
    type: 'info'
  }
);

const closeMessage = () => {
  show.value = false;
};

defineExpose<{
  closeMessage: () => void;
}>({
  closeMessage: closeMessage
});

const baseClassName = `${prefixName}-message`;
const typeClassName = `${baseClassName}-${props.type}`;
const fadeClassName = `${baseClassName}-fade`;
</script>
