import { m } from "$lib/paraglide/messages";
import * as v from "valibot";

const validateUsername = v.pipe(
  v.string(),
  v.minLength(3, m.usernameMinLength()),
  v.maxLength(20, m.usernameMaxLength()),
  v.nonEmpty(m.usernameRequired()),
);

const validatePassword = v.pipe(
  v.string(),
  v.nonEmpty(m.passwordRequired()),
  v.minLength(8, m.passwortMinLength()),
  v.maxLength(40, m.passwortMaxLength()),
  v.regex(/[a-z]/, m.passwordLowercase()),
  v.regex(/[A-Z]/, m.passwordUppercase()),
  v.regex(/[0-9]/, m.passwordNumber()),
  v.regex(/[-!@#$%&*()=_+]/, m.passwordSymbol()),
);

const validateLoginPassword = v.config(
  v.pipe(
    v.string(),
    v.nonEmpty(m.passwordRequired),
    v.minLength(8, m.passwortMinLength()),
    v.maxLength(40, m.passwortMaxLength()),
  ),
  { abortPipeEarly: true },
);

const validateEmail = v.pipe(
  v.string(),
  v.nonEmpty(m.emailRequired()),
  v.email(m.emailInvalid()),
);

export const user_create_schema = v.object({
  name: validateUsername,
  _password: validatePassword,
  email: validateEmail,
});

export const login_user_schema = v.object({
  email: v.config(validateEmail, { abortEarly: true }),
  _password: validateLoginPassword,
});
