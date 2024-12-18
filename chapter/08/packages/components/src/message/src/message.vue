<template>
  <div v-if="show">
    <div>{{ props.text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { IMessageType } from './type';

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
</script>
