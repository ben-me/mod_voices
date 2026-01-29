import { m } from "$lib/paraglide/messages";
import * as v from "valibot";

export const validateUsername = v.pipe(
  v.string(),
  v.minLength(3, m.usernameMinLength()),
  v.maxLength(20, m.usernameMaxLength()),
  v.nonEmpty(m.usernameRequired()),
);

export const validatePassword = v.pipe(
  v.pipe(
    v.string(),
    v.nonEmpty(m.passwordRequired()),
    v.minLength(8, m.passwortMinLength()),
    v.maxLength(40, m.passwortMaxLength()),
    v.regex(/[a-z]/, m.passwordLowercase()),
    v.regex(/[A-Z]/, m.passwordUppercase()),
    v.regex(/[0-9]/, m.passwordNumber()),
    v.regex(/[!@#$%&*()-=_+]/, m.passwordSymbol()),
  ),
);

export const validateEmail = v.pipe(
  v.string(),
  v.nonEmpty(m.emailRequired()),
  v.email(m.emailInvalid()),
);
