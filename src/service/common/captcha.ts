import { request } from '../request';

// @Summary 获取验证码
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/captcha [post]
export const captcha = (data: any) => {
  return request.post('/base/captcha', data);
};
