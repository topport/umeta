<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>

    <n-form-item path="captcha">
      <div class="vPicBox">
        <n-input v-model:value="model.captcha" placeholder="请输入验证码" style="width: 60%" />
        <div class="vPic">
          <img v-if="picPath" :src="picPath" alt="请输入验证码" @click="loginVerify()" />
        </div>
      </div>
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="justify-between flex-y-center">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确定
      </n-button>
      <div class="justify-between flex-y-center">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ EnumLoginModule['code-login'] }}
        </n-button>
        <div class="w-12px"></div>
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ EnumLoginModule.register }}
        </n-button>
      </div>
    </n-space>
    <other-account @login="handleLoginOtherAccount" />
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { EnumLoginModule } from '@/enum';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { captcha } from '@/service';
// import { formRules } from '@/utils';
import { OtherAccount } from './components';

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();
const picPath = ref('');

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
  username: 'admin',
  password: '123456',
  captcha: '',
  captchaId: ''
});

// 验证函数
// eslint-disable-next-line consistent-return
const checkusername = (rule: any, value: string | any[], callback: (arg0: Error | undefined) => void) => {
  if (value.length < 5) {
    return callback(new Error('请输入正确的用户名'));
  }
  callback(undefined);
};
// eslint-disable-next-line consistent-return
const checkPassword = (rule: any, value: string | any[], callback: (arg0: Error | undefined) => void) => {
  if (value.length < 6) {
    return callback(new Error('请输入正确的密码'));
  }
  callback(undefined);
};

// 获取验证码
const loginVerify = async () => {
  const ele = await captcha({});
  // console.log(model);
  // rules.captcha[1].max = ele.data.captchaLength;
  // rules.captcha[1].min = ele.data.captchaLength;
  picPath.value = ele.data.picPath;
  model.captchaId = ele.data.captchaId;
};
loginVerify();
const rules: FormRules = {
  // password: formRules.pwd
  username: [{ validator: checkusername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
};
const rememberMe = ref(false);

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate(errors => {
    if (!errors) {
      login(model);
    }
  });
}

function handleLoginOtherAccount() {
  // const { username, password } = param;
  login(model);
}
</script>
<style scoped></style>
