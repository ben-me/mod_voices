import * as v from "valibot";

export const validateUsername = v.pipe(
  v.string(),
  v.minLength(3, "Username must contain 3 or more characters"),
  v.maxLength(20, "Username must be within 20 or less characters"),
  v.nonEmpty("Please enter a username"),
);

export const validatePassword = v.pipe(
  v.pipe(
    v.string(),
    v.nonEmpty("Please enter a password"),
    v.minLength(8, "Your password is too short."),
    v.maxLength(40, "Your password is too long."),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number."),
    v.regex(
      /[!@#$%&*()-=_+]/,
      "Your password must contain one of the following '!@#$%^&*()-=_+",
    ),
  ),
);

export const validateEmail = v.pipe(
  v.string(),
  v.nonEmpty("Please enter an email address."),
  v.email("Email is invalid"),
);
