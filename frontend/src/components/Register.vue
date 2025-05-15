<template>
  <v-card class="mx-auto my-8" width="300">
    <v-card-title class="text-center text-h5 font-weight-bold"
      >회원가입</v-card-title
    >

    <v-card-text>
      <v-form v-model:model-value="isConfirmed">
        <v-text-field
          v-model:model-value="form.username"
          label="아이디"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          placeholder="아이디를 입력하세요"
        ></v-text-field>

        <v-text-field
          v-model:model-value="form.password"
          label="비밀번호"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          placeholder="비밀번호를 입력하세요"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model:model-value="confirmPassword"
          label="비밀번호 확인"
          prepend-inner-icon="mdi-lock-check"
          variant="outlined"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model:model-value="form.nickname"
          label="닉네임"
          prepend-inner-icon="mdi-badge-account"
          variant="outlined"
          placeholder="사용할 닉네임을 입력하세요"
        ></v-text-field>

        <v-btn
          color="success"
          block
          size="large"
          class="mt-4"
          :disabled="!isFormValid"
          @click="submitRegistration"
        >
          회원가입 완료
        </v-btn>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center pa-4">
      <span class="text-body-2 mr-2">이미 계정이 있으신가요?</span>
      <v-btn
        variant="text"
        color="primary"
        density="comfortable"
        @click="$emit('updateMode')"
        >로그인하기</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { api } from '@/api';

const form = ref({
  username: '',
  password: '',
  nickname: '',
});

const confirmPassword = ref('');
const isPasswordMatch = computed(() => {
  return (
    form.value.password !== '' && form.value.password === confirmPassword.value
  );
});

const isFormValid = computed(() => {
  return (
    form.value.username !== '' &&
    form.value.password !== '' &&
    form.value.nickname !== '' &&
    isPasswordMatch.value
  );
});

const submitRegistration = async () => {
  try {
    console.log('회원가입 시도:', {
      username: form.value.username,
      password: form.value.password,
      nickname: form.value.nickname,
    });
    await api.auth.register(form.value);
  } catch (error) {
    console.error('폼이 유효하지 않습니다.');
  }
};
</script>
