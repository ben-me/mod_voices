import { m } from "$lib/paraglide/messages";
import * as v from "valibot";

const validateUsername = v.pipe(
  v.string(),
  v.minLength(3, m.username_min_length()),
  v.maxLength(20, m.username_max_length()),
  v.nonEmpty(m.username_required()),
);

const validatePassword = v.pipe(
  v.string(),
  v.nonEmpty(m.password_required()),
  v.minLength(8, m.passwort_min_length()),
  v.maxLength(40, m.passwort_max_length()),
  v.regex(/[a-z]/, m.password_lowercase()),
  v.regex(/[A-Z]/, m.password_uppercase()),
  v.regex(/[0-9]/, m.password_number()),
  v.regex(/[-!@#$%&*()=_+]/, m.password_symbol()),
);

const validateLoginPassword = v.config(
  v.pipe(
    v.string(),
    v.nonEmpty(m.password_required()),
    v.minLength(8, m.passwort_min_length()),
    v.maxLength(40, m.passwort_max_length()),
  ),
  { abortPipeEarly: true },
);

const validateEmail = v.pipe(
  v.string(),
  v.nonEmpty(m.email_required()),
  v.email(m.email_invalid()),
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
