<template>
  <v-card class="mx-auto my-8" width="300">
    <v-card-title class="text-center text-h5 font-weight-bold"
      >로그인</v-card-title
    >

    <v-card-text>
      <v-form>
        <v-text-field
          label="아이디"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          placeholder="아이디를 입력하세요"
        ></v-text-field>

        <v-text-field
          label="비밀번호"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          placeholder="비밀번호를 입력하세요"
          type="password"
        ></v-text-field>

        <div class="d-flex justify-space-between align-center mb-4">
          <v-checkbox label="로그인 상태 유지" hide-details></v-checkbox>
          <v-btn variant="text" color="primary" density="compact"
            >비밀번호 찾기</v-btn
          >
        </div>

        <v-btn color="primary" block size="large" class="mt-2"> 로그인 </v-btn>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center pa-4">
      <span class="text-body-2 mr-2">계정이 없으신가요?</span>
      <v-btn
        variant="text"
        color="primary"
        density="comfortable"
        @click="$emit('change')"
        >회원가입</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
